import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing } from '../../constants/theme';

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onAction?: () => void;
}

export default function SectionHeader({ title, actionText, onAction }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {actionText && onAction && (
        <TouchableOpacity onPress={onAction}>
          <Text style={styles.action}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  title: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.text },
  action: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.primary },
});
