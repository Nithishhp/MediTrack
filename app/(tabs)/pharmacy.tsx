import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { Card, SearchBar, Badge, SectionHeader } from '../../src/components/common';
import { MOCK_MEDICINES, MOCK_PHARMACIES } from '../../src/constants/mockData';
import { useCart } from '../../src/context/CartContext';

const CATEGORIES = ['All', 'Pain Relief', 'Antibiotic', 'Diabetes', 'Cholesterol', 'Allergy', 'Gastric', 'Blood Pressure'];

export default function PharmacyTab() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addItem, totalItems, totalAmount } = useCart();

  const filtered = MOCK_MEDICINES.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.genericName.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'All' || m.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Pharmacy</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => router.push('/pharmacy/orders')}>
            <Ionicons name="receipt-outline" size={24} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartBtn} onPress={() => router.push('/pharmacy/cart')}>
            <Ionicons name="cart-outline" size={24} color={Colors.text} />
            {totalItems > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{totalItems}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search medicines..." />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories} contentContainerStyle={styles.categoriesContent}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.catChip, selectedCategory === cat && styles.catChipActive]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.catText, selectedCategory === cat && styles.catTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.medList}>
        <SectionHeader title={`${filtered.length} Medicines Found`} />
        {filtered.map(med => (
          <Card key={med.id} style={styles.medCard} onPress={() => router.push(`/pharmacy/medicine-detail?id=${med.id}`)}>
            <View style={styles.medRow}>
              <View style={styles.medIcon}>
                <Ionicons name="medical" size={28} color={Colors.primary} />
              </View>
              <View style={styles.medInfo}>
                <View style={styles.medHeader}>
                  <Text style={styles.medName} numberOfLines={1} ellipsizeMode="tail">{med.name}</Text>
                  {med.requiresPrescription && <Badge text="Rx" variant="warning" />}
                </View>
                <Text style={styles.medGeneric}>{med.genericName} | {med.manufacturer}</Text>
                <View style={styles.medFooter}>
                  <View style={styles.priceRow}>
                    <Text style={styles.medPrice}>${(med.discountPrice || med.price).toFixed(2)}</Text>
                    {med.discountPrice && <Text style={styles.medOldPrice}>${med.price.toFixed(2)}</Text>}
                  </View>
                  {med.inStock ? (
                    <TouchableOpacity
                      style={styles.addCartBtn}
                      onPress={() => addItem(med, MOCK_PHARMACIES[0])}
                    >
                      <Ionicons name="add" size={18} color={Colors.textLight} />
                      <Text style={styles.addCartText}>Add</Text>
                    </TouchableOpacity>
                  ) : (
                    <Badge text="Out of Stock" variant="danger" />
                  )}
                </View>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>

      {totalItems > 0 && (
        <TouchableOpacity style={styles.floatingCart} onPress={() => router.push('/pharmacy/cart')}>
          <View style={styles.floatingCartContent}>
            <View>
              <Text style={styles.floatingCartItems}>{totalItems} item{totalItems > 1 ? 's' : ''}</Text>
              <Text style={styles.floatingCartTotal}>${totalAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.floatingCartRight}>
              <Text style={styles.floatingCartAction}>View Cart</Text>
              <Ionicons name="arrow-forward" size={18} color={Colors.textLight} />
            </View>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.xl, paddingVertical: Spacing.lg },
  title: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text },
  headerActions: { flexDirection: 'row', gap: Spacing.lg },
  cartBtn: { position: 'relative' },
  cartBadge: { position: 'absolute', top: -6, right: -8, backgroundColor: Colors.danger, borderRadius: 10, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center' },
  cartBadgeText: { color: '#FFF', fontSize: 10, fontWeight: '700' },
  searchContainer: { paddingHorizontal: Spacing.xl, marginBottom: Spacing.md },
  categories: { flexGrow: 0, flexShrink: 0, height: 48, marginBottom: Spacing.md },
  categoriesContent: { paddingHorizontal: Spacing.xl, gap: Spacing.sm, alignItems: 'center' },
  catChip: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border },
  catChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  catText: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, color: Colors.textSecondary },
  catTextActive: { color: Colors.textLight },
  medList: { paddingHorizontal: Spacing.xl, paddingBottom: 100 },
  medCard: { marginBottom: Spacing.md },
  medRow: { flexDirection: 'row', gap: Spacing.md },
  medIcon: { width: 56, height: 56, borderRadius: BorderRadius.md, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  medInfo: { flex: 1 },
  medHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  medName: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.text, flex: 1 },
  medGeneric: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  medFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: Spacing.sm },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  medPrice: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.primary },
  medOldPrice: { fontSize: FontSize.sm, color: Colors.textTertiary, textDecorationLine: 'line-through' },
  addCartBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.primary, paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: BorderRadius.md },
  addCartText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.textLight },
  floatingCart: {
    position: 'absolute', bottom: 20, left: Spacing.xl, right: Spacing.xl,
    backgroundColor: Colors.primary, borderRadius: BorderRadius.lg, padding: Spacing.lg,
    ...Shadow.xl,
  },
  floatingCartContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  floatingCartItems: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)' },
  floatingCartTotal: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.textLight },
  floatingCartRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  floatingCartAction: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.textLight },
});
