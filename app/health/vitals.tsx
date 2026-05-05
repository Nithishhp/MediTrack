import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../../src/constants/theme';
import { Card, Input, Button } from '../../src/components/common';
import { MOCK_VITALS } from '../../src/constants/mockData';

type VitalType = 'blood_pressure' | 'heart_rate' | 'temperature' | 'blood_sugar' | 'spo2' | 'weight';

const VITAL_CONFIG: Record<VitalType, { label: string; icon: string; unit: string; color: string; min: number; max: number }> = {
  blood_pressure: { label: 'Blood Pressure', icon: 'water', unit: 'mmHg', color: Colors.danger, min: 60, max: 200 },
  heart_rate: { label: 'Heart Rate', icon: 'heart', unit: 'bpm', color: '#E91E63', min: 40, max: 200 },
  temperature: { label: 'Temperature', icon: 'thermometer', unit: '°F', color: Colors.accent, min: 95, max: 105 },
  blood_sugar: { label: 'Blood Sugar', icon: 'nutrition', unit: 'mg/dL', color: Colors.warning, min: 50, max: 400 },
  spo2: { label: 'SpO2', icon: 'pulse', unit: '%', color: Colors.info, min: 80, max: 100 },
  weight: { label: 'Weight', icon: 'scale', unit: 'kg', color: Colors.secondary, min: 20, max: 300 },
};

export default function VitalsScreen() {
  const [selectedType, setSelectedType] = useState<VitalType>('blood_pressure');
  const [value, setValue] = useState('');
  const [secondaryValue, setSecondaryValue] = useState('');

  const config = VITAL_CONFIG[selectedType];

  const handleLog = () => {
    if (!value) { Alert.alert('Error', 'Please enter a value'); return; }
    Alert.alert('Vitals Logged', `${config.label}: ${value}${secondaryValue ? `/${secondaryValue}` : ''} ${config.unit}`, [
      { text: 'OK', onPress: () => { setValue(''); setSecondaryValue(''); } }
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Select Vital Sign</Text>
      <View style={styles.typeGrid}>
        {(Object.keys(VITAL_CONFIG) as VitalType[]).map(type => {
          const cfg = VITAL_CONFIG[type];
          return (
            <TouchableOpacity
              key={type}
              style={[styles.typeCard, selectedType === type && { borderColor: cfg.color, backgroundColor: cfg.color + '10' }]}
              onPress={() => { setSelectedType(type); setValue(''); setSecondaryValue(''); }}
            >
              <Ionicons name={cfg.icon as any} size={24} color={selectedType === type ? cfg.color : Colors.textSecondary} />
              <Text style={[styles.typeLabel, selectedType === type && { color: cfg.color, fontWeight: FontWeight.semibold }]}>{cfg.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Card style={styles.inputCard}>
        <Text style={styles.inputTitle}>Log {config.label}</Text>
        {selectedType === 'blood_pressure' ? (
          <View style={styles.bpRow}>
            <Input label="Systolic" placeholder="120" value={value} onChangeText={setValue} keyboardType="numeric" style={styles.bpInput} />
            <Text style={styles.bpSlash}>/</Text>
            <Input label="Diastolic" placeholder="80" value={secondaryValue} onChangeText={setSecondaryValue} keyboardType="numeric" style={styles.bpInput} />
          </View>
        ) : (
          <Input label={`${config.label} (${config.unit})`} placeholder={`Enter ${config.label.toLowerCase()}`} value={value} onChangeText={setValue} keyboardType="numeric" />
        )}
        <Text style={styles.rangeText}>Normal range: {config.min} - {config.max} {config.unit}</Text>
        <Button title="Log Vital" onPress={handleLog} fullWidth size="lg" style={{ marginTop: Spacing.md }} />
      </Card>

      {/* Recent History */}
      <Text style={styles.sectionTitle}>Recent Readings</Text>
      {MOCK_VITALS.filter(v => v.type === selectedType).length === 0 ? (
        <Text style={styles.noData}>No recent readings for {config.label}</Text>
      ) : (
        MOCK_VITALS.filter(v => v.type === selectedType).map(vital => (
          <Card key={vital.id} style={styles.historyCard}>
            <View style={styles.historyRow}>
              <Ionicons name={config.icon as any} size={20} color={config.color} />
              <Text style={styles.historyValue}>{vital.value}{vital.secondaryValue ? `/${vital.secondaryValue}` : ''} {vital.unit}</Text>
              <Text style={styles.historyDate}>{vital.recordedAt}</Text>
            </View>
          </Card>
        ))
      )}
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.xl, paddingBottom: Spacing.xxxxl },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: Spacing.md },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.xl },
  typeCard: { width: '31%', alignItems: 'center', padding: Spacing.md, borderRadius: BorderRadius.lg, borderWidth: 1.5, borderColor: Colors.border, backgroundColor: Colors.surface },
  typeLabel: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: Spacing.xs, textAlign: 'center' },
  inputCard: { marginBottom: Spacing.xl },
  inputTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: Spacing.md },
  bpRow: { flexDirection: 'row', alignItems: 'flex-end', gap: Spacing.sm },
  bpInput: { flex: 1, marginBottom: 0 },
  bpSlash: { fontSize: FontSize.xxl, color: Colors.textSecondary, marginBottom: Spacing.md },
  rangeText: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.sm },
  historyCard: { marginBottom: Spacing.sm },
  historyRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  historyValue: { flex: 1, fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text },
  historyDate: { fontSize: FontSize.sm, color: Colors.textSecondary },
  noData: { fontSize: FontSize.md, color: Colors.textTertiary, textAlign: 'center', padding: Spacing.xl },
});
