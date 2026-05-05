import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, Spacing } from '../../constants/theme';
import Button from './Button';

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  actionTitle?: string;
  onAction?: () => void;
}

export default function EmptyState({ icon, title, subtitle, actionTitle, onAction }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color={Colors.textTertiary} />
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {actionTitle && onAction && (
        <Button title={actionTitle} onPress={onAction} variant="outline" size="sm" style={{ marginTop: Spacing.lg }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xxxl },
  title: { fontSize: FontSize.xl, fontWeight: '600', color: Colors.text, marginTop: Spacing.lg, textAlign: 'center' },
  subtitle: { fontSize: FontSize.md, color: Colors.textSecondary, marginTop: Spacing.sm, textAlign: 'center' },
});
