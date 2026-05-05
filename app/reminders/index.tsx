import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, TextInput, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { Card, EmptyState } from '../../src/components/common';

interface Reminder {
  id: string;
  medicine: string;
  dosage: string;
  frequency: string;
  times: string[];
  isActive: boolean;
}

const INITIAL_REMINDERS: Reminder[] = [
  { id: '1', medicine: 'Metformin', dosage: '500mg', frequency: 'Twice daily', times: ['08:00 AM', '08:00 PM'], isActive: true },
  { id: '2', medicine: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', times: ['09:00 AM'], isActive: true },
  { id: '3', medicine: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', times: ['09:00 PM'], isActive: false },
];

export default function RemindersScreen() {
  const [reminders, setReminders] = useState<Reminder[]>(INITIAL_REMINDERS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedicine, setNewMedicine] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newFrequency, setNewFrequency] = useState('Once daily');

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
  };

  const deleteReminder = (id: string) => {
    Alert.alert('Delete Reminder', 'Are you sure you want to delete this reminder?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setReminders(prev => prev.filter(r => r.id !== id)) },
    ]);
  };

  const addReminder = () => {
    if (!newMedicine.trim()) {
      Alert.alert('Error', 'Please enter a medicine name.');
      return;
    }
    const reminder: Reminder = {
      id: Date.now().toString(),
      medicine: newMedicine.trim(),
      dosage: newDosage.trim() || 'As prescribed',
      frequency: newFrequency,
      times: newFrequency === 'Twice daily' ? ['08:00 AM', '08:00 PM'] : ['09:00 AM'],
      isActive: true,
    };
    setReminders(prev => [...prev, reminder]);
    setNewMedicine('');
    setNewDosage('');
    setShowAddForm(false);
    Alert.alert('Success', `Reminder for ${reminder.medicine} has been set!`);
  };

  const activeCount = reminders.filter(r => r.isActive).length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Medicine Reminders</Text>
          <TouchableOpacity style={styles.addHeaderBtn} onPress={() => setShowAddForm(!showAddForm)}>
            <Ionicons name={showAddForm ? 'close' : 'add'} size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Summary */}
        <Card style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNum}>{reminders.length}</Text>
              <Text style={styles.summaryLabel}>Total</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryNum, { color: Colors.secondary }]}>{activeCount}</Text>
              <Text style={styles.summaryLabel}>Active</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryNum, { color: Colors.textTertiary }]}>{reminders.length - activeCount}</Text>
              <Text style={styles.summaryLabel}>Paused</Text>
            </View>
          </View>
        </Card>

        {/* Add Form */}
        {showAddForm && (
          <Card style={styles.addForm}>
            <Text style={styles.addFormTitle}>Add New Reminder</Text>
            <TextInput
              style={styles.input}
              placeholder="Medicine name"
              placeholderTextColor={Colors.textTertiary}
              value={newMedicine}
              onChangeText={setNewMedicine}
            />
            <TextInput
              style={styles.input}
              placeholder="Dosage (e.g. 500mg)"
              placeholderTextColor={Colors.textTertiary}
              value={newDosage}
              onChangeText={setNewDosage}
            />
            <Text style={styles.freqLabel}>Frequency</Text>
            <View style={styles.freqRow}>
              {['Once daily', 'Twice daily', 'Thrice daily'].map(freq => (
                <TouchableOpacity
                  key={freq}
                  style={[styles.freqChip, newFrequency === freq && styles.freqChipActive]}
                  onPress={() => setNewFrequency(freq)}
                >
                  <Text style={[styles.freqChipText, newFrequency === freq && styles.freqChipTextActive]}>{freq}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.addBtn} onPress={addReminder}>
              <Ionicons name="checkmark-circle" size={20} color="#FFF" />
              <Text style={styles.addBtnText}>Add Reminder</Text>
            </TouchableOpacity>
          </Card>
        )}

        {/* Reminders List */}
        {reminders.length === 0 ? (
          <EmptyState
            icon="alarm-outline"
            title="No Reminders Set"
            subtitle="Set up medicine reminders to never miss a dose"
          />
        ) : (
          reminders.map(reminder => (
            <Card key={reminder.id} style={[styles.reminderCard, !reminder.isActive && styles.reminderInactive]}>
              <View style={styles.reminderHeader}>
                <View style={styles.reminderInfo}>
                  <View style={[styles.pillIcon, { backgroundColor: reminder.isActive ? Colors.primaryLight : Colors.divider }]}>
                    <Ionicons name="medical" size={18} color={reminder.isActive ? Colors.primary : Colors.textTertiary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.medicineName, !reminder.isActive && styles.textMuted]}>{reminder.medicine}</Text>
                    <Text style={styles.dosageText}>{reminder.dosage} - {reminder.frequency}</Text>
                  </View>
                </View>
                <Switch
                  value={reminder.isActive}
                  onValueChange={() => toggleReminder(reminder.id)}
                  trackColor={{ false: Colors.border, true: Colors.primary }} thumbColor={Platform.OS === 'android' ? Colors.surface : undefined}
                />
              </View>
              <View style={styles.timesRow}>
                {reminder.times.map((time, i) => (
                  <View key={i} style={styles.timeChip}>
                    <Ionicons name="alarm-outline" size={14} color={Colors.primary} />
                    <Text style={styles.timeText}>{time}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteReminder(reminder.id)}>
                <Ionicons name="trash-outline" size={16} color={Colors.danger} />
                <Text style={styles.deleteBtnText}>Remove</Text>
              </TouchableOpacity>
            </Card>
          ))
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.xl },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.xl },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.text },
  addHeaderBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  summaryCard: { marginBottom: Spacing.xl },
  summaryRow: { flexDirection: 'row', alignItems: 'center' },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryNum: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.primary },
  summaryLabel: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: 2 },
  summaryDivider: { width: 1, height: 30, backgroundColor: Colors.divider },
  addForm: { marginBottom: Spacing.xl, padding: Spacing.lg },
  addFormTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.text, marginBottom: Spacing.md },
  input: {
    height: 48, paddingHorizontal: Spacing.md, borderRadius: BorderRadius.md,
    borderWidth: 1, borderColor: Colors.border, fontSize: FontSize.md,
    color: Colors.text, backgroundColor: Colors.background, marginBottom: Spacing.md,
  },
  freqLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, color: Colors.textSecondary, marginBottom: Spacing.sm },
  freqRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg },
  freqChip: {
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full, borderWidth: 1.5, borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  freqChipActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  freqChipText: { fontSize: FontSize.sm, color: Colors.textSecondary },
  freqChipTextActive: { color: Colors.primary, fontWeight: FontWeight.semibold },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm,
    paddingVertical: Spacing.md, borderRadius: BorderRadius.md, backgroundColor: Colors.primary,
  },
  addBtnText: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: '#FFF' },
  reminderCard: { marginBottom: Spacing.md },
  reminderInactive: { opacity: 0.6 },
  reminderHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  reminderInfo: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, flex: 1 },
  pillIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  medicineName: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.text },
  textMuted: { color: Colors.textTertiary },
  dosageText: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  timesRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.md },
  timeChip: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full, backgroundColor: Colors.primaryLight,
  },
  timeText: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, color: Colors.primary },
  deleteBtn: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, marginTop: Spacing.md, alignSelf: 'flex-end' },
  deleteBtnText: { fontSize: FontSize.sm, color: Colors.danger },
});
