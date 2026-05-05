import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { Card, Badge, Button } from '../../src/components/common';
import { SYMPTOMS_LIST } from '../../src/constants/mockData';

interface AIResult {
  urgency: 'low' | 'moderate' | 'high' | 'emergency';
  conditions: { name: string; probability: number; severity: string }[];
  specialist: string;
  homeRemedies: string[];
  diet: string[];
  exercise: string[];
  healthScore: number;
}

export default function AIAssistantScreen() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AIResult | null>(null);

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
    setResult(null);
  };

  const analyze = async () => {
    setIsAnalyzing(true);
    await new Promise(r => setTimeout(r, 2500));
    setResult({
      urgency: selectedSymptoms.includes('Chest Pain') ? 'high' : selectedSymptoms.includes('Breathing Difficulty') ? 'emergency' : 'moderate',
      conditions: [
        { name: 'Common Cold / Viral Infection', probability: 72, severity: 'Mild' },
        { name: 'Seasonal Allergies', probability: 54, severity: 'Mild' },
        { name: 'Tension Headache', probability: 48, severity: 'Mild' },
      ],
      specialist: 'General Physician',
      homeRemedies: ['Stay hydrated - drink warm fluids', 'Get adequate rest (7-8 hours)', 'Steam inhalation for congestion', 'Honey and ginger tea for sore throat'],
      diet: ['Increase vitamin C intake (citrus fruits)', 'Eat warm soups and broths', 'Avoid cold and processed foods', 'Include turmeric in meals'],
      exercise: ['Light walking (15-20 mins)', 'Gentle stretching', 'Deep breathing exercises', 'Avoid strenuous workouts until recovered'],
      healthScore: 75,
    });
    setIsAnalyzing(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <View style={styles.aiIconBg}>
          <Ionicons name="sparkles" size={32} color={Colors.primary} />
        </View>
        <Text style={styles.headerTitle}>AI Health Assistant</Text>
        <Text style={styles.headerText}>Get instant health insights, disease predictions, diet and exercise recommendations powered by AI</Text>
      </Card>

      {/* Symptoms */}
      <Text style={styles.sectionTitle}>What symptoms are you experiencing?</Text>
      <View style={styles.symptomsGrid}>
        {SYMPTOMS_LIST.map(s => (
          <TouchableOpacity
            key={s}
            style={[styles.symptomChip, selectedSymptoms.includes(s) && styles.symptomActive]}
            onPress={() => toggleSymptom(s)}
          >
            <Text style={[styles.symptomText, selectedSymptoms.includes(s) && styles.symptomTextActive]}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedSymptoms.length > 0 && !result && (
        <Button
          title="Analyze Symptoms"
          onPress={analyze}
          isLoading={isAnalyzing}
          fullWidth size="lg"
          icon={!isAnalyzing ? <Ionicons name="sparkles" size={20} color="#FFF" /> : undefined}
          style={{ marginTop: Spacing.xl }}
        />
      )}

      {/* Results */}
      {result && (
        <View style={styles.results}>
          {/* Urgency */}
          <Card style={{
            ...styles.urgencyCard,
            backgroundColor: result.urgency === 'emergency' ? Colors.dangerLight : result.urgency === 'high' ? Colors.warningLight : Colors.successLight,
            borderColor: result.urgency === 'emergency' ? Colors.danger : result.urgency === 'high' ? Colors.warning : Colors.success,
          }}>
            <Ionicons
              name={result.urgency === 'emergency' ? 'alert-circle' : result.urgency === 'high' ? 'warning' : 'checkmark-circle'}
              size={28}
              color={result.urgency === 'emergency' ? Colors.danger : result.urgency === 'high' ? Colors.warning : Colors.success}
            />
            <View style={styles.urgencyInfo}>
              <Text style={styles.urgencyLabel}>Urgency Level: {result.urgency.toUpperCase()}</Text>
              <Text style={styles.urgencyText}>
                {result.urgency === 'emergency' ? 'Seek immediate medical attention!' : result.urgency === 'high' ? 'Consult a doctor soon.' : 'Monitor your symptoms.'}
              </Text>
            </View>
          </Card>

          {/* Predicted Conditions */}
          <Text style={styles.sectionTitle}>Possible Conditions</Text>
          {result.conditions.map((c, i) => (
            <Card key={i} style={styles.conditionCard}>
              <View style={styles.conditionRow}>
                <View style={styles.conditionInfo}>
                  <Text style={styles.conditionName}>{c.name}</Text>
                  <Badge text={c.severity} variant={c.severity === 'Severe' ? 'danger' : c.severity === 'Moderate' ? 'warning' : 'success'} />
                </View>
                <Text style={styles.conditionProb}>{c.probability}%</Text>
              </View>
              <View style={styles.probBar}>
                <View style={[styles.probFill, { width: `${c.probability}%` }]} />
              </View>
            </Card>
          ))}

          {/* Specialist */}
          <Card style={styles.specialistCard}>
            <Text style={styles.specialistLabel}>Recommended Specialist</Text>
            <Text style={styles.specialistName}>{result.specialist}</Text>
            <Button title="Find Doctor" onPress={() => router.push('/doctor/search')} variant="outline" size="sm" style={{ marginTop: Spacing.md }} />
          </Card>

          {/* Recommendations */}
          {[
            { title: 'Home Remedies', icon: 'home', items: result.homeRemedies, color: '#4CAF50' },
            { title: 'Diet Recommendations', icon: 'nutrition', items: result.diet, color: '#FF9800' },
            { title: 'Exercise Suggestions', icon: 'fitness', items: result.exercise, color: '#2196F3' },
          ].map((sec, i) => (
            <View key={i}>
              <Text style={styles.sectionTitle}>{sec.title}</Text>
              <Card>
                {sec.items.map((item, j) => (
                  <View key={j} style={styles.recRow}>
                    <Ionicons name={sec.icon as any} size={18} color={sec.color} />
                    <Text style={styles.recText}>{item}</Text>
                  </View>
                ))}
              </Card>
            </View>
          ))}

          <Text style={styles.disclaimer}>Disclaimer: This is AI-based guidance and not a medical diagnosis. Always consult a qualified healthcare professional.</Text>
        </View>
      )}
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.xl, paddingBottom: Spacing.xxxxl },
  headerCard: { alignItems: 'center', marginBottom: Spacing.xl },
  aiIconBg: { width: 64, height: 64, borderRadius: 32, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md },
  headerTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text },
  headerText: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.sm, lineHeight: 22 },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: Spacing.md, marginTop: Spacing.lg },
  symptomsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  symptomChip: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.border, backgroundColor: Colors.surface },
  symptomActive: { backgroundColor: Colors.primaryLight, borderColor: Colors.primary },
  symptomText: { fontSize: FontSize.sm, color: Colors.textSecondary },
  symptomTextActive: { color: Colors.primary, fontWeight: FontWeight.semibold },
  results: { marginTop: Spacing.xl },
  urgencyCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, borderWidth: 1, marginBottom: Spacing.lg },
  urgencyInfo: { flex: 1 },
  urgencyLabel: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.text },
  urgencyText: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  conditionCard: { marginBottom: Spacing.sm },
  conditionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  conditionInfo: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  conditionName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  conditionProb: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.primary },
  probBar: { height: 6, backgroundColor: Colors.divider, borderRadius: 3, overflow: 'hidden' },
  probFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 3 },
  specialistCard: { alignItems: 'center', marginTop: Spacing.lg },
  specialistLabel: { fontSize: FontSize.sm, color: Colors.textSecondary },
  specialistName: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.primary, marginTop: Spacing.xs },
  recRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm, marginBottom: Spacing.md },
  recText: { flex: 1, fontSize: FontSize.md, color: Colors.textSecondary, lineHeight: 22 },
  disclaimer: { fontSize: FontSize.xs, color: Colors.textTertiary, textAlign: 'center', marginTop: Spacing.xxl, fontStyle: 'italic', lineHeight: 18 },
});
