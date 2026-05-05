import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../../src/constants/theme';
import { Card, StatusChip, EmptyState } from '../../src/components/common';
import { MOCK_ORDERS } from '../../src/constants/mockData';

export default function OrdersScreen() {
  if (MOCK_ORDERS.length === 0) {
    return <EmptyState icon="receipt-outline" title="No Orders Yet" subtitle="Your order history will appear here" />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      {MOCK_ORDERS.map(order => (
        <Card key={order.id} style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <View>
              <Text style={styles.orderId}>Order #{order.trackingId || order.id.toUpperCase()}</Text>
              <Text style={styles.orderDate}>{order.createdAt}</Text>
            </View>
            <StatusChip status={order.status} />
          </View>

          <View style={styles.orderItems}>
            {order.items.map((item, i) => (
              <View key={i} style={styles.orderItem}>
                <Ionicons name="medical" size={16} color={Colors.primary} />
                <Text style={styles.orderItemName}>{item.medicine.name} x{item.quantity}</Text>
                <Text style={styles.orderItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            ))}
          </View>

          <View style={styles.orderFooter}>
            <Text style={styles.orderTotal}>Total: ${(order.totalAmount + order.deliveryFee).toFixed(2)}</Text>
            {order.status === 'dispatched' && order.estimatedDelivery && (
              <View style={styles.etaRow}>
                <Ionicons name="time-outline" size={14} color={Colors.secondary} />
                <Text style={styles.etaText}>ETA: {order.estimatedDelivery}</Text>
              </View>
            )}
          </View>

          {order.status === 'dispatched' && (
            <TouchableOpacity style={styles.trackBtn}>
              <Ionicons name="location" size={16} color={Colors.primary} />
              <Text style={styles.trackBtnText}>Track Order</Text>
            </TouchableOpacity>
          )}
          {order.status === 'delivered' && (
            <TouchableOpacity style={styles.reorderBtn}>
              <Ionicons name="refresh" size={16} color={Colors.secondary} />
              <Text style={styles.reorderBtnText}>Reorder</Text>
            </TouchableOpacity>
          )}
        </Card>
      ))}
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.xl, paddingBottom: Spacing.xxxxl },
  orderCard: { marginBottom: Spacing.lg },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.md },
  orderId: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text },
  orderDate: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  orderItems: { borderTopWidth: 1, borderTopColor: Colors.divider, paddingTop: Spacing.md, gap: Spacing.sm },
  orderItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  orderItemName: { flex: 1, fontSize: FontSize.md, color: Colors.text },
  orderItemPrice: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  orderFooter: { borderTopWidth: 1, borderTopColor: Colors.divider, paddingTop: Spacing.md, marginTop: Spacing.md },
  orderTotal: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.primary },
  etaRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, marginTop: Spacing.xs },
  etaText: { fontSize: FontSize.sm, color: Colors.secondary, fontWeight: FontWeight.medium },
  trackBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, marginTop: Spacing.md, padding: Spacing.md, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.primary },
  trackBtnText: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.primary },
  reorderBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, marginTop: Spacing.md, padding: Spacing.md, borderRadius: BorderRadius.md, backgroundColor: Colors.secondaryLight },
  reorderBtnText: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.secondary },
});
