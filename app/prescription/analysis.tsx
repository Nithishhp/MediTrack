import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { Card, Badge, Button } from '../../src/components/common';

// Mock OCR results
const MOCK_OCR_RESULT = {
  confidence: 94,
  medicines: [
    { id: '1', name: 'Amoxicillin 500mg', dosage: '500mg', frequency: 'Twice daily', duration: '7 days', instructions: 'After meals', genericAlternative: 'Generic Amoxicillin - $4.99 (Save 60%)' },
    { id: '2', name: 'Omeprazole 20mg', dosage: '20mg', frequency: 'Once daily', duration: '14 days', instructions: 'Before breakfast', genericAlternative: null },
    { id: '3', name: 'Cetirizine 10mg', dosage: '10mg', frequency: 'Once daily', duration: '10 days', instructions: 'At bedtime', genericAlternative: 'Generic Cetirizine - $2.99 (Save 40%)' },
  ],
  interactions: [
    { drugs: 'Amoxicillin + Omeprazole', severity: 'low' as const, description: 'Minor interaction: Omeprazole may slightly reduce Amoxicillin absorption. Take 2 hours apart.' },
  ],
  allergyAlerts: ['Warning: You have a listed allergy to Penicillin. Amoxicillin is a penicillin-type antibiotic.'],
  duplicates: [],
};

export default function PrescriptionAnalysisScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState(MOCK_OCR_RESULT);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingTitle}>Analyzing Prescription</Text>
        <Text style={styles.loadingText}>AI is extracting medicine details...</Text>
        <View style={styles.loadingSteps}>
          {['OCR Text Extraction', 'Medicine Identification', 'Drug Interaction Check', 'Allergy Cross-check'].map((step, i) => (
            <View key={i} style={styles.loadingStep}>
              <Ionicons name={i < 2 ? 'checkmark-circle' : 'ellipsis-horizontal-circle'} size={20} color={i < 2 ? Colors.success : Colors.textTertiary} />
              <Text style={[styles.loadingStepText, i < 2 && styles.loadingStepDone]}>{step}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      {/* Confidence Score */}
      <Card style={styles.confidenceCard}>
        <View style={styles.confidenceRow}>
          <View style={styles.confidenceCircle}>
            <Text style={styles.confidenceValue}>{result.confidence}%</Text>
          </View>
          <View style={styles.confidenceInfo}>
            <Text style={styles.confidenceTitle}>OCR Confidence</Text>
            <Text style={styles.confidenceText}>{result.medicines.length} medicines detected</Text>
          </View>
          <Ionicons name="checkmark-circle" size={28} color={Colors.success} />
        </View>
      </Card>

      {/* Allergy Alerts */}
      {result.allergyAlerts.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Allergy Alerts</Text>
          {result.allergyAlerts.map((alert, i) => (
            <Card key={i} style={styles.alertCard}>
              <View style={styles.alertRow}>
                <Ionicons name="warning" size={24} color={Colors.danger} />
                <Text style={styles.alertText}>{alert}</Text>
              </View>
            </Card>
          ))}
        </View>
      )}

      {/* Drug Interactions */}
      {result.interactions.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Drug Interactions</Text>
          {result.interactions.map((interaction, i) => (
            <Card key={i} style={styles.interactionCard}>
              <View style={styles.interactionHeader}>
                <Badge text={interaction.severity.toUpperCase()} variant={(interaction.severity as string) === 'high' ? 'danger' : (interaction.severity as string) === 'moderate' ? 'warning' : 'info'} size="md" />
                <Text style={styles.interactionDrugs}>{interaction.drugs}</Text>
              </View>
              <Text style={styles.interactionDesc}>{interaction.description}</Text>
            </Card>
          ))}
        </View>
      )}

      {/* Extracted Medicines */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Extracted Medicines</Text>
        {result.medicines.map(med => (
          <Card key={med.id} style={styles.medCard}>
            <View style={styles.medHeader}>
              <Ionicons name="medical" size={22} color={Colors.primary} />
              <Text style={styles.medName}>{med.name}</Text>
            </View>
            <View style={styles.medDetails}>
              {[
                { label: 'Dosage', value: med.dosage },
                { label: 'Frequency', value: med.frequency },
                { label: 'Duration', value: med.duration },
                { label: 'Instructions', value: med.instructions },
              ].map((d, i) => (
                <View key={i} style={styles.medDetailRow}>
                  <Text style={styles.medDetailLabel}>{d.label}:</Text>
                  <Text style={styles.medDetailValue}>{d.value}</Text>
                </View>
              ))}
            </View>
            {med.genericAlternative && (
              <TouchableOpacity style={styles.genericBanner}>
                <Ionicons name="swap-horizontal" size={18} color={Colors.secondary} />
                <Text style={styles.genericText}>{med.genericAlternative}</Text>
              </TouchableOpacity>
            )}
          </Card>
        ))}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Button title="Order Medicines" onPress={() => router.push('/(tabs)/pharmacy')} fullWidth size="lg" icon={<Ionicons name="cart" size={20} color="#FFF" />} />
        <Button title="Set Dosage Reminders" onPress={() => {}} fullWidth size="lg" variant="outline" icon={<Ionicons name="alarm" size={20} color={Colors.primary} />} />
        <Button title="Save to Health Records" onPress={() => router.push('/health/records')} fullWidth size="lg" variant="ghost" icon={<Ionicons name="save" size={20} color={Colors.primary} />} />
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.xl, paddingBottom: Spacing.xxxxl },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.background, padding: Spacing.xxxl },
  loadingTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text, marginTop: Spacing.xl },
  loadingText: { fontSize: FontSize.md, color: Colors.textSecondary, marginTop: Spacing.sm },
  loadingSteps: { marginTop: Spacing.xxl, gap: Spacing.md },
  loadingStep: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  loadingStepText: { fontSize: FontSize.md, color: Colors.textTertiary },
  loadingStepDone: { color: Colors.success },
  confidenceCard: { marginBottom: Spacing.lg },
  confidenceRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  confidenceCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  confidenceValue: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.primary },
  confidenceInfo: { flex: 1 },
  confidenceTitle: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  confidenceText: { fontSize: FontSize.sm, color: Colors.textSecondary },
  section: { marginBottom: Spacing.lg },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: Spacing.md },
  alertCard: { backgroundColor: Colors.dangerLight, marginBottom: Spacing.sm, borderLeftWidth: 3, borderLeftColor: Colors.danger },
  alertRow: { flexDirection: 'row', gap: Spacing.md, alignItems: 'flex-start' },
  alertText: { flex: 1, fontSize: FontSize.md, color: Colors.danger, fontWeight: FontWeight.medium, lineHeight: 22 },
  interactionCard: { marginBottom: Spacing.sm },
  interactionHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  interactionDrugs: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  interactionDesc: { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 20 },
  medCard: { marginBottom: Spacing.md },
  medHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.md },
  medName: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text },
  medDetails: { gap: Spacing.sm },
  medDetailRow: { flexDirection: 'row' },
  medDetailLabel: { fontSize: FontSize.sm, color: Colors.textSecondary, width: 90 },
  medDetailValue: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.text, flex: 1 },
  genericBanner: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: Spacing.md,
    padding: Spacing.md, backgroundColor: Colors.secondaryLight, borderRadius: BorderRadius.md,
  },
  genericText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.secondary, flex: 1 },
  actions: { gap: Spacing.md, marginTop: Spacing.lg },
});
