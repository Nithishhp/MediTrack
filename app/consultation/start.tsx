import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { Card, Avatar, Badge } from '../../src/components/common';
import { MOCK_DOCTORS } from '../../src/constants/mockData';

export default function StartConsultationScreen() {
  const onlineDoctors = MOCK_DOCTORS.filter(d => d.isAvailableOnline);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      {/* Header Info */}
      <Card style={styles.infoCard}>
        <Ionicons name="videocam" size={40} color={Colors.primary} />
        <Text style={styles.infoTitle}>Video Consultation</Text>
        <Text style={styles.infoText}>Connect with doctors instantly via secure video call. Share reports and get prescriptions in real-time.</Text>
        <View style={styles.features}>
          {['HD Video Call', 'In-call Chat', 'File Sharing', 'AI Medical Notes'].map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
              <Text style={styles.featureText}>{f}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Available Now */}
      <Text style={styles.sectionTitle}>Available Now ({onlineDoctors.length})</Text>
      {onlineDoctors.map(doc => (
        <Card key={doc.id} style={styles.docCard} onPress={() => router.push(`/doctor/book-appointment?doctorId=${doc.id}`)}>
          <View style={styles.docRow}>
            <Avatar uri={doc.avatar} name={`${doc.firstName} ${doc.lastName}`} size={56} showOnline isOnline />
            <View style={styles.docInfo}>
              <Text style={styles.docName}>Dr. {doc.firstName} {doc.lastName}</Text>
              <Text style={styles.docSpec}>{doc.specialization}</Text>
              <View style={styles.docMeta}>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color={Colors.star} />
                  <Text style={styles.ratingText}>{doc.rating}</Text>
                </View>
                <Text style={styles.feeText}>${doc.consultationFee}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.consultBtn} onPress={() => router.push(`/doctor/book-appointment?doctorId=${doc.id}`)}>
              <Ionicons name="videocam" size={20} color={Colors.textLight} />
            </TouchableOpacity>
          </View>
        </Card>
      ))}

      {/* How it works */}
      <Text style={styles.sectionTitle}>How It Works</Text>
      <Card>
        {[
          { step: '1', title: 'Choose a Doctor', desc: 'Select from available specialists' },
          { step: '2', title: 'Book & Pay', desc: 'Choose time slot and complete payment' },
          { step: '3', title: 'Join Video Call', desc: 'Connect via secure HD video' },
          { step: '4', title: 'Get Prescription', desc: 'Receive digital prescription instantly' },
        ].map((item, i) => (
          <View key={i} style={[styles.stepRow, i < 3 && styles.stepBorder]}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNum}>{item.step}</Text>
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>{item.title}</Text>
              <Text style={styles.stepDesc}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </Card>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.xl, paddingBottom: Spacing.xxxxl },
  infoCard: { alignItems: 'center', marginBottom: Spacing.xl },
  infoTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text, marginTop: Spacing.md },
  infoText: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.sm, lineHeight: 22 },
  features: { marginTop: Spacing.lg, alignSelf: 'stretch' },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  featureText: { fontSize: FontSize.md, color: Colors.text },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: Spacing.md, marginTop: Spacing.lg },
  docCard: { marginBottom: Spacing.md },
  docRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  docInfo: { flex: 1 },
  docName: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.text },
  docSpec: { fontSize: FontSize.sm, color: Colors.textSecondary },
  docMeta: { flexDirection: 'row', alignItems: 'center', gap: Spacing.lg, marginTop: Spacing.xs },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  ratingText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.text },
  feeText: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.primary },
  consultBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.secondary, alignItems: 'center', justifyContent: 'center' },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.md },
  stepBorder: { borderBottomWidth: 1, borderBottomColor: Colors.divider },
  stepCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  stepNum: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.primary },
  stepInfo: { flex: 1 },
  stepTitle: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  stepDesc: { fontSize: FontSize.sm, color: Colors.textSecondary },
});
