import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing } from '../../src/constants/theme';
import { Input, Button } from '../../src/components/common';
import { TouchableOpacity } from 'react-native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleReset = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    setSent(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>

        {!sent ? (
          <>
            <View style={styles.iconContainer}>
              <Ionicons name="lock-open-outline" size={48} color={Colors.primary} />
            </View>
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>Enter your email address and we'll send you a link to reset your password.</Text>
            <Input label="Email Address" placeholder="Enter your email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" icon="mail-outline" />
            <Button title="Send Reset Link" onPress={handleReset} fullWidth size="lg" />
          </>
        ) : (
          <View style={styles.successContainer}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={64} color={Colors.success} />
            </View>
            <Text style={styles.successTitle}>Check Your Email</Text>
            <Text style={styles.successText}>We've sent a password reset link to {email}</Text>
            <Button title="Back to Login" onPress={() => router.push('/auth/login')} fullWidth size="lg" style={{ marginTop: Spacing.xxl }} />
            <TouchableOpacity style={styles.resendBtn} onPress={() => Alert.alert('Sent', 'Reset link resent!')}>
              <Text style={styles.resendText}>Didn't receive? Resend</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  content: { flex: 1, padding: Spacing.xxl },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.xxl },
  iconContainer: { width: 100, height: 100, borderRadius: 50, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: Spacing.xl },
  title: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text, textAlign: 'center' },
  subtitle: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.sm, marginBottom: Spacing.xxl, lineHeight: 22 },
  successContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  successIcon: { marginBottom: Spacing.xl },
  successTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text },
  successText: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.sm },
  resendBtn: { marginTop: Spacing.xl },
  resendText: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.primary },
});
