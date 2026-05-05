import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { Card, Avatar, Rating, Button } from '../../src/components/common';
import { MOCK_DOCTORS, SYMPTOMS_LIST } from '../../src/constants/mockData';

export default function AIRecommendationScreen() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<typeof MOCK_DOCTORS | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0) return;
    setIsAnalyzing(true);
    // Simulate AI analysis
    await new Promise(r => setTimeout(r, 2000));
    setPrediction(
      selectedSymptoms.includes('Chest Pain') ? 'Based on your symptoms, we recommend consulting a Cardiologist. Possible conditions: Angina, Hypertension.' :
      selectedSymptoms.includes('Headache') ? 'Your symptoms suggest tension headache or migraine. A Neurologist can help.' :
      selectedSymptoms.includes('Skin Rash') ? 'Skin-related symptoms detected. A Dermatologist would be the best choice.' :
      'Based on your symptoms, we recommend a General Physician for initial evaluation.'
    );
    setResults(MOCK_DOCTORS.slice(0, 3));
    setIsAnalyzing(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      <Card style={styles.banner}>
        <Ionicons name="sparkles" size={32} color={Colors.primary} />
        <Text style={styles.bannerTitle}>AI Doctor Recommendation</Text>
        <Text style={styles.bannerSub}>Select your symptoms and our AI will recommend the best specialist for you</Text>
      </Card>

      <Text style={styles.sectionTitle}>Select Your Symptoms</Text>
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

      {selectedSymptoms.length > 0 && (
        <Button
          title={isAnalyzing ? 'Analyzing...' : 'Get AI Recommendation'}
          onPress={handleAnalyze}
          isLoading={isAnalyzing}
          fullWidth size="lg"
          icon={!isAnalyzing ? <Ionicons name="sparkles" size={20} color="#FFF" /> : undefined}
          style={{ marginTop: Spacing.xl }}
        />
      )}

      {prediction && (
        <Card style={styles.predictionCard}>
          <View style={styles.predictionHeader}>
            <Ionicons name="medical" size={24} color={Colors.info} />
            <Text style={styles.predictionTitle}>AI Analysis</Text>
          </View>
          <Text style={styles.predictionText}>{prediction}</Text>
        </Card>
      )}

      {results && (
        <View style={styles.resultsSection}>
          <Text style={styles.sectionTitle}>Recommended Doctors</Text>
          {results.map(doc => (
            <Card key={doc.id} style={styles.docCard} onPress={() => router.push(`/doctor/profile?id=${doc.id}`)}>
              <View style={styles.docRow}>
                <Avatar uri={doc.avatar} name={`${doc.firstName} ${doc.lastName}`} size={56} showOnline isOnline={doc.isAvailableOnline} />
                <View style={styles.docInfo}>
                  <Text style={styles.docName}>Dr. {doc.firstName} {doc.lastName}</Text>
                  <Text style={styles.docSpec}>{doc.specialization}</Text>
                  <Rating rating={doc.rating} totalReviews={doc.totalReviews} size={14} />
                </View>
                <TouchableOpacity
                  style={styles.bookBtn}
                  onPress={() => router.push(`/doctor/book-appointment?doctorId=${doc.id}`)}
                >
                  <Text style={styles.bookBtnText}>Book</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </View>
      )}
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.xl, paddingBottom: Spacing.xxxxl },
  banner: { alignItems: 'center', marginBottom: Spacing.xl },
  bannerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.text, marginTop: Spacing.md },
  bannerSub: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.xs },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: Spacing.md },
  symptomsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  symptomChip: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.border, backgroundColor: Colors.surface },
  symptomActive: { backgroundColor: Colors.primaryLight, borderColor: Colors.primary },
  symptomText: { fontSize: FontSize.sm, color: Colors.textSecondary },
  symptomTextActive: { color: Colors.primary, fontWeight: FontWeight.semibold },
  predictionCard: { marginTop: Spacing.xl, backgroundColor: Colors.infoLight, borderWidth: 1, borderColor: Colors.info + '30' },
  predictionHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  predictionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.info },
  predictionText: { fontSize: FontSize.md, color: Colors.text, lineHeight: 22 },
  resultsSection: { marginTop: Spacing.xl },
  docCard: { marginBottom: Spacing.md },
  docRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  docInfo: { flex: 1 },
  docName: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.text },
  docSpec: { fontSize: FontSize.sm, color: Colors.primary, marginTop: 2, marginBottom: Spacing.xs },
  bookBtn: { backgroundColor: Colors.primary, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, borderRadius: BorderRadius.md },
  bookBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.textLight },
});
