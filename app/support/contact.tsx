import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { Card, Button } from '../../src/components/common';

export default function ContactScreen() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (!subject.trim() || !message.trim()) {
      Alert.alert('Error', 'Please fill in both subject and message.');
      return;
    }
    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSending(false);
    Alert.alert('Message Sent', 'Thank you for reaching out! Our support team will respond within 24 hours.');
    setSubject('');
    setMessage('');
  };

  const contactMethods = [
    {
      icon: 'chatbubble-ellipses' as const,
      title: 'Live Chat',
      subtitle: 'Available Mon-Fri, 9AM-6PM',
      color: Colors.primary,
      bgColor: Colors.primaryLight,
      onPress: () => Alert.alert('Live Chat', 'Live chat support will be available soon. Please use email or phone for now.'),
    },
    {
      icon: 'mail' as const,
      title: 'Email Support',
      subtitle: 'support@meditrack.com',
      color: Colors.accent,
      bgColor: Colors.accentLight,
      onPress: () => Linking.openURL('mailto:support@meditrack.com'),
    },
    {
      icon: 'call' as const,
      title: 'Phone Support',
      subtitle: '+1-800-MEDITRACK',
      color: Colors.secondary,
      bgColor: Colors.secondaryLight,
      onPress: () => Linking.openURL('tel:+18006334872'),
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Contact Support</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Contact Methods */}
        {contactMethods.map((method, i) => (
          <TouchableOpacity key={i} activeOpacity={0.7} onPress={method.onPress}>
            <Card style={styles.contactCard}>
              <View style={styles.contactRow}>
                <View style={[styles.contactIcon, { backgroundColor: method.bgColor }]}>
                  <Ionicons name={method.icon} size={24} color={method.color} />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactTitle}>{method.title}</Text>
                  <Text style={styles.contactSub}>{method.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
              </View>
            </Card>
          </TouchableOpacity>
        ))}

        {/* Quick Message */}
        <Text style={styles.sectionTitle}>Send a Message</Text>
        <Card style={styles.messageCard}>
          <TextInput
            style={styles.input}
            placeholder="Subject"
            placeholderTextColor={Colors.textTertiary}
            value={subject}
            onChangeText={setSubject}
          />
          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Describe your issue or question..."
            placeholderTextColor={Colors.textTertiary}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
          <Button title="Send Message" onPress={handleSendMessage} isLoading={isSending} fullWidth size="lg" />
        </Card>

        {/* Response Time */}
        <Card style={styles.infoCard}>
          <Ionicons name="time-outline" size={20} color={Colors.info} />
          <Text style={styles.infoText}>Average response time: Under 24 hours</Text>
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
  contactCard: { marginBottom: Spacing.md },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  contactIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  contactInfo: { flex: 1 },
  contactTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.text },
  contactSub: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.text, marginBottom: Spacing.md, marginTop: Spacing.lg },
  messageCard: { padding: Spacing.lg },
  input: {
    height: 48, paddingHorizontal: Spacing.md, borderRadius: BorderRadius.md,
    borderWidth: 1, borderColor: Colors.border, fontSize: FontSize.md,
    color: Colors.text, backgroundColor: Colors.background, marginBottom: Spacing.md,
  },
  messageInput: { height: 120, paddingTop: Spacing.md },
  infoCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginTop: Spacing.lg, backgroundColor: Colors.infoLight },
  infoText: { fontSize: FontSize.sm, color: Colors.info, fontWeight: FontWeight.medium },
});
