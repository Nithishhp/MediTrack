import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { useAuth } from '../../src/context/AuthContext';
import { useApp } from '../../src/context/AppContext';
import { Avatar, Card, SectionHeader, Badge } from '../../src/components/common';
import { MOCK_DOCTORS, MOCK_APPOINTMENTS, MOCK_VITALS } from '../../src/constants/mockData';

const { width } = Dimensions.get('window');

const QUICK_ACTIONS = [
  { icon: 'search' as const, label: 'Find Doctor', route: '/doctor/search', color: Colors.primary },
  { icon: 'videocam' as const, label: 'Consult Now', route: '/consultation/start', color: '#9C27B0' },
  { icon: 'document-text' as const, label: 'Prescription', route: '/prescription/upload', color: Colors.accent },
  { icon: 'cart' as const, label: 'Order Meds', route: '/(tabs)/pharmacy', color: Colors.secondary },
  { icon: 'fitness' as const, label: 'Health AI', route: '/health/ai-assistant', color: '#E91E63' },
  { icon: 'warning' as const, label: 'Emergency', route: '/emergency/', color: Colors.danger },
  { icon: 'folder-open' as const, label: 'Records', route: '/health/records', color: '#607D8B' },
  { icon: 'analytics' as const, label: 'Analytics', route: '/health/analytics', color: '#795548' },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const { unreadCount } = useApp();
  const upcomingAppointments = MOCK_APPOINTMENTS.filter(a => a.status === 'confirmed' || a.status === 'pending');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Avatar uri={user?.avatar} name={`${user?.firstName} ${user?.lastName}`} size={48} />
            <View style={styles.headerText}>
              <Text style={styles.greeting}>{getGreeting()}</Text>
              <Text style={styles.userName}>{user?.firstName || 'Guest'} {user?.lastName || ''}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notifBtn} onPress={() => router.push('/notifications/')}>
            <Ionicons name="notifications-outline" size={24} color={Colors.text} />
            {unreadCount > 0 && (
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* AI Health Banner */}
        <TouchableOpacity style={styles.aiBanner} onPress={() => router.push('/health/ai-assistant')} activeOpacity={0.85}>
          <View style={styles.aiBannerContent}>
            <Ionicons name="sparkles" size={28} color="#FFF" />
            <View style={styles.aiBannerText}>
              <Text style={styles.aiBannerTitle}>AI Health Assistant</Text>
              <Text style={styles.aiBannerSub}>Describe your symptoms for instant analysis</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward-circle" size={32} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.section}>
          <SectionHeader title="Quick Actions" />
          <View style={styles.quickGrid}>
            {QUICK_ACTIONS.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickItem}
                onPress={() => router.push(action.route as any)}
                activeOpacity={0.7}
              >
                <View style={[styles.quickIcon, { backgroundColor: action.color + '15' }]}>
                  <Ionicons name={action.icon} size={24} color={action.color} />
                </View>
                <Text style={styles.quickLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Vitals Overview */}
        <View style={styles.section}>
          <SectionHeader title="Today's Vitals" actionText="View All" onAction={() => router.push('/health/records')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {MOCK_VITALS.slice(0, 4).map(vital => (
              <Card key={vital.id} style={styles.vitalCard}>
                <Ionicons
                  name={
                    vital.type === 'blood_pressure' ? 'water' :
                    vital.type === 'heart_rate' ? 'heart' :
                    vital.type === 'temperature' ? 'thermometer' :
                    vital.type === 'blood_sugar' ? 'nutrition' :
                    vital.type === 'spo2' ? 'pulse' : 'scale'
                  }
                  size={22}
                  color={Colors.primary}
                />
                <Text style={styles.vitalValue}>
                  {vital.value}{vital.secondaryValue ? `/${vital.secondaryValue}` : ''}
                </Text>
                <Text style={styles.vitalUnit}>{vital.unit}</Text>
                <Text style={styles.vitalType}>
                  {vital.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Text>
              </Card>
            ))}
          </ScrollView>
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.section}>
          <SectionHeader title="Upcoming Appointments" actionText="See All" onAction={() => router.push('/(tabs)/appointments')} />
          {upcomingAppointments.length === 0 ? (
            <Card>
              <Text style={styles.noData}>No upcoming appointments</Text>
            </Card>
          ) : (
            upcomingAppointments.map(apt => (
              <Card key={apt.id} style={styles.aptCard} onPress={() => router.push(`/doctor/appointment-detail?id=${apt.id}`)}>
                <View style={styles.aptRow}>
                  <Avatar uri={apt.doctor?.avatar} name={`${apt.doctor?.firstName} ${apt.doctor?.lastName}`} size={50} showOnline isOnline={apt.doctor?.isAvailableOnline} />
                  <View style={styles.aptInfo}>
                    <Text style={styles.aptDoctor}>Dr. {apt.doctor?.firstName} {apt.doctor?.lastName}</Text>
                    <Text style={styles.aptSpec}>{apt.doctor?.specialization}</Text>
                    <View style={styles.aptMeta}>
                      <Ionicons name="calendar-outline" size={14} color={Colors.textSecondary} />
                      <Text style={styles.aptMetaText}>{apt.date}</Text>
                      <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
                      <Text style={styles.aptMetaText}>{apt.timeSlot.startTime}</Text>
                      <Badge
                        text={apt.type === 'video' ? 'Video' : 'In-Person'}
                        variant={apt.type === 'video' ? 'info' : 'primary'}
                      />
                    </View>
                  </View>
                </View>
              </Card>
            ))
          )}
        </View>

        {/* Top Doctors */}
        <View style={styles.section}>
          <SectionHeader title="Top Rated Doctors" actionText="See All" onAction={() => router.push('/doctor/search')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {MOCK_DOCTORS.slice(0, 4).map(doc => (
              <Card key={doc.id} style={styles.docCard} onPress={() => router.push(`/doctor/profile?id=${doc.id}`)}>
                <Avatar uri={doc.avatar} name={`${doc.firstName} ${doc.lastName}`} size={60} showOnline isOnline={doc.isAvailableOnline} />
                <Text style={styles.docName} numberOfLines={1} ellipsizeMode="tail">Dr. {doc.firstName}</Text>
                <Text style={styles.docSpec} numberOfLines={1} ellipsizeMode="tail">{doc.specialization}</Text>
                <View style={styles.docRating}>
                  <Ionicons name="star" size={12} color={Colors.star} />
                  <Text style={styles.docRatingText}>{doc.rating}</Text>
                </View>
              </Card>
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.xl, paddingVertical: Spacing.lg },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  headerText: {},
  greeting: { fontSize: FontSize.sm, color: Colors.textSecondary },
  userName: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.text },
  notifBtn: { position: 'relative', padding: Spacing.sm },
  notifBadge: { position: 'absolute', top: 2, right: 2, backgroundColor: Colors.danger, borderRadius: 8, width: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  notifBadgeText: { color: '#FFF', fontSize: 9, fontWeight: '700' },
  aiBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginHorizontal: Spacing.xl, marginBottom: Spacing.xl, padding: Spacing.lg,
    borderRadius: BorderRadius.xl, backgroundColor: Colors.primary,
    ...Shadow.lg,
  },
  aiBannerContent: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, flex: 1 },
  aiBannerText: { flex: 1 },
  aiBannerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: '#FFF' },
  aiBannerSub: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  section: { paddingHorizontal: Spacing.xl, marginBottom: Spacing.xl },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  quickItem: { width: (width - Spacing.xl * 2 - Spacing.md * 3) / 4, alignItems: 'center', gap: Spacing.xs },
  quickIcon: { width: 52, height: 52, borderRadius: BorderRadius.lg, alignItems: 'center', justifyContent: 'center' },
  quickLabel: { fontSize: FontSize.xs, fontWeight: FontWeight.medium, color: Colors.textSecondary, textAlign: 'center' },
  vitalCard: { width: 120, marginRight: Spacing.md, alignItems: 'center', paddingVertical: Spacing.lg },
  vitalValue: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text, marginTop: Spacing.sm },
  vitalUnit: { fontSize: FontSize.xs, color: Colors.textSecondary },
  vitalType: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: Spacing.xs, textAlign: 'center' },
  aptCard: { marginBottom: Spacing.md },
  aptRow: { flexDirection: 'row', gap: Spacing.md },
  aptInfo: { flex: 1 },
  aptDoctor: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.text },
  aptSpec: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  aptMeta: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, marginTop: Spacing.sm },
  aptMetaText: { fontSize: FontSize.sm, color: Colors.textSecondary, marginRight: Spacing.sm },
  docCard: { width: 140, marginRight: Spacing.md, alignItems: 'center', paddingVertical: Spacing.lg },
  docName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text, marginTop: Spacing.sm },
  docSpec: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: 2 },
  docRating: { flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: Spacing.xs },
  docRatingText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.text },
  noData: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center' },
});
