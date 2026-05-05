import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, BorderRadius, FontSize, Spacing } from '../../constants/theme';

type StatusType = 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'in_progress' |
  'placed' | 'preparing' | 'dispatched' | 'delivered' | 'in_stock' | 'low_stock' | 'out_of_stock' | 'expired';

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  confirmed: { bg: Colors.successLight, text: Colors.success, label: 'Confirmed' },
  pending: { bg: Colors.warningLight, text: Colors.warning, label: 'Pending' },
  completed: { bg: Colors.primaryLight, text: Colors.primary, label: 'Completed' },
  cancelled: { bg: Colors.dangerLight, text: Colors.danger, label: 'Cancelled' },
  in_progress: { bg: Colors.infoLight, text: Colors.info, label: 'In Progress' },
  placed: { bg: Colors.warningLight, text: Colors.warning, label: 'Placed' },
  preparing: { bg: Colors.infoLight, text: Colors.info, label: 'Preparing' },
  dispatched: { bg: Colors.primaryLight, text: Colors.primary, label: 'Dispatched' },
  delivered: { bg: Colors.successLight, text: Colors.success, label: 'Delivered' },
  in_stock: { bg: Colors.successLight, text: Colors.success, label: 'In Stock' },
  low_stock: { bg: Colors.warningLight, text: Colors.warning, label: 'Low Stock' },
  out_of_stock: { bg: Colors.dangerLight, text: Colors.danger, label: 'Out of Stock' },
  expired: { bg: Colors.dangerLight, text: Colors.danger, label: 'Expired' },
  no_show: { bg: Colors.dangerLight, text: Colors.danger, label: 'No Show' },
};

export default function StatusChip({ status }: { status: string }) {
  const config = statusConfig[status] || statusConfig.pending;
  return (
    <View style={[styles.chip, { backgroundColor: config.bg }]}>
      <View style={[styles.dot, { backgroundColor: config.text }]} />
      <Text style={[styles.text, { color: config.text }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.sm, paddingVertical: Spacing.xs, borderRadius: BorderRadius.full, gap: Spacing.xs },
  dot: { width: 6, height: 6, borderRadius: 3 },
  text: { fontSize: FontSize.xs, fontWeight: '600' },
});
