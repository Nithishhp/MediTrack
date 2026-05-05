import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { SearchBar, Card, Avatar, Rating, Badge } from '../../src/components/common';
import { MOCK_DOCTORS, SPECIALIZATIONS } from '../../src/constants/mockData';
import { Doctor } from '../../src/types';

export default function DoctorSearchScreen() {
  const [search, setSearch] = useState('');
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'fee'>('rating');

  const filteredDoctors = useMemo(() => {
    let docs = [...MOCK_DOCTORS];
    if (search) {
      const q = search.toLowerCase();
      docs = docs.filter(d =>
        `${d.firstName} ${d.lastName}`.toLowerCase().includes(q) ||
        d.specialization.toLowerCase().includes(q)
      );
    }
    if (selectedSpec) docs = docs.filter(d => d.specialization === selectedSpec);
    if (sortBy === 'rating') docs.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'experience') docs.sort((a, b) => b.experience - a.experience);
    else docs.sort((a, b) => a.consultationFee - b.consultationFee);
    return docs;
  }, [search, selectedSpec, sortBy]);

  const renderDoctor = ({ item }: { item: Doctor }) => (
    <Card style={styles.docCard} onPress={() => router.push(`/doctor/profile?id=${item.id}`)}>
      <View style={styles.docRow}>
        <Avatar uri={item.avatar} name={`${item.firstName} ${item.lastName}`} size={64} showOnline isOnline={item.isAvailableOnline} />
        <View style={styles.docInfo}>
          <View style={styles.docHeader}>
            <Text style={styles.docName}>Dr. {item.firstName} {item.lastName}</Text>
            {item.isAvailableOnline && <Badge text="Online" variant="success" />}
          </View>
          <Text style={styles.docSpec}>{item.specialization}</Text>
          <Text style={styles.docHospital}>{item.hospitalAffiliation || 'Independent Practice'}</Text>
          <View style={styles.docMeta}>
            <Rating rating={item.rating} totalReviews={item.totalReviews} size={14} />
            <Text style={styles.docExp}>{item.experience} yrs exp</Text>
          </View>
          <View style={styles.docFooter}>
            <Text style={styles.docFee}>${item.consultationFee}</Text>
            <TouchableOpacity
              style={styles.bookBtn}
              onPress={() => router.push(`/doctor/book-appointment?doctorId=${item.id}`)}
            >
              <Text style={styles.bookBtnText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search doctors, specializations..." />
      </View>

      {/* AI Recommendation Banner */}
      <TouchableOpacity style={styles.aiBanner} onPress={() => router.push('/doctor/ai-recommendation')}>
        <Ionicons name="sparkles" size={20} color={Colors.primary} />
        <Text style={styles.aiBannerText}>Get AI-powered doctor recommendation</Text>
        <Ionicons name="arrow-forward" size={18} color={Colors.primary} />
      </TouchableOpacity>

      {/* Specializations */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.specRow} contentContainerStyle={styles.specContent}>
        <TouchableOpacity
          style={[styles.specChip, !selectedSpec && styles.specChipActive]}
          onPress={() => setSelectedSpec(null)}
        >
          <Text style={[styles.specText, !selectedSpec && styles.specTextActive]}>All</Text>
        </TouchableOpacity>
        {SPECIALIZATIONS.map(spec => (
          <TouchableOpacity
            key={spec}
            style={[styles.specChip, selectedSpec === spec && styles.specChipActive]}
            onPress={() => setSelectedSpec(selectedSpec === spec ? null : spec)}
          >
            <Text style={[styles.specText, selectedSpec === spec && styles.specTextActive]}>{spec}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sort */}
      <View style={styles.sortRow}>
        <Text style={styles.resultCount}>{filteredDoctors.length} doctors found</Text>
        <View style={styles.sortBtns}>
          {[
            { key: 'rating', label: 'Rating' },
            { key: 'experience', label: 'Experience' },
            { key: 'fee', label: 'Fee' },
          ].map(s => (
            <TouchableOpacity
              key={s.key}
              style={[styles.sortBtn, sortBy === s.key && styles.sortBtnActive]}
              onPress={() => setSortBy(s.key as any)}
            >
              <Text style={[styles.sortBtnText, sortBy === s.key && styles.sortBtnTextActive]}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filteredDoctors}
        keyExtractor={item => item.id}
        renderItem={renderDoctor}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  searchSection: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.md },
  aiBanner: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginHorizontal: Spacing.xl,
    marginTop: Spacing.md, padding: Spacing.md, backgroundColor: Colors.primaryLight, borderRadius: BorderRadius.md,
  },
  aiBannerText: { flex: 1, fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.primary },
  specRow: { flexGrow: 0, flexShrink: 0, height: 48, marginTop: Spacing.md },
  specContent: { paddingHorizontal: Spacing.xl, gap: Spacing.sm, alignItems: 'center' },
  specChip: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border },
  specChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  specText: { fontSize: FontSize.sm, color: Colors.textSecondary },
  specTextActive: { color: Colors.textLight, fontWeight: FontWeight.semibold },
  sortRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.xl, marginTop: Spacing.md, marginBottom: Spacing.sm },
  resultCount: { fontSize: FontSize.sm, color: Colors.textSecondary },
  sortBtns: { flexDirection: 'row', gap: Spacing.xs },
  sortBtn: { paddingHorizontal: Spacing.sm, paddingVertical: 4, borderRadius: BorderRadius.sm },
  sortBtnActive: { backgroundColor: Colors.primaryLight },
  sortBtnText: { fontSize: FontSize.xs, color: Colors.textTertiary },
  sortBtnTextActive: { color: Colors.primary, fontWeight: FontWeight.semibold },
  list: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.xxxl },
  docCard: { marginBottom: Spacing.md },
  docRow: { flexDirection: 'row', gap: Spacing.md },
  docInfo: { flex: 1 },
  docHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  docName: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text },
  docSpec: { fontSize: FontSize.md, color: Colors.primary, fontWeight: FontWeight.medium, marginTop: 2 },
  docHospital: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  docMeta: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginTop: Spacing.sm },
  docExp: { fontSize: FontSize.sm, color: Colors.textSecondary },
  docFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: Spacing.sm },
  docFee: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.secondary },
  bookBtn: { backgroundColor: Colors.primary, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, borderRadius: BorderRadius.md },
  bookBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.textLight },
});
