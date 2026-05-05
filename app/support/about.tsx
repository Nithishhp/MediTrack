import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../../src/constants/theme';
import { Card, Logo } from '../../src/components/common';

export default function AboutScreen() {
  const links = [
    { icon: 'document-text-outline' as const, title: 'Privacy Policy', onPress: () => Alert.alert('Privacy Policy', 'Our privacy policy details how we collect, use, and protect your personal and health data in compliance with healthcare regulations.') },
    { icon: 'shield-checkmark-outline' as const, title: 'Terms of Service', onPress: () => Alert.alert('Terms of Service', 'By using MediTrack, you agree to our terms of service governing the use of our healthcare platform.') },
    { icon: 'code-slash-outline' as const, title: 'Open Source Licenses', onPress: () => Alert.alert('Open Source', 'MediTrack uses various open-source libraries including React Native, Expo, and more. Full license details are available in our repository.') },
  ];

  const socialLinks = [
    { icon: 'logo-twitter' as const, color: '#1DA1F2', url: 'https://twitter.com' },
    { icon: 'logo-instagram' as const, color: '#E1306C', url: 'https://instagram.com' },
    { icon: 'logo-linkedin' as const, color: '#0A66C2', url: 'https://linkedin.com' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Logo & App Info */}
        <View style={styles.logoSection}>
          <Logo size={80} />
          <Text style={styles.appName}>MediTrack</Text>
          <Text style={styles.version}>Version 1.0.0 (Build 1)</Text>
          <Text style={styles.tagline}>Your AI Healthcare Companion</Text>
        </View>

        {/* About Card */}
        <Card style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>What is MediTrack?</Text>
          <Text style={styles.aboutText}>
            MediTrack is an all-in-one AI-powered healthcare platform that helps you manage your health journey. From finding doctors and booking appointments to ordering medicines and tracking your vitals — everything you need for your healthcare is in one place.
          </Text>
        </Card>

        <Card style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>Our Mission</Text>
          <Text style={styles.aboutText}>
            We believe healthcare should be accessible, affordable, and intelligent. Our mission is to leverage AI technology to make quality healthcare available to everyone, anytime and anywhere.
          </Text>
        </Card>

        {/* Features Summary */}
        <Card style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>Key Features</Text>
          {[
            { icon: 'search', text: 'Find and book doctors across 16+ specializations' },
            { icon: 'videocam', text: 'HD video consultations with AI transcription' },
            { icon: 'document-text', text: 'AI-powered prescription scanning and analysis' },
            { icon: 'cart', text: 'Online pharmacy with price comparison' },
            { icon: 'fitness', text: 'AI Health Assistant for symptom analysis' },
            { icon: 'pulse', text: 'Vital signs tracking and health analytics' },
          ].map((feature, i) => (
            <View key={i} style={styles.featureRow}>
              <Ionicons name={feature.icon as any} size={18} color={Colors.primary} />
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </Card>

        {/* Links */}
        <Text style={styles.sectionTitle}>Legal</Text>
        <Card>
          {links.map((link, i) => (
            <React.Fragment key={i}>
              {i > 0 && <View style={styles.divider} />}
              <TouchableOpacity style={styles.linkRow} onPress={link.onPress}>
                <Ionicons name={link.icon} size={20} color={Colors.textSecondary} />
                <Text style={styles.linkText}>{link.title}</Text>
                <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </Card>

        {/* Social */}
        <View style={styles.socialSection}>
          <Text style={styles.socialTitle}>Follow Us</Text>
          <View style={styles.socialRow}>
            {socialLinks.map((social, i) => (
              <TouchableOpacity
                key={i}
                style={styles.socialBtn}
                onPress={() => Linking.openURL(social.url)}
              >
                <Ionicons name={social.icon} size={24} color={social.color} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>Made with care for your health</Text>
        <Text style={styles.copyright}>2024-2026 MediTrack. All rights reserved.</Text>

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
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.text },
  logoSection: { alignItems: 'center', marginBottom: Spacing.xxl },
  appName: { fontSize: FontSize.xxxl, fontWeight: FontWeight.extrabold, color: Colors.primary, marginTop: Spacing.md },
  version: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.xs },
  tagline: { fontSize: FontSize.md, color: Colors.textTertiary, marginTop: Spacing.xs },
  aboutCard: { marginBottom: Spacing.md },
  aboutTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.text, marginBottom: Spacing.sm },
  aboutText: { fontSize: FontSize.md, color: Colors.textSecondary, lineHeight: 22 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.sm },
  featureText: { fontSize: FontSize.md, color: Colors.textSecondary, flex: 1 },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.text, marginBottom: Spacing.md, marginTop: Spacing.lg },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.md },
  linkText: { flex: 1, fontSize: FontSize.md, fontWeight: FontWeight.medium, color: Colors.text },
  divider: { height: 1, backgroundColor: Colors.divider },
  socialSection: { alignItems: 'center', marginTop: Spacing.xxl },
  socialTitle: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.textSecondary, marginBottom: Spacing.md },
  socialRow: { flexDirection: 'row', gap: Spacing.xl },
  socialBtn: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.surface,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.border,
  },
  footerText: { textAlign: 'center', fontSize: FontSize.sm, color: Colors.textTertiary, marginTop: Spacing.xxl },
  copyright: { textAlign: 'center', fontSize: FontSize.xs, color: Colors.textTertiary, marginTop: Spacing.xs },
});
