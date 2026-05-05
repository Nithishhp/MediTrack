import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { Avatar, Card } from '../../src/components/common';
import { useAuth } from '../../src/context/AuthContext';

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  route?: string;
  onPress?: () => void;
  danger?: boolean;
}

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleRateUs = () => {
    const url = Platform.OS === 'ios'
      ? 'https://apps.apple.com/app/meditrack/id000000000'
      : 'https://play.google.com/store/apps/details?id=com.meditrack.app';
    Linking.openURL(url).catch(() =>
      Alert.alert('Error', 'Could not open the app store.')
    );
  };

  const menuSections: { title: string; items: MenuItem[] }[] = [
    {
      title: 'Account',
      items: [
        { icon: 'person-outline', title: 'Edit Profile', subtitle: 'Update your personal information', route: '/auth/edit-profile' },
        { icon: 'shield-checkmark-outline', title: 'Privacy & Security', subtitle: 'Password, 2FA, data privacy', route: '/auth/security' },
        { icon: 'card-outline', title: 'Payment Methods', subtitle: 'Manage cards and wallets', route: '/auth/payments' },
        { icon: 'notifications-outline', title: 'Notifications', subtitle: 'Customize alerts and reminders', route: '/notifications/' },
      ],
    },
    {
      title: 'Health',
      items: [
        { icon: 'document-text-outline', title: 'Health Records', subtitle: 'View and manage EHR', route: '/health/records' },
        { icon: 'medical-outline', title: 'Prescriptions', subtitle: 'Upload and view prescriptions', route: '/prescription/upload' },
        { icon: 'fitness-outline', title: 'Health Analytics', subtitle: 'Insights and health score', route: '/health/analytics' },
        { icon: 'alarm-outline', title: 'Medicine Reminders', subtitle: 'Setup dosage reminders', route: '/reminders/' },
      ],
    },
    {
      title: 'Pharmacy',
      items: [
        { icon: 'receipt-outline', title: 'Order History', subtitle: 'Track and view past orders', route: '/pharmacy/orders' },
        { icon: 'business-outline', title: 'Pharmacy Management', subtitle: 'Inventory & sales dashboard', route: '/inventory/' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: 'help-circle-outline', title: 'Help & FAQ', subtitle: 'Get help with MediTrack', route: '/support/faq' },
        { icon: 'chatbubble-outline', title: 'Contact Support', subtitle: 'Chat or email our team', route: '/support/contact' },
        { icon: 'star-outline', title: 'Rate Us', subtitle: 'Share your experience', onPress: handleRateUs },
        { icon: 'information-circle-outline', title: 'About', subtitle: 'Version 1.0.0', route: '/support/about' },
      ],
    },
    {
      title: '',
      items: [
        {
          icon: 'log-out-outline', title: 'Logout', danger: true,
          onPress: () => {
            Alert.alert('Logout', 'Are you sure you want to logout?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Logout', style: 'destructive', onPress: () => { logout(); router.replace('/auth/login'); } },
            ]);
          },
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <View style={styles.profileRow}>
            <Avatar uri={user?.avatar} name={`${user?.firstName} ${user?.lastName}`} size={72} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.firstName} {user?.lastName}</Text>
              <Text style={styles.profileEmail}>{user?.email}</Text>
              <View style={styles.profileMeta}>
                <View style={styles.metaChip}>
                  <Ionicons name="water" size={14} color={Colors.danger} />
                  <Text style={styles.metaText}>{user?.bloodGroup || 'N/A'}</Text>
                </View>
                <View style={styles.metaChip}>
                  <Ionicons name="shield-checkmark" size={14} color={Colors.success} />
                  <Text style={styles.metaText}>Verified</Text>
                </View>
              </View>
            </View>
          </View>
          {user?.allergies && user.allergies.length > 0 && (
            <View style={styles.allergies}>
              <Text style={styles.allergiesLabel}>Allergies:</Text>
              <View style={styles.allergyChips}>
                {user.allergies.map((allergy, i) => (
                  <View key={i} style={styles.allergyChip}>
                    <Text style={styles.allergyText}>{allergy}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </Card>

        {/* Menu Sections */}
        {menuSections.map((section, sIndex) => (
          <View key={sIndex} style={styles.menuSection}>
            {section.title ? <Text style={styles.sectionTitle}>{section.title}</Text> : null}
            <Card style={styles.menuCard} noBorder>
              {section.items.map((item, iIndex) => (
                <TouchableOpacity
                  key={iIndex}
                  style={[styles.menuItem, iIndex < section.items.length - 1 && styles.menuItemBorder]}
                  onPress={item.onPress || (() => item.route && router.push(item.route as any))}
                >
                  <Ionicons name={item.icon} size={22} color={item.danger ? Colors.danger : Colors.textSecondary} />
                  <View style={styles.menuItemText}>
                    <Text style={[styles.menuTitle, item.danger && { color: Colors.danger }]}>{item.title}</Text>
                    {item.subtitle && <Text style={styles.menuSubtitle}>{item.subtitle}</Text>}
                  </View>
                  {!item.danger && <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />}
                </TouchableOpacity>
              ))}
            </Card>
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.xl, paddingVertical: Spacing.lg },
  headerTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text },
  profileCard: { marginHorizontal: Spacing.xl, marginBottom: Spacing.xl },
  profileRow: { flexDirection: 'row', gap: Spacing.lg },
  profileInfo: { flex: 1, justifyContent: 'center' },
  profileName: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.text },
  profileEmail: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  profileMeta: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm },
  metaChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.background, paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: BorderRadius.full },
  metaText: { fontSize: FontSize.xs, fontWeight: '600', color: Colors.textSecondary },
  allergies: { marginTop: Spacing.md, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.divider },
  allergiesLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.text, marginBottom: Spacing.xs },
  allergyChips: { flexDirection: 'row', gap: Spacing.xs, flexWrap: 'wrap' },
  allergyChip: { backgroundColor: Colors.dangerLight, paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: BorderRadius.full },
  allergyText: { fontSize: FontSize.xs, color: Colors.danger, fontWeight: '600' },
  menuSection: { marginBottom: Spacing.md },
  sectionTitle: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.textSecondary, paddingHorizontal: Spacing.xl, marginBottom: Spacing.sm, textTransform: 'uppercase', letterSpacing: 0.5 },
  menuCard: { marginHorizontal: Spacing.xl, padding: 0, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: Spacing.lg, gap: Spacing.md },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: Colors.divider },
  menuItemText: { flex: 1 },
  menuTitle: { fontSize: FontSize.md, fontWeight: FontWeight.medium, color: Colors.text },
  menuSubtitle: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 1 },
});
