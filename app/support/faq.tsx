import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../../src/constants/theme';
import { Card, SearchBar } from '../../src/components/common';

const FAQ_ITEMS = [
  { id: '1', q: 'How do I book an appointment?', a: 'Go to the Home tab, tap "Find Doctor", search for a specialist by name or specialization, then select an available date and time slot to book your appointment.' },
  { id: '2', q: 'How do I start a video consultation?', a: 'From the Home tab, tap "Consult Now" to see available online doctors. Select a doctor and tap "Start Consultation" to begin your video call.' },
  { id: '3', q: 'How do I upload a prescription?', a: 'Tap "Prescription" from Quick Actions on the Home tab. You can scan using your camera, choose from your gallery, or upload a PDF file. Our AI will analyze it automatically.' },
  { id: '4', q: 'Is my health data secure?', a: 'Yes. All health records are encrypted using industry-standard encryption and stored securely. We comply with healthcare data regulations to ensure your information is protected.' },
  { id: '5', q: 'How do I set up medicine reminders?', a: 'Go to Profile > Medicine Reminders. Tap the "+" button to add a new reminder with the medicine name, dosage, and frequency. You will receive push notifications at the scheduled times.' },
  { id: '6', q: 'How do I order medicines?', a: 'Go to the Pharmacy tab, browse or search for medicines, add them to your cart, and proceed to checkout. You can also order medicines directly from a scanned prescription.' },
  { id: '7', q: 'How does the AI Health Assistant work?', a: 'The AI Health Assistant analyzes your symptoms and provides possible conditions, urgency levels, recommended specialists, and home remedies. It is for informational purposes only and does not replace professional medical advice.' },
  { id: '8', q: 'How do I use the Emergency feature?', a: 'Tap "Emergency" from Quick Actions or navigate to the Emergency screen. You can call emergency services (911), book an ambulance, share your live location, or find nearby hospitals.' },
  { id: '9', q: 'Can I share my health records with my doctor?', a: 'Yes. Go to Health > Records, select a record, and use the share option to send it directly to your doctor or export it as a file.' },
  { id: '10', q: 'How do I track my health vitals?', a: 'Go to the Health tab and tap "Log Vitals". You can record blood pressure, heart rate, temperature, blood sugar, SpO2, and weight. View trends in Health Analytics.' },
];

export default function FAQScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? FAQ_ITEMS.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
    : FAQ_ITEMS;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Help & FAQ</Text>
          <View style={{ width: 40 }} />
        </View>

        <SearchBar placeholder="Search questions..." value={search} onChangeText={setSearch} />

        <View style={{ height: Spacing.lg }} />

        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color={Colors.textTertiary} />
            <Text style={styles.emptyText}>No matching questions found</Text>
          </View>
        ) : (
          filtered.map(item => (
            <Card key={item.id} style={styles.faqCard}>
              <TouchableOpacity
                style={styles.questionRow}
                onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}
                activeOpacity={0.7}
              >
                <View style={styles.qIcon}>
                  <Ionicons name="help-circle" size={22} color={Colors.primary} />
                </View>
                <Text style={styles.questionText}>{item.q}</Text>
                <Ionicons
                  name={expandedId === item.id ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={Colors.textTertiary}
                />
              </TouchableOpacity>
              {expandedId === item.id && (
                <View style={styles.answerContainer}>
                  <Text style={styles.answerText}>{item.a}</Text>
                </View>
              )}
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
  faqCard: { marginBottom: Spacing.md },
  questionRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  qIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  questionText: { flex: 1, fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  answerContainer: { marginTop: Spacing.md, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.divider },
  answerText: { fontSize: FontSize.md, color: Colors.textSecondary, lineHeight: 22 },
  emptyState: { alignItems: 'center', paddingVertical: Spacing.xxxxl },
  emptyText: { fontSize: FontSize.md, color: Colors.textTertiary, marginTop: Spacing.md },
});
