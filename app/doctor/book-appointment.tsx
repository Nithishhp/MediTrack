import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { Card, Avatar, Button, Badge } from '../../src/components/common';
import { MOCK_DOCTORS, TIME_SLOTS } from '../../src/constants/mockData';

export default function BookAppointmentScreen() {
  const { doctorId } = useLocalSearchParams<{ doctorId: string }>();
  const doctor = MOCK_DOCTORS.find(d => d.id === doctorId) || MOCK_DOCTORS[0];

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [appointmentType, setAppointmentType] = useState<'video' | 'in_person'>('video');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const symptoms = ['Fever', 'Headache', 'Cough', 'Chest Pain', 'Fatigue', 'Nausea', 'Back Pain', 'Skin Rash'];

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      date: d.toISOString().split('T')[0],
      day: d.toLocaleDateString('en', { weekday: 'short' }),
      num: d.getDate(),
      month: d.toLocaleDateString('en', { month: 'short' }),
    };
  });

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const handleBook = () => {
    if (!selectedDate || !selectedSlot) {
      Alert.alert('Error', 'Please select a date and time slot');
      return;
    }
    Alert.alert(
      'Confirm Booking',
      `Book ${appointmentType === 'video' ? 'video' : 'in-person'} appointment with Dr. ${doctor.firstName} ${doctor.lastName} on ${selectedDate} at ${selectedSlot}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm & Pay', onPress: () => {
          Alert.alert('Success', 'Appointment booked successfully! You will receive a confirmation shortly.', [
            { text: 'OK', onPress: () => router.push('/(tabs)/appointments') }
          ]);
        }},
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Doctor Info */}
        <Card style={styles.docCard}>
          <View style={styles.docRow}>
            <Avatar uri={doctor.avatar} name={`${doctor.firstName} ${doctor.lastName}`} size={56} />
            <View style={styles.docInfo}>
              <Text style={styles.docName}>Dr. {doctor.firstName} {doctor.lastName}</Text>
              <Text style={styles.docSpec}>{doctor.specialization}</Text>
            </View>
            <Text style={styles.docFee}>${doctor.consultationFee}</Text>
          </View>
        </Card>

        {/* Appointment Type */}
        <Text style={styles.sectionTitle}>Consultation Type</Text>
        <View style={styles.typeRow}>
          {([
            { key: 'video', icon: 'videocam', label: 'Video Call' },
            { key: 'in_person', icon: 'location', label: 'In-Person' },
          ] as const).map(type => (
            <TouchableOpacity
              key={type.key}
              style={[styles.typeBtn, appointmentType === type.key && styles.typeBtnActive]}
              onPress={() => setAppointmentType(type.key)}
            >
              <Ionicons name={type.icon} size={24} color={appointmentType === type.key ? Colors.primary : Colors.textSecondary} />
              <Text style={[styles.typeText, appointmentType === type.key && styles.typeTextActive]}>{type.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Date Selection */}
        <Text style={styles.sectionTitle}>Select Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
          {dates.map(d => (
            <TouchableOpacity
              key={d.date}
              style={[styles.dateCard, selectedDate === d.date && styles.dateCardActive]}
              onPress={() => setSelectedDate(d.date)}
            >
              <Text style={[styles.dateDay, selectedDate === d.date && styles.dateDayActive]}>{d.day}</Text>
              <Text style={[styles.dateNum, selectedDate === d.date && styles.dateNumActive]}>{d.num}</Text>
              <Text style={[styles.dateMonth, selectedDate === d.date && styles.dateMonthActive]}>{d.month}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Time Slots */}
        <Text style={styles.sectionTitle}>Available Slots</Text>
        <View style={styles.slotsGrid}>
          {TIME_SLOTS.map(slot => (
            <TouchableOpacity
              key={slot.id}
              style={[
                styles.slotChip,
                !slot.isAvailable && styles.slotUnavailable,
                selectedSlot === slot.startTime && styles.slotActive,
              ]}
              onPress={() => slot.isAvailable && setSelectedSlot(slot.startTime)}
              disabled={!slot.isAvailable}
            >
              <Text style={[
                styles.slotText,
                !slot.isAvailable && styles.slotTextUnavailable,
                selectedSlot === slot.startTime && styles.slotTextActive,
              ]}>{slot.startTime}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Symptoms */}
        <Text style={styles.sectionTitle}>Symptoms (Optional)</Text>
        <View style={styles.symptomsGrid}>
          {symptoms.map(s => (
            <TouchableOpacity
              key={s}
              style={[styles.symptomChip, selectedSymptoms.includes(s) && styles.symptomActive]}
              onPress={() => toggleSymptom(s)}
            >
              <Text style={[styles.symptomText, selectedSymptoms.includes(s) && styles.symptomTextActive]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>Total Fee</Text>
          <Text style={styles.totalValue}>${doctor.consultationFee}</Text>
        </View>
        <Button title="Book & Pay" onPress={handleBook} size="lg" icon={<Ionicons name="card" size={18} color="#FFF" />} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.xl, paddingBottom: 100 },
  docCard: { marginBottom: Spacing.xl },
  docRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  docInfo: { flex: 1 },
  docName: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text },
  docSpec: { fontSize: FontSize.sm, color: Colors.textSecondary },
  docFee: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.primary },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: Spacing.md, marginTop: Spacing.lg },
  typeRow: { flexDirection: 'row', gap: Spacing.md },
  typeBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, padding: Spacing.lg, borderRadius: BorderRadius.lg, borderWidth: 1.5, borderColor: Colors.border, backgroundColor: Colors.surface },
  typeBtnActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  typeText: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.textSecondary },
  typeTextActive: { color: Colors.primary },
  dateScroll: { marginBottom: Spacing.sm },
  dateCard: { width: 70, alignItems: 'center', paddingVertical: Spacing.md, marginRight: Spacing.sm, borderRadius: BorderRadius.lg, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border },
  dateCardActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  dateDay: { fontSize: FontSize.sm, color: Colors.textSecondary },
  dateDayActive: { color: 'rgba(255,255,255,0.8)' },
  dateNum: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text, marginVertical: 2 },
  dateNumActive: { color: Colors.textLight },
  dateMonth: { fontSize: FontSize.xs, color: Colors.textSecondary },
  dateMonthActive: { color: 'rgba(255,255,255,0.8)' },
  slotsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  slotChip: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.border, backgroundColor: Colors.surface },
  slotUnavailable: { backgroundColor: Colors.divider, borderColor: Colors.divider },
  slotActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  slotText: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, color: Colors.text },
  slotTextUnavailable: { color: Colors.textTertiary },
  slotTextActive: { color: Colors.textLight },
  symptomsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  symptomChip: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.border, backgroundColor: Colors.surface },
  symptomActive: { backgroundColor: Colors.primaryLight, borderColor: Colors.primary },
  symptomText: { fontSize: FontSize.sm, color: Colors.textSecondary },
  symptomTextActive: { color: Colors.primary, fontWeight: FontWeight.semibold },
  bottomBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.lg, backgroundColor: Colors.surface,
    borderTopWidth: 1, borderTopColor: Colors.divider, ...Shadow.lg,
  },
  totalLabel: { fontSize: FontSize.sm, color: Colors.textSecondary },
  totalValue: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.primary },
});
