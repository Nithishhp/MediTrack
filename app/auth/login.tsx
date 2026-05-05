import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../../src/constants/theme';
import { Input, Button, Logo } from '../../src/components/common';
import { useAuth } from '../../src/context/AuthContext';

export default function LoginScreen() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (e) {
      setErrors({ email: 'Invalid credentials' });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Logo size={90} />
            <Text style={styles.appName}>MediTrack</Text>
            <Text style={styles.tagline}>Your AI Healthcare Companion</Text>
          </View>

          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue to your account</Text>

          <Input
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            error={errors.email}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            icon="lock-closed-outline"
            error={errors.password}
          />

          <TouchableOpacity style={styles.forgotBtn} onPress={() => router.push('/auth/forgot-password')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button title="Sign In" onPress={handleLogin} isLoading={isLoading} fullWidth size="lg" />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialRow}>
            {[
              { name: 'logo-google', color: '#DB4437' },
              { name: 'logo-apple', color: '#000' },
              { name: 'logo-facebook', color: '#4267B2' },
            ].map((social, i) => (
              <TouchableOpacity key={i} style={styles.socialBtn}>
                <Ionicons name={social.name as any} size={24} color={social.color} />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/register')}>
              <Text style={styles.registerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.demoBtn} onPress={() => { login('demo@test.com', 'demo123').then(() => router.replace('/(tabs)')); }}>
            <Ionicons name="flash" size={16} color={Colors.accent} />
            <Text style={styles.demoText}>Quick Demo Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  content: { padding: Spacing.xxl, paddingTop: Spacing.xxxxl },
  logoContainer: { alignItems: 'center', marginBottom: Spacing.xxxl },
  logoIcon: { marginBottom: Spacing.md },
  appName: { fontSize: FontSize.xxxl, fontWeight: FontWeight.extrabold, color: Colors.primary },
  tagline: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.xs },
  title: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: Spacing.xs },
  subtitle: { fontSize: FontSize.md, color: Colors.textSecondary, marginBottom: Spacing.xxl },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: Spacing.xl, marginTop: -Spacing.sm },
  forgotText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.primary },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: Spacing.xxl },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerText: { marginHorizontal: Spacing.md, fontSize: FontSize.sm, color: Colors.textTertiary },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: Spacing.lg, marginBottom: Spacing.xxl },
  socialBtn: { width: 56, height: 56, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  registerRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: Spacing.xl },
  registerText: { fontSize: FontSize.md, color: Colors.textSecondary },
  registerLink: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.primary },
  demoBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.xs, padding: Spacing.md, borderRadius: BorderRadius.md, backgroundColor: Colors.accentLight },
  demoText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.accent },
});
