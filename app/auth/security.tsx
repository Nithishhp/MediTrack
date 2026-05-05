import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { Card, Button, Input } from '../../src/components/common';

export default function SecurityScreen() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [shareHealthData, setShareHealthData] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (newPassword.length < 8) {
      Alert.alert('Error', 'New password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }
    Alert.alert('Success', 'Password changed successfully!');
    setShowChangePassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Account Deletion', 'Your request has been submitted. You will receive a confirmation email.') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Privacy & Security</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Password */}
        <Text style={styles.sectionTitle}>Password</Text>
        <Card>
          <TouchableOpacity style={styles.row} onPress={() => setShowChangePassword(!showChangePassword)}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconCircle, { backgroundColor: Colors.primaryLight }]}>
                <Ionicons name="key-outline" size={20} color={Colors.primary} />
              </View>
              <Text style={styles.rowText}>Change Password</Text>
            </View>
            <Ionicons name={showChangePassword ? 'chevron-up' : 'chevron-forward'} size={20} color={Colors.textTertiary} />
          </TouchableOpacity>
          {showChangePassword && (
            <View style={styles.passwordForm}>
              <Input label="Current Password" placeholder="Enter current password" value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry icon="lock-closed-outline" />
              <Input label="New Password" placeholder="Enter new password" value={newPassword} onChangeText={setNewPassword} secureTextEntry icon="lock-closed-outline" />
              <Input label="Confirm Password" placeholder="Re-enter new password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry icon="lock-closed-outline" />
              <Button title="Update Password" onPress={handleChangePassword} fullWidth size="md" style={{ marginTop: Spacing.sm }} />
            </View>
          )}
          <View style={styles.divider} />
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconCircle, { backgroundColor: Colors.infoLight }]}>
                <Ionicons name="shield-checkmark-outline" size={20} color={Colors.info} />
              </View>
              <View>
                <Text style={styles.rowText}>Two-Factor Authentication</Text>
                <Text style={styles.rowSub}>Add extra security to your account</Text>
              </View>
            </View>
            <Switch value={twoFAEnabled} onValueChange={setTwoFAEnabled} trackColor={{ false: Colors.border, true: Colors.primary }} thumbColor={Platform.OS === 'android' ? Colors.surface : undefined} />
          </View>
        </Card>

        {/* Biometrics */}
        <Text style={styles.sectionTitle}>Biometrics</Text>
        <Card>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconCircle, { backgroundColor: Colors.secondaryLight }]}>
                <Ionicons name="finger-print-outline" size={20} color={Colors.secondary} />
              </View>
              <View>
                <Text style={styles.rowText}>Face ID / Fingerprint</Text>
                <Text style={styles.rowSub}>Use biometrics to log in faster</Text>
              </View>
            </View>
            <Switch value={biometricEnabled} onValueChange={setBiometricEnabled} trackColor={{ false: Colors.border, true: Colors.primary }} thumbColor={Platform.OS === 'android' ? Colors.surface : undefined} />
          </View>
        </Card>

        {/* Privacy */}
        <Text style={styles.sectionTitle}>Privacy</Text>
        <Card>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconCircle, { backgroundColor: Colors.primaryLight }]}>
                <Ionicons name="heart-outline" size={20} color={Colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowText}>Share Health Data with Doctors</Text>
                <Text style={styles.rowSub}>Allow doctors to view your records</Text>
              </View>
            </View>
            <Switch value={shareHealthData} onValueChange={setShareHealthData} trackColor={{ false: Colors.border, true: Colors.primary }} thumbColor={Platform.OS === 'android' ? Colors.surface : undefined} />
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconCircle, { backgroundColor: Colors.accentLight }]}>
                <Ionicons name="analytics-outline" size={20} color={Colors.accent} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowText}>Analytics & Crash Reports</Text>
                <Text style={styles.rowSub}>Help us improve the app</Text>
              </View>
            </View>
            <Switch value={analyticsEnabled} onValueChange={setAnalyticsEnabled} trackColor={{ false: Colors.border, true: Colors.primary }} thumbColor={Platform.OS === 'android' ? Colors.surface : undefined} />
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconCircle, { backgroundColor: Colors.warningLight }]}>
                <Ionicons name="mail-outline" size={20} color={Colors.warning} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowText}>Marketing Communications</Text>
                <Text style={styles.rowSub}>Receive promotional emails</Text>
              </View>
            </View>
            <Switch value={marketingEnabled} onValueChange={setMarketingEnabled} trackColor={{ false: Colors.border, true: Colors.primary }} thumbColor={Platform.OS === 'android' ? Colors.surface : undefined} />
          </View>
        </Card>

        {/* Account Actions */}
        <Text style={styles.sectionTitle}>Account</Text>
        <Card>
          <TouchableOpacity style={styles.row} onPress={() => Alert.alert('Download Data', 'Your data export has been initiated. You will receive a download link via email within 24 hours.')}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconCircle, { backgroundColor: Colors.infoLight }]}>
                <Ionicons name="download-outline" size={20} color={Colors.info} />
              </View>
              <Text style={styles.rowText}>Download My Data</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.row} onPress={handleDeleteAccount}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconCircle, { backgroundColor: Colors.dangerLight }]}>
                <Ionicons name="trash-outline" size={20} color={Colors.danger} />
              </View>
              <Text style={[styles.rowText, { color: Colors.danger }]}>Delete Account</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.danger} />
          </TouchableOpacity>
        </Card>

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
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.text, marginBottom: Spacing.md, marginTop: Spacing.lg },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: Spacing.md },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, flex: 1 },
  rowText: { fontSize: FontSize.md, fontWeight: FontWeight.medium, color: Colors.text },
  rowSub: { fontSize: FontSize.xs, color: Colors.textTertiary, marginTop: 2 },
  iconCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  divider: { height: 1, backgroundColor: Colors.divider, marginVertical: Spacing.xs },
  passwordForm: { paddingTop: Spacing.md, paddingBottom: Spacing.sm },
});
