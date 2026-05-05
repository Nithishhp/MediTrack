import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { Card, Avatar, StatusChip, Badge, Button } from '../../src/components/common';
import { MOCK_APPOINTMENTS } from '../../src/constants/mockData';

export default function AppointmentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const appointment = MOCK_APPOINTMENTS.find(a => a.id === id) || MOCK_APPOINTMENTS[0];
  const doctor = appointment.doctor;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.statusRow}>
          <StatusChip status={appointment.status} />
          <Badge text={appointment.type === 'video' ? 'Video Call' : 'In-Person'} variant={appointment.type === 'video' ? 'info' : 'primary'} size="md" />
        </View>

        {/* Doctor Card */}
        <Card style={styles.section}>
          <View style={styles.docRow}>
            <Avatar uri={doctor?.avatar} name={`${doctor?.firstName} ${doctor?.lastName}`} size={64} showOnline isOnline={doctor?.isAvailableOnline} />
            <View style={styles.docInfo}>
              <Text style={styles.docName}>Dr. {doctor?.firstName} {doctor?.lastName}</Text>
              <Text style={styles.docSpec}>{doctor?.specialization}</Text>
              <Text style={styles.docHospital}>{doctor?.hospitalAffiliation}</Text>
            </View>
          </View>
        </Card>

        {/* Appointment Details */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Appointment Details</Text>
          {[
            { icon: 'calendar', label: 'Date', value: appointment.date },
            { icon: 'time', label: 'Time', value: `${appointment.timeSlot.startTime} - ${appointment.timeSlot.endTime}` },
            { icon: 'cash', label: 'Fee', value: `$${doctor?.consultationFee}` },
            { icon: 'document-text', label: 'Booking ID', value: appointment.id.toUpperCase() },
          ].map((detail, i) => (
            <View key={i} style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name={detail.icon as any} size={20} color={Colors.primary} />
              </View>
              <View style={styles.detailInfo}>
                <Text style={styles.detailLabel}>{detail.label}</Text>
                <Text style={styles.detailValue}>{detail.value}</Text>
              </View>
            </View>
          ))}
        </Card>

        {/* Symptoms */}
        {appointment.symptoms && appointment.symptoms.length > 0 && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Reported Symptoms</Text>
            <View style={styles.symptomsRow}>
              {appointment.symptoms.map((s, i) => (
                <Badge key={i} text={s} variant="warning" size="md" />
              ))}
            </View>
          </Card>
        )}

        {/* Actions */}
        {appointment.status === 'confirmed' && (
          <View style={styles.actions}>
            {appointment.type === 'video' && (
              <Button
                title="Join Video Consultation"
                onPress={() => router.push(`/consultation/video?appointmentId=${appointment.id}`)}
                fullWidth size="lg"
                icon={<Ionicons name="videocam" size={20} color="#FFF" />}
              />
            )}
            <Button
              title="Reschedule"
              onPress={() => Alert.alert('Reschedule', 'Contact support to reschedule.')}
              variant="outline" fullWidth size="lg"
              icon={<Ionicons name="calendar" size={20} color={Colors.primary} />}
            />
            <Button
              title="Cancel Appointment"
              onPress={() => Alert.alert('Cancel', 'Are you sure you want to cancel?', [
                { text: 'No', style: 'cancel' },
                { text: 'Yes, Cancel', style: 'destructive', onPress: () => router.back() },
              ])}
              variant="danger" fullWidth size="lg"
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.xl },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.lg },
  section: { marginBottom: Spacing.lg },
  docRow: { flexDirection: 'row', gap: Spacing.md },
  docInfo: { flex: 1 },
  docName: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.text },
  docSpec: { fontSize: FontSize.md, color: Colors.primary, marginTop: 2 },
  docHospital: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: Spacing.md },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.md },
  detailIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  detailInfo: {},
  detailLabel: { fontSize: FontSize.sm, color: Colors.textSecondary },
  detailValue: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  symptomsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  actions: { gap: Spacing.md },
});
