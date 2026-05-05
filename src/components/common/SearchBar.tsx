import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, FontSize, Spacing, Shadow } from '../../constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFilter?: () => void;
}

export default function SearchBar({ value, onChangeText, placeholder = 'Search...', onFilter }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={Colors.textSecondary} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textTertiary}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <Ionicons name="close-circle" size={20} color={Colors.textTertiary} />
        </TouchableOpacity>
      )}
      {onFilter && (
        <TouchableOpacity style={styles.filterBtn} onPress={onFilter}>
          <Ionicons name="options" size={20} color={Colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    borderWidth: 1, borderColor: Colors.border, gap: Spacing.sm, ...Shadow.sm,
  },
  input: { flex: 1, fontSize: FontSize.md, color: Colors.text, paddingVertical: Spacing.xs },
  filterBtn: { padding: Spacing.xs, borderLeftWidth: 1, borderLeftColor: Colors.divider, paddingLeft: Spacing.sm },
});
