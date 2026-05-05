import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import { Colors, BorderRadius, Spacing, Shadow } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  padding?: number;
  noBorder?: boolean;
}

export default function Card({ children, onPress, style, padding, noBorder }: CardProps) {
  const cardStyle = [
    styles.card,
    !noBorder && styles.border,
    padding !== undefined && { padding },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadow.md,
  },
  border: {
    borderWidth: 1,
    borderColor: Colors.divider,
  },
});
