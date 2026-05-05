import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../../src/constants/theme';
import { Input, Button } from '../../src/components/common';
import { useAuth } from '../../src/context/AuthContext';

export default function RegisterScreen() {
  const { register, isLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '',
    role: 'patient' as 'patient' | 'doctor',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateForm = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.firstName) e.firstName = 'Required';
    if (!form.lastName) e.lastName = 'Required';
    if (!form.email) e.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone) e.phone = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!form.password) e.password = 'Required';
    else if (form.password.length < 8) e.password = 'Minimum 8 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
  };

  const handleRegister = async () => {
    if (!validateStep2()) return;
    try {
      await register(form);
      router.replace('/(tabs)');
    } catch (e) {
      setErrors({ email: 'Registration failed' });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.backBtn} onPress={() => step === 1 ? router.back() : setStep(1)}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Step {step} of 2 - {step === 1 ? 'Personal Info' : 'Security'}</Text>

          {/* Progress */}
          <View style={styles.progress}>
            <View style={[styles.progressBar, { width: `${step * 50}%` }]} />
          </View>

          {/* Role Selection */}
          {step === 1 && (
            <>
              <View style={styles.roleRow}>
                {(['patient', 'doctor'] as const).map(role => (
                  <TouchableOpacity
                    key={role}
                    style={[styles.roleBtn, form.role === role && styles.roleBtnActive]}
                    onPress={() => updateForm('role', role)}
                  >
                    <Ionicons name={role === 'patient' ? 'person' : 'medkit'} size={24} color={form.role === role ? Colors.primary : Colors.textSecondary} />
                    <Text style={[styles.roleText, form.role === role && styles.roleTextActive]}>{role === 'patient' ? 'Patient' : 'Doctor'}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Input label="First Name" placeholder="Enter first name" value={form.firstName} onChangeText={v => updateForm('firstName', v)} icon="person-outline" error={errors.firstName} />
              <Input label="Last Name" placeholder="Enter last name" value={form.lastName} onChangeText={v => updateForm('lastName', v)} icon="person-outline" error={errors.lastName} />
              <Input label="Email" placeholder="Enter email address" value={form.email} onChangeText={v => updateForm('email', v)} keyboardType="email-address" autoCapitalize="none" icon="mail-outline" error={errors.email} />
              <Input label="Phone Number" placeholder="Enter phone number" value={form.phone} onChangeText={v => updateForm('phone', v)} keyboardType="phone-pad" icon="call-outline" error={errors.phone} />

              <Button title="Continue" onPress={handleNext} fullWidth size="lg" style={{ marginTop: Spacing.lg }} />
            </>
          )}

          {step === 2 && (
            <>
              <Input label="Password" placeholder="Create a strong password" value={form.password} onChangeText={v => updateForm('password', v)} secureTextEntry icon="lock-closed-outline" error={errors.password} />
              <Input label="Confirm Password" placeholder="Re-enter your password" value={form.confirmPassword} onChangeText={v => updateForm('confirmPassword', v)} secureTextEntry icon="lock-closed-outline" error={errors.confirmPassword} />

              <View style={styles.passwordRules}>
                {[
                  { rule: 'At least 8 characters', met: form.password.length >= 8 },
                  { rule: 'Contains uppercase letter', met: /[A-Z]/.test(form.password) },
                  { rule: 'Contains number', met: /\d/.test(form.password) },
                  { rule: 'Contains special character', met: /[!@#$%^&*]/.test(form.password) },
                ].map((item, i) => (
                  <View key={i} style={styles.ruleRow}>
                    <Ionicons name={item.met ? 'checkmark-circle' : 'ellipse-outline'} size={16} color={item.met ? Colors.success : Colors.textTertiary} />
                    <Text style={[styles.ruleText, item.met && styles.ruleTextMet]}>{item.rule}</Text>
                  </View>
                ))}
              </View>

              <Button title="Create Account" onPress={handleRegister} isLoading={isLoading} fullWidth size="lg" style={{ marginTop: Spacing.xl }} />
            </>
          )}

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  content: { padding: Spacing.xxl },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.xl },
  title: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text },
  subtitle: { fontSize: FontSize.md, color: Colors.textSecondary, marginTop: Spacing.xs, marginBottom: Spacing.xl },
  progress: { height: 4, backgroundColor: Colors.divider, borderRadius: 2, marginBottom: Spacing.xxl },
  progressBar: { height: 4, backgroundColor: Colors.primary, borderRadius: 2 },
  roleRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.xl },
  roleBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, padding: Spacing.lg, borderRadius: BorderRadius.lg, borderWidth: 1.5, borderColor: Colors.border },
  roleBtnActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  roleText: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.textSecondary },
  roleTextActive: { color: Colors.primary },
  passwordRules: { marginTop: Spacing.md, gap: Spacing.sm },
  ruleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  ruleText: { fontSize: FontSize.sm, color: Colors.textTertiary },
  ruleTextMet: { color: Colors.success },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.xxl },
  loginText: { fontSize: FontSize.md, color: Colors.textSecondary },
  loginLink: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.primary },
});
