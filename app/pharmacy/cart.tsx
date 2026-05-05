import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { Card, Button, EmptyState } from '../../src/components/common';
import { useCart } from '../../src/context/CartContext';

export default function CartScreen() {
  const { items, updateQuantity, removeItem, clearCart, totalAmount, totalItems } = useCart();
  const deliveryFee = totalAmount > 25 ? 0 : 2.99;
  const grandTotal = totalAmount + deliveryFee;

  if (items.length === 0) {
    return (
      <EmptyState
        icon="cart-outline"
        title="Your Cart is Empty"
        subtitle="Browse pharmacy to add medicines"
        actionTitle="Browse Medicines"
        onAction={() => router.push('/(tabs)/pharmacy')}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {items.map(item => (
          <Card key={item.medicine.id} style={styles.itemCard}>
            <View style={styles.itemRow}>
              <View style={styles.itemIcon}>
                <Ionicons name="medical" size={24} color={Colors.primary} />
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.medicine.name}</Text>
                <Text style={styles.itemPharmacy}>{item.pharmacy.name}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              </View>
              <View style={styles.qtyControls}>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.medicine.id, item.quantity - 1)}>
                  <Ionicons name="remove" size={18} color={Colors.primary} />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.medicine.id, item.quantity + 1)}>
                  <Ionicons name="add" size={18} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.removeBtn} onPress={() => removeItem(item.medicine.id)}>
              <Ionicons name="trash-outline" size={16} color={Colors.danger} />
              <Text style={styles.removeBtnText}>Remove</Text>
            </TouchableOpacity>
          </Card>
        ))}

        {/* Order Summary */}
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal ({totalItems} items)</Text>
            <Text style={styles.summaryValue}>${totalAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</Text>
          </View>
          {deliveryFee > 0 && (
            <Text style={styles.freeDeliveryHint}>Add ${(25 - totalAmount).toFixed(2)} more for free delivery</Text>
          )}
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
          </View>
        </Card>

        <TouchableOpacity onPress={() => Alert.alert('Clear Cart', 'Remove all items?', [
          { text: 'Cancel' }, { text: 'Clear', style: 'destructive', onPress: clearCart }
        ])}>
          <Text style={styles.clearText}>Clear Cart</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Total</Text>
          <Text style={styles.bottomTotal}>${grandTotal.toFixed(2)}</Text>
        </View>
        <Button title="Proceed to Checkout" onPress={() => {
          Alert.alert('Order Placed!', 'Your order has been placed successfully. You can track it from the Orders section.', [
            { text: 'View Orders', onPress: () => { clearCart(); router.push('/pharmacy/orders'); } }
          ]);
        }} size="lg" icon={<Ionicons name="card" size={18} color="#FFF" />} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.xl, paddingBottom: 120 },
  itemCard: { marginBottom: Spacing.md },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  itemIcon: { width: 48, height: 48, borderRadius: BorderRadius.md, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  itemPharmacy: { fontSize: FontSize.sm, color: Colors.textSecondary },
  itemPrice: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.primary, marginTop: 2 },
  qtyControls: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  qtyBtn: { width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  qtyText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text, minWidth: 24, textAlign: 'center' },
  removeBtn: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, marginTop: Spacing.sm, alignSelf: 'flex-end' },
  removeBtnText: { fontSize: FontSize.sm, color: Colors.danger },
  summaryCard: { marginTop: Spacing.md },
  summaryTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: Spacing.md },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm },
  summaryLabel: { fontSize: FontSize.md, color: Colors.textSecondary },
  summaryValue: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  freeDeliveryHint: { fontSize: FontSize.sm, color: Colors.secondary, marginBottom: Spacing.sm },
  totalRow: { borderTopWidth: 1, borderTopColor: Colors.divider, paddingTop: Spacing.md, marginTop: Spacing.sm },
  totalLabel: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text },
  totalValue: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.primary },
  clearText: { fontSize: FontSize.md, color: Colors.danger, textAlign: 'center', marginTop: Spacing.lg, fontWeight: FontWeight.medium },
  bottomBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.lg, backgroundColor: Colors.surface,
    borderTopWidth: 1, borderTopColor: Colors.divider, ...Shadow.lg,
  },
  bottomLabel: { fontSize: FontSize.sm, color: Colors.textSecondary },
  bottomTotal: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.primary },
});
