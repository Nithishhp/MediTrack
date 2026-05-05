import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../../src/constants/theme';
import { Card, SearchBar, Badge, EmptyState } from '../../src/components/common';
import { MOCK_HEALTH_RECORDS } from '../../src/constants/mockData';

const RECORD_TYPES = ['All', 'Lab Report', 'Scan', 'Prescription', 'Vaccination', 'Other'];
const typeIcons: Record<string, string> = {
  lab_report: 'flask', scan: 'scan', prescription: 'document-text',
  vaccination: 'shield-checkmark', discharge_summary: 'exit', other: 'folder',
};

export default function HealthRecordsScreen() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const filtered = MOCK_HEALTH_RECORDS.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchType = selectedType === 'All' || r.type.replace(/_/g, ' ').toLowerCase().includes(selectedType.toLowerCase());
    return matchSearch && matchType;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.searchSection}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search records..." />
      </View>

      {/* Security Banner */}
      <View style={styles.securityBanner}>
        <Ionicons name="lock-closed" size={16} color={Colors.success} />
        <Text style={styles.securityText}>All records are encrypted and stored securely in the cloud</Text>
      </View>

      {/* Type Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow} contentContainerStyle={styles.filterContent}>
        {RECORD_TYPES.map(type => (
          <TouchableOpacity
            key={type}
            style={[styles.filterChip, selectedType === type && styles.filterChipActive]}
            onPress={() => setSelectedType(type)}
          >
            <Text style={[styles.filterText, selectedType === type && styles.filterTextActive]}>{type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.recordsList}>
        <Text style={styles.resultCount}>{filtered.length} records found</Text>
        {filtered.length === 0 ? (
          <EmptyState icon="document-outline" title="No Records Found" subtitle="Upload your first health record" actionTitle="Upload" onAction={() => Alert.alert('Upload', 'Upload feature')} />
        ) : (
          filtered.map(record => (
            <Card key={record.id} style={styles.recordCard} onPress={() => Alert.alert(record.title, record.description || 'No description')}>
              <View style={styles.recordRow}>
                <View style={[styles.recordIcon, { backgroundColor: Colors.primaryLight }]}>
                  <Ionicons name={(typeIcons[record.type] || 'document') as any} size={24} color={Colors.primary} />
                </View>
                <View style={styles.recordInfo}>
                  <Text style={styles.recordTitle}>{record.title}</Text>
                  <Text style={styles.recordMeta}>{record.date} {record.doctorName ? `| ${record.doctorName}` : ''}</Text>
                  <View style={styles.tagRow}>
                    {record.tags.slice(0, 3).map((tag, i) => (
                      <Badge key={i} text={tag} variant="default" />
                    ))}
                  </View>
                </View>
                <View style={styles.recordActions}>
                  {record.isEncrypted && <Ionicons name="lock-closed" size={14} color={Colors.success} />}
                  <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
                </View>
              </View>
            </Card>
          ))
        )}
      </ScrollView>

      {/* Upload FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => Alert.alert('Upload Record', 'Choose file to upload')}>
        <Ionicons name="add" size={28} color={Colors.textLight} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  searchSection: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.md },
  securityBanner: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginHorizontal: Spacing.xl, marginTop: Spacing.md, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, backgroundColor: Colors.successLight, borderRadius: BorderRadius.md },
  securityText: { fontSize: FontSize.xs, color: Colors.success, fontWeight: FontWeight.medium },
  filterRow: { flexGrow: 0, flexShrink: 0, height: 48, marginTop: Spacing.md },
  filterContent: { paddingHorizontal: Spacing.xl, gap: Spacing.sm, alignItems: 'center' },
  filterChip: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterText: { fontSize: FontSize.sm, color: Colors.textSecondary },
  filterTextActive: { color: Colors.textLight, fontWeight: FontWeight.semibold },
  recordsList: { paddingHorizontal: Spacing.xl, paddingBottom: 100 },
  resultCount: { fontSize: FontSize.sm, color: Colors.textSecondary, marginVertical: Spacing.md },
  recordCard: { marginBottom: Spacing.sm },
  recordRow: { flexDirection: 'row', gap: Spacing.md },
  recordIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  recordInfo: { flex: 1 },
  recordTitle: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  recordMeta: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  tagRow: { flexDirection: 'row', gap: Spacing.xs, marginTop: Spacing.sm },
  recordActions: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  fab: {
    position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8,
  },
});
