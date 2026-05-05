import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { Card, SectionHeader, Badge } from '../../src/components/common';
import { MOCK_HEALTH_ANALYTICS } from '../../src/constants/mockData';

const { width } = Dimensions.get('window');

export default function HealthAnalyticsScreen() {
  const analytics = MOCK_HEALTH_ANALYTICS;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      {/* Health Score */}
      <Card style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>Your Health Score</Text>
        <View style={styles.scoreRow}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreValue}>{analytics.healthScore}</Text>
            <Text style={styles.scoreMax}>/100</Text>
          </View>
          <View style={styles.scoreInfo}>
            <View style={styles.trendRow}>
              <Ionicons name={analytics.healthScoreTrend === 'up' ? 'trending-up' : 'trending-down'} size={20} color={analytics.healthScoreTrend === 'up' ? Colors.success : Colors.danger} />
              <Text style={[styles.trendText, { color: analytics.healthScoreTrend === 'up' ? Colors.success : Colors.danger }]}>
                {analytics.healthScoreTrend === 'up' ? 'Improving' : 'Declining'}
              </Text>
            </View>
            <Text style={styles.scoreDesc}>Based on your vitals, medication adherence, and lifestyle factors</Text>
          </View>
        </View>
      </Card>

      {/* Summary Cards */}
      <View style={styles.summaryGrid}>
        {[
          { label: 'Medicine Adherence', value: `${analytics.medicineAdherence}%`, icon: 'medical', color: Colors.primary },
          { label: 'Appointments', value: analytics.appointmentsCompleted.toString(), icon: 'calendar', color: Colors.secondary },
          { label: 'Active Conditions', value: analytics.activeConditions.length.toString(), icon: 'alert-circle', color: Colors.warning },
          { label: 'Alerts', value: analytics.warnings.length.toString(), icon: 'notifications', color: Colors.danger },
        ].map((item, i) => (
          <Card key={i} style={styles.summaryCard}>
            <Ionicons name={item.icon as any} size={24} color={item.color} />
            <Text style={styles.summaryValue}>{item.value}</Text>
            <Text style={styles.summaryLabel}>{item.label}</Text>
          </Card>
        ))}
      </View>

      {/* Medicine Adherence */}
      <View style={styles.section}>
        <SectionHeader title="Medicine Adherence" />
        {analytics.medicineConsumption.map((med, i) => (
          <Card key={i} style={styles.adherenceCard}>
            <View style={styles.adherenceHeader}>
              <Text style={styles.adherenceName}>{med.medicineName}</Text>
              <Text style={[styles.adherenceRate, {
                color: med.adherenceRate >= 90 ? Colors.success : med.adherenceRate >= 70 ? Colors.warning : Colors.danger
              }]}>{med.adherenceRate}%</Text>
            </View>
            <View style={styles.adherenceBar}>
              <View style={[styles.adheranceFill, { width: `${med.adherenceRate}%`, backgroundColor: med.adherenceRate >= 90 ? Colors.success : med.adherenceRate >= 70 ? Colors.warning : Colors.danger }]} />
            </View>
            <View style={styles.adherenceStats}>
              <Text style={styles.adherenceStatText}>Taken: {med.taken}</Text>
              <Text style={styles.adherenceStatText}>Missed: {med.missed}</Text>
            </View>
          </Card>
        ))}
      </View>

      {/* Active Conditions */}
      <View style={styles.section}>
        <SectionHeader title="Active Conditions" />
        <View style={styles.conditionsRow}>
          {analytics.activeConditions.map((condition, i) => (
            <Badge key={i} text={condition} variant="warning" size="md" />
          ))}
        </View>
      </View>

      {/* Risk Factors */}
      <View style={styles.section}>
        <SectionHeader title="Risk Assessment" />
        {analytics.riskFactors.map((risk, i) => (
          <Card key={i} style={styles.riskCard}>
            <View style={styles.riskHeader}>
              <Text style={styles.riskName}>{risk.condition}</Text>
              <Badge
                text={risk.riskLevel.toUpperCase()}
                variant={risk.riskLevel === 'high' ? 'danger' : risk.riskLevel === 'moderate' ? 'warning' : 'success'}
                size="md"
              />
            </View>
            <Text style={styles.riskRec}>{risk.recommendation}</Text>
          </Card>
        ))}
      </View>

      {/* Health Warnings */}
      {analytics.warnings.length > 0 && (
        <View style={styles.section}>
          <SectionHeader title="AI Early Warnings" />
          {analytics.warnings.map(warning => (
            <Card key={warning.id} style={{ ...styles.warningCard, borderLeftColor: warning.type === 'critical' ? Colors.danger : warning.type === 'warning' ? Colors.warning : Colors.info }}>
              <View style={styles.warningHeader}>
                <Ionicons
                  name={warning.type === 'critical' ? 'alert-circle' : warning.type === 'warning' ? 'warning' : 'information-circle'}
                  size={20}
                  color={warning.type === 'critical' ? Colors.danger : warning.type === 'warning' ? Colors.warning : Colors.info}
                />
                <Text style={styles.warningTitle}>{warning.title}</Text>
              </View>
              <Text style={styles.warningMsg}>{warning.message}</Text>
              <Text style={styles.warningDate}>{warning.createdAt}</Text>
            </Card>
          ))}
        </View>
      )}

      <View style={{ height: 30 }} />
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.xl },
  scoreCard: { marginBottom: Spacing.lg },
  scoreLabel: { fontSize: FontSize.sm, color: Colors.textSecondary, marginBottom: Spacing.md },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xl },
  scoreCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: Colors.primary },
  scoreValue: { fontSize: FontSize.xxxl, fontWeight: FontWeight.extrabold, color: Colors.primary },
  scoreMax: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: -4 },
  scoreInfo: { flex: 1 },
  trendRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  trendText: { fontSize: FontSize.md, fontWeight: FontWeight.semibold },
  scoreDesc: { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 20 },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.xl },
  summaryCard: { width: (width - Spacing.xl * 2 - Spacing.md) / 2, alignItems: 'center', paddingVertical: Spacing.lg },
  summaryValue: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text, marginTop: Spacing.sm },
  summaryLabel: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: 2 },
  section: { marginBottom: Spacing.xl },
  adherenceCard: { marginBottom: Spacing.sm },
  adherenceHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm },
  adherenceName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  adherenceRate: { fontSize: FontSize.md, fontWeight: FontWeight.bold },
  adherenceBar: { height: 8, backgroundColor: Colors.divider, borderRadius: 4, overflow: 'hidden' },
  adheranceFill: { height: '100%', borderRadius: 4 },
  adherenceStats: { flexDirection: 'row', gap: Spacing.lg, marginTop: Spacing.sm },
  adherenceStatText: { fontSize: FontSize.sm, color: Colors.textSecondary },
  conditionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  riskCard: { marginBottom: Spacing.sm },
  riskHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  riskName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  riskRec: { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 20 },
  warningCard: { marginBottom: Spacing.sm, borderLeftWidth: 3 },
  warningHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.xs },
  warningTitle: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  warningMsg: { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 20 },
  warningDate: { fontSize: FontSize.xs, color: Colors.textTertiary, marginTop: Spacing.sm },
});
