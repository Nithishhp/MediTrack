import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { Avatar, Rating, Badge, Card, Button } from '../../src/components/common';
import { MOCK_DOCTORS } from '../../src/constants/mockData';

export default function DoctorProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const doctor = MOCK_DOCTORS.find(d => d.id === id) || MOCK_DOCTORS[0];

  const reviews = [
    { id: '1', name: 'Alex M.', rating: 5, comment: 'Excellent doctor! Very thorough and caring.', date: '2 weeks ago' },
    { id: '2', name: 'Maria S.', rating: 4, comment: 'Great experience. Very professional and knowledgeable.', date: '1 month ago' },
    { id: '3', name: 'John D.', rating: 5, comment: 'Highly recommend. Took time to explain everything clearly.', date: '2 months ago' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Doctor Header */}
        <View style={styles.profileHeader}>
          <Avatar uri={doctor.avatar} name={`${doctor.firstName} ${doctor.lastName}`} size={100} showOnline isOnline={doctor.isAvailableOnline} />
          <Text style={styles.docName}>Dr. {doctor.firstName} {doctor.lastName}</Text>
          <Text style={styles.docSpec}>{doctor.specialization}</Text>
          <View style={styles.badgeRow}>
            {doctor.isAvailableOnline && <Badge text="Available Online" variant="success" size="md" />}
            <Badge text={`${doctor.experience} Yrs Exp`} variant="info" size="md" />
          </View>
          <Rating rating={doctor.rating} totalReviews={doctor.totalReviews} size={20} />
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { label: 'Patients', value: '${doctor.totalReviews}+', icon: 'people' },
            { label: 'Experience', value: `${doctor.experience} Yrs`, icon: 'ribbon' },
            { label: 'Rating', value: doctor.rating.toString(), icon: 'star' },
            { label: 'Fee', value: `$${doctor.consultationFee}`, icon: 'cash' },
          ].map((stat, i) => (
            <View key={i} style={styles.statItem}>
              <Ionicons name={stat.icon as any} size={20} color={Colors.primary} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Bio */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bioText}>{doctor.bio}</Text>
        </Card>

        {/* Qualifications */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Qualifications</Text>
          {doctor.qualification.map((q, i) => (
            <View key={i} style={styles.qualRow}>
              <Ionicons name="school" size={18} color={Colors.primary} />
              <Text style={styles.qualText}>{q}</Text>
            </View>
          ))}
        </Card>

        {/* Languages */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <View style={styles.langRow}>
            {doctor.languages.map((lang, i) => (
              <Badge key={i} text={lang} variant="primary" size="md" />
            ))}
          </View>
        </Card>

        {/* Hospital */}
        {doctor.hospitalAffiliation && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Hospital Affiliation</Text>
            <View style={styles.hospitalRow}>
              <Ionicons name="business" size={20} color={Colors.primary} />
              <View>
                <Text style={styles.hospitalName}>{doctor.hospitalAffiliation}</Text>
                <Text style={styles.hospitalAddr}>{doctor.location.city}, {doctor.location.state}</Text>
              </View>
            </View>
          </Card>
        )}

        {/* Reviews */}
        <View style={styles.sectionPadded}>
          <Text style={styles.sectionTitle}>Patient Reviews</Text>
          {reviews.map(review => (
            <Card key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewUser}>
                  <Avatar name={review.name} size={36} />
                  <View>
                    <Text style={styles.reviewName}>{review.name}</Text>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                </View>
                <Rating rating={review.rating} size={14} showNumber={false} />
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </Card>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.feeLabel}>Consultation Fee</Text>
          <Text style={styles.feeValue}>${doctor.consultationFee}</Text>
        </View>
        <Button
          title="Book Appointment"
          onPress={() => router.push(`/doctor/book-appointment?doctorId=${doctor.id}`)}
          size="lg"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  profileHeader: { alignItems: 'center', paddingVertical: Spacing.xxl, backgroundColor: Colors.surface },
  docName: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text, marginTop: Spacing.md },
  docSpec: { fontSize: FontSize.lg, color: Colors.primary, fontWeight: FontWeight.medium, marginTop: Spacing.xs },
  badgeRow: { flexDirection: 'row', gap: Spacing.sm, marginVertical: Spacing.md },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: Spacing.xl, backgroundColor: Colors.surface, marginTop: 1 },
  statItem: { alignItems: 'center', gap: Spacing.xs },
  statValue: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text },
  statLabel: { fontSize: FontSize.xs, color: Colors.textSecondary },
  section: { marginHorizontal: Spacing.xl, marginTop: Spacing.md },
  sectionPadded: { paddingHorizontal: Spacing.xl, marginTop: Spacing.md },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: Spacing.md },
  bioText: { fontSize: FontSize.md, color: Colors.textSecondary, lineHeight: 22 },
  qualRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  qualText: { fontSize: FontSize.md, color: Colors.text },
  langRow: { flexDirection: 'row', gap: Spacing.sm },
  hospitalRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  hospitalName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  hospitalAddr: { fontSize: FontSize.sm, color: Colors.textSecondary },
  reviewCard: { marginBottom: Spacing.sm },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  reviewUser: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  reviewName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  reviewDate: { fontSize: FontSize.xs, color: Colors.textTertiary },
  reviewComment: { fontSize: FontSize.md, color: Colors.textSecondary, lineHeight: 20 },
  bottomBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.lg, backgroundColor: Colors.surface,
    borderTopWidth: 1, borderTopColor: Colors.divider, ...Shadow.lg,
  },
  feeLabel: { fontSize: FontSize.sm, color: Colors.textSecondary },
  feeValue: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.primary },
});
