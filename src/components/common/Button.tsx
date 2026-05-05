import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Colors, BorderRadius, FontSize, FontWeight, Spacing } from '../../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export default function Button({
  title, onPress, variant = 'primary', size = 'md',
  isLoading, disabled, icon, style, textStyle, fullWidth,
}: ButtonProps) {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[`size_${size}`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`textSize_${size}`],
    disabled && styles.textDisabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? Colors.primary : Colors.textLight} />
      ) : (
        <>
          {icon}
          <Text style={textStyles}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  primary: { backgroundColor: Colors.primary },
  secondary: { backgroundColor: Colors.secondary },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: Colors.primary },
  danger: { backgroundColor: Colors.danger },
  ghost: { backgroundColor: 'transparent' },
  size_sm: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.lg },
  size_md: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl },
  size_lg: { paddingVertical: Spacing.lg, paddingHorizontal: Spacing.xxl },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.5 },
  text: { fontWeight: FontWeight.semibold },
  text_primary: { color: Colors.textLight },
  text_secondary: { color: Colors.textLight },
  text_outline: { color: Colors.primary },
  text_danger: { color: Colors.textLight },
  text_ghost: { color: Colors.primary },
  textSize_sm: { fontSize: FontSize.sm },
  textSize_md: { fontSize: FontSize.md },
  textSize_lg: { fontSize: FontSize.lg },
  textDisabled: { opacity: 0.7 },
});
