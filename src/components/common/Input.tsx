import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, FontSize, Spacing } from '../../constants/theme';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  style?: ViewStyle;
  maxLength?: number;
}

export default function Input({
  label, placeholder, value, onChangeText, secureTextEntry,
  keyboardType, autoCapitalize, error, icon, multiline,
  numberOfLines, editable = true, style, maxLength,
}: InputProps) {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[
        styles.inputContainer,
        isFocused && styles.focused,
        error && styles.errorBorder,
        !editable && styles.disabledContainer,
      ]}>
        {icon && <Ionicons name={icon} size={20} color={Colors.textSecondary} style={styles.icon} />}
        <TextInput
          style={[styles.input, multiline && styles.multiline]}
          placeholder={placeholder}
          placeholderTextColor={Colors.textTertiary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            <Ionicons name={isSecure ? 'eye-off' : 'eye'} size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: Spacing.lg },
  label: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.text, marginBottom: Spacing.xs },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.background,
    borderRadius: BorderRadius.md, borderWidth: 1.5, borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
  },
  focused: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  errorBorder: { borderColor: Colors.danger },
  disabledContainer: { opacity: 0.6, backgroundColor: Colors.divider },
  icon: { marginRight: Spacing.sm },
  input: { flex: 1, paddingVertical: Spacing.md, fontSize: FontSize.md, color: Colors.text },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
  error: { fontSize: FontSize.xs, color: Colors.danger, marginTop: Spacing.xs },
});
