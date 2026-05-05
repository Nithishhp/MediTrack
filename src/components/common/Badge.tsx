import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, BorderRadius, FontSize, Spacing } from '../../constants/theme';

interface BadgeProps {
  text: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
  size?: 'sm' | 'md';
}

const variantColors = {
  primary: { bg: Colors.primaryLight, text: Colors.primary },
  success: { bg: Colors.successLight, text: Colors.success },
  warning: { bg: Colors.warningLight, text: Colors.warning },
  danger: { bg: Colors.dangerLight, text: Colors.danger },
  info: { bg: Colors.infoLight, text: Colors.info },
  default: { bg: Colors.divider, text: Colors.textSecondary },
};

export default function Badge({ text, variant = 'default', size = 'sm' }: BadgeProps) {
  const colors = variantColors[variant];
  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }, size === 'md' && styles.md]}>
      <Text style={[styles.text, { color: colors.text }, size === 'md' && styles.textMd]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: BorderRadius.full, alignSelf: 'flex-start' },
  md: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs },
  text: { fontSize: FontSize.xs, fontWeight: '600' },
  textMd: { fontSize: FontSize.sm },
});
