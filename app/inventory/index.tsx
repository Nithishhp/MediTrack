import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { Card, SearchBar, StatusChip, Badge, SectionHeader } from '../../src/components/common';
import { MOCK_INVENTORY } from '../../src/constants/mockData';

const { width } = Dimensions.get('window');

type FilterStatus = 'all' | 'in_stock' | 'low_stock' | 'out_of_stock' | 'expired';

export default function InventoryScreen() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterStatus>('all');

  const stats = {
    total: MOCK_INVENTORY.length,
    inStock: MOCK_INVENTORY.filter(i => i.status === 'in_stock').length,
    lowStock: MOCK_INVENTORY.filter(i => i.status === 'low_stock').length,
    outOfStock: MOCK_INVENTORY.filter(i => i.status === 'out_of_stock').length,
  };

  const totalValue = MOCK_INVENTORY.reduce((sum, i) => sum + (i.sellingPrice * i.quantity), 0);
  const totalCost = MOCK_INVENTORY.reduce((sum, i) => sum + (i.costPrice * i.quantity), 0);

  const filtered = MOCK_INVENTORY.filter(item => {
    const matchSearch = item.medicine.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || item.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      {/* Dashboard Overview */}
      <View style={styles.dashGrid}>
        {[
          { label: 'Total Items', value: stats.total.toString(), icon: 'cube', color: Colors.primary },
          { label: 'In Stock', value: stats.inStock.toString(), icon: 'checkmark-circle', color: Colors.success },
          { label: 'Low Stock', value: stats.lowStock.toString(), icon: 'warning', color: Colors.warning },
          { label: 'Out of Stock', value: stats.outOfStock.toString(), icon: 'close-circle', color: Colors.danger },
        ].map((stat, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.dashCard, filter === (i === 0 ? 'all' : i === 1 ? 'in_stock' : i === 2 ? 'low_stock' : 'out_of_stock') && styles.dashCardActive]}
            onPress={() => setFilter(i === 0 ? 'all' : i === 1 ? 'in_stock' : i === 2 ? 'low_stock' : 'out_of_stock')}
          >
            <Ionicons name={stat.icon as any} size={24} color={stat.color} />
            <Text style={styles.dashValue}>{stat.value}</Text>
            <Text style={styles.dashLabel}>{stat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Revenue Stats */}
      <Card style={styles.revenueCard}>
        <Text style={styles.revenueTitle}>Sales Analytics</Text>
        <View style={styles.revenueRow}>
          <View style={styles.revenueStat}>
            <Text style={styles.revenueLabel}>Total Stock Value</Text>
            <Text style={styles.revenueValue}>${totalValue.toFixed(2)}</Text>
          </View>
          <View style={styles.revenueDivider} />
          <View style={styles.revenueStat}>
            <Text style={styles.revenueLabel}>Total Cost</Text>
            <Text style={styles.revenueValue}>${totalCost.toFixed(2)}</Text>
          </View>
          <View style={styles.revenueDivider} />
          <View style={styles.revenueStat}>
            <Text style={styles.revenueLabel}>Profit Margin</Text>
            <Text style={[styles.revenueValue, { color: Colors.success }]}>
              {((1 - totalCost / totalValue) * 100).toFixed(1)}%
            </Text>
          </View>
        </View>
      </Card>

      {/* Expiry Alerts */}
      {MOCK_INVENTORY.filter(i => {
        const expiry = new Date(i.expiryDate);
        const now = new Date();
        const monthsLeft = (expiry.getFullYear() - now.getFullYear()) * 12 + (expiry.getMonth() - now.getMonth());
        return monthsLeft <= 3;
      }).length > 0 && (
        <Card style={styles.expiryAlert}>
          <View style={styles.expiryHeader}>
            <Ionicons name="time" size={20} color={Colors.danger} />
            <Text style={styles.expiryTitle}>Expiry Alerts</Text>
          </View>
          {MOCK_INVENTORY.filter(i => {
            const expiry = new Date(i.expiryDate);
            const now = new Date();
            const monthsLeft = (expiry.getFullYear() - now.getFullYear()) * 12 + (expiry.getMonth() - now.getMonth());
            return monthsLeft <= 3;
          }).map(item => (
            <View key={item.id} style={styles.expiryRow}>
              <Text style={styles.expiryMed}>{item.medicine.name}</Text>
              <Text style={styles.expiryDate}>Exp: {item.expiryDate}</Text>
            </View>
          ))}
        </Card>
      )}

      {/* Search & List */}
      <SearchBar value={search} onChangeText={setSearch} placeholder="Search inventory..." />

      <Text style={styles.resultText}>{filtered.length} items</Text>

      {filtered.map(item => (
        <Card key={item.id} style={styles.itemCard}>
          <View style={styles.itemHeader}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.medicine.name}</Text>
              <Text style={styles.itemMeta}>Batch: {item.batchNumber} | {item.supplier}</Text>
            </View>
            <StatusChip status={item.status} />
          </View>

          <View style={styles.itemDetails}>
            {[
              { label: 'Qty', value: item.quantity.toString() },
              { label: 'Cost', value: `$${item.costPrice.toFixed(2)}` },
              { label: 'Price', value: `$${item.sellingPrice.toFixed(2)}` },
              { label: 'Expiry', value: item.expiryDate },
            ].map((d, i) => (
              <View key={i} style={styles.detailCol}>
                <Text style={styles.detailLabel}>{d.label}</Text>
                <Text style={styles.detailValue}>{d.value}</Text>
              </View>
            ))}
          </View>

          {item.quantity <= item.reorderLevel && item.quantity > 0 && (
            <View style={styles.restockBanner}>
              <Ionicons name="alert" size={16} color={Colors.warning} />
              <Text style={styles.restockText}>Below reorder level ({item.reorderLevel}). Auto-restock notification sent.</Text>
            </View>
          )}

          {item.quantity === 0 && (
            <View style={[styles.restockBanner, { backgroundColor: Colors.dangerLight }]}>
              <Ionicons name="alert-circle" size={16} color={Colors.danger} />
              <Text style={[styles.restockText, { color: Colors.danger }]}>Out of stock! Urgent restock required.</Text>
            </View>
          )}

          {/* Stock level bar */}
          <View style={styles.stockBar}>
            <View style={[styles.stockFill, {
              width: `${Math.min((item.quantity / (item.reorderLevel * 5)) * 100, 100)}%`,
              backgroundColor: item.status === 'in_stock' ? Colors.success : item.status === 'low_stock' ? Colors.warning : Colors.danger,
            }]} />
          </View>
          <Text style={styles.lastRestock}>Last restocked: {item.lastRestocked}</Text>
        </Card>
      ))}

      {/* AI Stock Prediction */}
      <Card style={styles.aiCard}>
        <View style={styles.aiHeader}>
          <Ionicons name="sparkles" size={24} color={Colors.primary} />
          <Text style={styles.aiTitle}>AI Stock Predictions</Text>
        </View>
        <Text style={styles.aiText}>Based on sales trends, the following medicines need restocking within 7 days:</Text>
        {[
          { name: 'Amoxicillin 250mg', days: 3, urgency: 'high' },
          { name: 'Ibuprofen 400mg', days: 0, urgency: 'critical' },
          { name: 'Amlodipine 5mg', days: 5, urgency: 'medium' },
        ].map((pred, i) => (
          <View key={i} style={styles.predRow}>
            <Text style={styles.predName}>{pred.name}</Text>
            <Badge
              text={pred.urgency === 'critical' ? 'CRITICAL' : pred.urgency === 'high' ? 'HIGH' : 'MEDIUM'}
              variant={pred.urgency === 'critical' ? 'danger' : pred.urgency === 'high' ? 'warning' : 'info'}
            />
          </View>
        ))}
      </Card>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.xl, paddingBottom: Spacing.xxxxl },
  dashGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.lg },
  dashCard: { width: (width - Spacing.xl * 2 - Spacing.md) / 2, alignItems: 'center', paddingVertical: Spacing.lg, backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, borderWidth: 1.5, borderColor: Colors.border, ...Shadow.sm },
  dashCardActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  dashValue: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text, marginTop: Spacing.sm },
  dashLabel: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: 2 },
  revenueCard: { marginBottom: Spacing.lg },
  revenueTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: Spacing.md },
  revenueRow: { flexDirection: 'row', alignItems: 'center' },
  revenueStat: { flex: 1, alignItems: 'center' },
  revenueLabel: { fontSize: FontSize.xs, color: Colors.textSecondary },
  revenueValue: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.primary, marginTop: Spacing.xs },
  revenueDivider: { width: 1, height: 40, backgroundColor: Colors.divider },
  expiryAlert: { marginBottom: Spacing.lg, borderLeftWidth: 3, borderLeftColor: Colors.danger },
  expiryHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.md },
  expiryTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.danger },
  expiryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: Spacing.sm },
  expiryMed: { fontSize: FontSize.md, color: Colors.text, fontWeight: FontWeight.medium },
  expiryDate: { fontSize: FontSize.sm, color: Colors.danger },
  resultText: { fontSize: FontSize.sm, color: Colors.textSecondary, marginVertical: Spacing.md },
  itemCard: { marginBottom: Spacing.md },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.md },
  itemInfo: { flex: 1 },
  itemName: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.text },
  itemMeta: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  itemDetails: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.md },
  detailCol: { alignItems: 'center' },
  detailLabel: { fontSize: FontSize.xs, color: Colors.textSecondary },
  detailValue: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.text, marginTop: 2 },
  restockBanner: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, padding: Spacing.sm, backgroundColor: Colors.warningLight, borderRadius: BorderRadius.sm, marginBottom: Spacing.sm },
  restockText: { flex: 1, fontSize: FontSize.sm, color: Colors.warning },
  stockBar: { height: 6, backgroundColor: Colors.divider, borderRadius: 3, overflow: 'hidden', marginTop: Spacing.sm },
  stockFill: { height: '100%', borderRadius: 3 },
  lastRestock: { fontSize: FontSize.xs, color: Colors.textTertiary, marginTop: Spacing.sm },
  aiCard: { marginTop: Spacing.lg },
  aiHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.md },
  aiTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.primary },
  aiText: { fontSize: FontSize.sm, color: Colors.textSecondary, marginBottom: Spacing.md },
  predRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.divider },
  predName: { fontSize: FontSize.md, fontWeight: FontWeight.medium, color: Colors.text },
});
