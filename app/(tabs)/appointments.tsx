import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../../src/constants/theme';
import { Card, Avatar, StatusChip, Badge, EmptyState } from '../../src/components/common';
import { MOCK_APPOINTMENTS } from '../../src/constants/mockData';

type TabType = 'upcoming' | 'past';

export default function AppointmentsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');

  const upcoming = MOCK_APPOINTMENTS.filter(a => ['confirmed', 'pending', 'in_progress'].includes(a.status));
  const past = MOCK_APPOINTMENTS.filter(a => ['completed', 'cancelled', 'no_show'].includes(a.status));
  const appointments = activeTab === 'upcoming' ? upcoming : past;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>My Appointments</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/doctor/search')}>
          <Ionicons name="add" size={24} color={Colors.textLight} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        {(['upcoming', 'past'] as TabType[]).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab === 'upcoming' ? `Upcoming (${upcoming.length})` : `Past (${past.length})`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {appointments.length === 0 ? (
          <EmptyState
            icon="calendar-outline"
            title={`No ${activeTab} appointments`}
            subtitle={activeTab === 'upcoming' ? 'Book an appointment with a doctor' : 'Your past appointments will appear here'}
            actionTitle={activeTab === 'upcoming' ? 'Book Now' : undefined}
            onAction={activeTab === 'upcoming' ? () => router.push('/doctor/search') : undefined}
          />
        ) : (
          appointments.map(apt => (
            <Card key={apt.id} style={styles.aptCard} onPress={() => router.push(`/doctor/appointment-detail?id=${apt.id}`)}>
              <View style={styles.aptHeader}>
                <StatusChip status={apt.status} />
                <Badge text={apt.type === 'video' ? 'Video Call' : 'In-Person'} variant={apt.type === 'video' ? 'info' : 'primary'} />
              </View>
              <View style={styles.aptBody}>
                <Avatar uri={apt.doctor?.avatar} name={`${apt.doctor?.firstName} ${apt.doctor?.lastName}`} size={56} />
                <View style={styles.aptInfo}>
                  <Text style={styles.docName}>Dr. {apt.doctor?.firstName} {apt.doctor?.lastName}</Text>
                  <Text style={styles.docSpec}>{apt.doctor?.specialization}</Text>
                  <View style={styles.aptMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="calendar-outline" size={14} color={Colors.primary} />
                      <Text style={styles.metaText}>{apt.date}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="time-outline" size={14} color={Colors.primary} />
                      <Text style={styles.metaText}>{apt.timeSlot.startTime} - {apt.timeSlot.endTime}</Text>
                    </View>
                  </View>
                </View>
              </View>
              {apt.status === 'confirmed' && apt.type === 'video' && (
                <TouchableOpacity style={styles.joinBtn} onPress={() => router.push(`/consultation/video?appointmentId=${apt.id}`)}>
                  <Ionicons name="videocam" size={18} color={Colors.textLight} />
                  <Text style={styles.joinBtnText}>Join Consultation</Text>
                </TouchableOpacity>
              )}
            </Card>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.xl, paddingVertical: Spacing.lg },
  title: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text },
  addBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  tabs: { flexDirection: 'row', paddingHorizontal: Spacing.xl, gap: Spacing.sm, marginBottom: Spacing.lg },
  tab: { flex: 1, paddingVertical: Spacing.md, alignItems: 'center', borderRadius: BorderRadius.md, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border },
  activeTab: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  tabText: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.textSecondary },
  activeTabText: { color: Colors.textLight },
  list: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.xxxl },
  aptCard: { marginBottom: Spacing.md },
  aptHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.md },
  aptBody: { flexDirection: 'row', gap: Spacing.md },
  aptInfo: { flex: 1 },
  docName: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.text },
  docSpec: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  aptMeta: { flexDirection: 'row', gap: Spacing.lg, marginTop: Spacing.sm },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  metaText: { fontSize: FontSize.sm, color: Colors.textSecondary },
  joinBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm,
    backgroundColor: Colors.secondary, borderRadius: BorderRadius.md, paddingVertical: Spacing.md, marginTop: Spacing.md,
  },
  joinBtnText: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.textLight },
});
