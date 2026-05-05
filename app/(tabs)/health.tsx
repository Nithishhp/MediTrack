import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { Card, SectionHeader } from '../../src/components/common';
import { MOCK_HEALTH_ANALYTICS, MOCK_VITALS, MOCK_HEALTH_RECORDS } from '../../src/constants/mockData';

export default function HealthTab() {
  const analytics = MOCK_HEALTH_ANALYTICS;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>My Health</Text>
          <TouchableOpacity onPress={() => router.push('/health/analytics')}>
            <Ionicons name="stats-chart" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Health Score */}
        <Card style={styles.scoreCard}>
          <View style={styles.scoreRow}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreValue}>{analytics.healthScore}</Text>
              <Text style={styles.scoreLabel}>Health Score</Text>
            </View>
            <View style={styles.scoreStats}>
              <View style={styles.scoreStat}>
                <Ionicons name="arrow-up-circle" size={20} color={Colors.success} />
                <Text style={styles.scoreStatLabel}>Medicine Adherence</Text>
                <Text style={styles.scoreStatValue}>{analytics.medicineAdherence}%</Text>
              </View>
              <View style={styles.scoreStat}>
                <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                <Text style={styles.scoreStatLabel}>Appointments</Text>
                <Text style={styles.scoreStatValue}>{analytics.appointmentsCompleted}</Text>
              </View>
              <View style={styles.scoreStat}>
                <Ionicons name="alert-circle" size={20} color={Colors.warning} />
                <Text style={styles.scoreStatLabel}>Active Conditions</Text>
                <Text style={styles.scoreStatValue}>{analytics.activeConditions.length}</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Warnings */}
        {analytics.warnings.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Health Alerts" />
            {analytics.warnings.map(warning => (
              <Card key={warning.id} style={warning.type === 'critical' ? { ...styles.warningCard, ...styles.criticalWarning } : styles.warningCard}>
                <View style={styles.warningRow}>
                  <Ionicons
                    name={warning.type === 'critical' ? 'alert-circle' : warning.type === 'warning' ? 'warning' : 'information-circle'}
                    size={24}
                    color={warning.type === 'critical' ? Colors.danger : warning.type === 'warning' ? Colors.warning : Colors.info}
                  />
                  <View style={styles.warningInfo}>
                    <Text style={styles.warningTitle}>{warning.title}</Text>
                    <Text style={styles.warningMsg}>{warning.message}</Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        )}

        {/* Quick Health Actions */}
        <View style={styles.section}>
          <SectionHeader title="Health Services" />
          <View style={styles.actionsGrid}>
            {[
              { icon: 'fitness', label: 'AI Assistant', route: '/health/ai-assistant', color: '#E91E63' },
              { icon: 'document-text', label: 'EHR Records', route: '/health/records', color: Colors.primary },
              { icon: 'analytics', label: 'Analytics', route: '/health/analytics', color: '#9C27B0' },
              { icon: 'pulse', label: 'Log Vitals', route: '/health/vitals', color: Colors.secondary },
            ].map((action, i) => (
              <TouchableOpacity key={i} style={styles.actionCard} onPress={() => router.push(action.route as any)}>
                <View style={[styles.actionIcon, { backgroundColor: action.color + '15' }]}>
                  <Ionicons name={action.icon as any} size={28} color={action.color} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Vitals */}
        <View style={styles.section}>
          <SectionHeader title="Latest Vitals" actionText="Log New" onAction={() => router.push('/health/vitals')} />
          <View style={styles.vitalsGrid}>
            {MOCK_VITALS.map(vital => (
              <Card key={vital.id} style={styles.vitalCard}>
                <Text style={styles.vitalType}>{vital.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Text>
                <Text style={styles.vitalValue}>{vital.value}{vital.secondaryValue ? `/${vital.secondaryValue}` : ''}</Text>
                <Text style={styles.vitalUnit}>{vital.unit}</Text>
              </Card>
            ))}
          </View>
        </View>

        {/* Risk Factors */}
        <View style={styles.section}>
          <SectionHeader title="Risk Assessment" />
          {analytics.riskFactors.map((risk, i) => (
            <Card key={i} style={styles.riskCard}>
              <View style={styles.riskRow}>
                <View style={[styles.riskDot, {
                  backgroundColor: risk.riskLevel === 'high' ? Colors.danger : risk.riskLevel === 'moderate' ? Colors.warning : Colors.success
                }]} />
                <View style={styles.riskInfo}>
                  <Text style={styles.riskName}>{risk.condition}</Text>
                  <Text style={styles.riskRec}>{risk.recommendation}</Text>
                </View>
                <Text style={[styles.riskLevel, {
                  color: risk.riskLevel === 'high' ? Colors.danger : risk.riskLevel === 'moderate' ? Colors.warning : Colors.success
                }]}>{risk.riskLevel.toUpperCase()}</Text>
              </View>
            </Card>
          ))}
        </View>

        {/* Recent Records */}
        <View style={styles.section}>
          <SectionHeader title="Recent Records" actionText="View All" onAction={() => router.push('/health/records')} />
          {MOCK_HEALTH_RECORDS.slice(0, 3).map(record => (
            <Card key={record.id} style={styles.recordCard}>
              <View style={styles.recordRow}>
                <Ionicons
                  name={record.type === 'lab_report' ? 'flask' : record.type === 'scan' ? 'scan' : record.type === 'vaccination' ? 'shield-checkmark' : 'document-text'}
                  size={24} color={Colors.primary}
                />
                <View style={styles.recordInfo}>
                  <Text style={styles.recordTitle}>{record.title}</Text>
                  <Text style={styles.recordMeta}>{record.date} {record.doctorName ? `| ${record.doctorName}` : ''}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
              </View>
            </Card>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.xl, paddingVertical: Spacing.lg },
  title: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text },
  scoreCard: { marginHorizontal: Spacing.xl, marginBottom: Spacing.xl },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xl },
  scoreCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: Colors.primary },
  scoreValue: { fontSize: FontSize.xxxl, fontWeight: FontWeight.extrabold, color: Colors.primary },
  scoreLabel: { fontSize: FontSize.xs, color: Colors.textSecondary },
  scoreStats: { flex: 1, gap: Spacing.sm },
  scoreStat: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  scoreStatLabel: { flex: 1, fontSize: FontSize.sm, color: Colors.textSecondary },
  scoreStatValue: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.text },
  section: { paddingHorizontal: Spacing.xl, marginBottom: Spacing.xl },
  warningCard: { marginBottom: Spacing.sm },
  criticalWarning: { borderLeftWidth: 3, borderLeftColor: Colors.danger },
  warningRow: { flexDirection: 'row', gap: Spacing.md },
  warningInfo: { flex: 1 },
  warningTitle: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  warningMsg: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  actionCard: { width: '47%', backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.lg, alignItems: 'center', ...Shadow.sm },
  actionIcon: { width: 56, height: 56, borderRadius: BorderRadius.lg, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm },
  actionLabel: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  vitalsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  vitalCard: { width: '31%', alignItems: 'center', padding: Spacing.md },
  vitalType: { fontSize: FontSize.xs, color: Colors.textSecondary, textAlign: 'center' },
  vitalValue: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.text, marginTop: Spacing.xs },
  vitalUnit: { fontSize: FontSize.xs, color: Colors.textTertiary },
  riskCard: { marginBottom: Spacing.sm },
  riskRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  riskDot: { width: 10, height: 10, borderRadius: 5 },
  riskInfo: { flex: 1 },
  riskName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  riskRec: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  riskLevel: { fontSize: FontSize.xs, fontWeight: FontWeight.bold },
  recordCard: { marginBottom: Spacing.sm },
  recordRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  recordInfo: { flex: 1 },
  recordTitle: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  recordMeta: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
});
