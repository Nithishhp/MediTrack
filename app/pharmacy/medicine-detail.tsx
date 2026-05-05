import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { Card, Badge, Rating, Button } from '../../src/components/common';
import { MOCK_MEDICINES, MOCK_PHARMACIES } from '../../src/constants/mockData';
import { useCart } from '../../src/context/CartContext';

export default function MedicineDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const medicine = MOCK_MEDICINES.find(m => m.id === id) || MOCK_MEDICINES[0];
  const { addItem } = useCart();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Header */}
        <Card style={styles.headerCard}>
          <View style={styles.medIcon}>
            <Ionicons name="medical" size={48} color={Colors.primary} />
          </View>
          <Text style={styles.medName}>{medicine.name}</Text>
          <Text style={styles.medGeneric}>{medicine.genericName} | {medicine.manufacturer}</Text>
          <View style={styles.badges}>
            <Badge text={medicine.category} variant="primary" size="md" />
            <Badge text={medicine.dosageForm} variant="info" size="md" />
            {medicine.requiresPrescription && <Badge text="Prescription Required" variant="warning" size="md" />}
          </View>
          <Rating rating={medicine.rating} size={18} />
          <View style={styles.priceRow}>
            <Text style={styles.price}>${(medicine.discountPrice || medicine.price).toFixed(2)}</Text>
            {medicine.discountPrice && <Text style={styles.oldPrice}>${medicine.price.toFixed(2)}</Text>}
            {medicine.discountPrice && (
              <Badge text={`${Math.round((1 - medicine.discountPrice / medicine.price) * 100)}% OFF`} variant="success" size="md" />
            )}
          </View>
        </Card>

        {/* Description */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descText}>{medicine.description}</Text>
        </Card>

        {/* Details */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          {[
            { label: 'Category', value: medicine.category },
            { label: 'Dosage Form', value: medicine.dosageForm },
            { label: 'Strength', value: medicine.strength },
            { label: 'Manufacturer', value: medicine.manufacturer },
            { label: 'Expiry Date', value: medicine.expiryDate },
            { label: 'Stock', value: medicine.inStock ? `${medicine.stockQuantity} units` : 'Out of Stock' },
          ].map((d, i) => (
            <View key={i} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{d.label}</Text>
              <Text style={styles.detailValue}>{d.value}</Text>
            </View>
          ))}
        </Card>

        {/* Side Effects */}
        {medicine.sideEffects.length > 0 && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Side Effects</Text>
            {medicine.sideEffects.map((se, i) => (
              <View key={i} style={styles.sideEffect}>
                <Ionicons name="alert-circle" size={16} color={Colors.warning} />
                <Text style={styles.sideEffectText}>{se}</Text>
              </View>
            ))}
          </Card>
        )}

        {/* Price Comparison */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Price Comparison</Text>
          {MOCK_PHARMACIES.map(p => (
            <View key={p.id} style={styles.pharmacyRow}>
              <View style={styles.pharmacyInfo}>
                <Text style={styles.pharmacyName}>{p.name}</Text>
                <Text style={styles.pharmacyAddr}>{p.address}</Text>
              </View>
              <Text style={styles.pharmacyPrice}>${(medicine.price + Math.random() * 3 - 1).toFixed(2)}</Text>
            </View>
          ))}
        </Card>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Price</Text>
          <Text style={styles.bottomPrice}>${(medicine.discountPrice || medicine.price).toFixed(2)}</Text>
        </View>
        <Button
          title={medicine.inStock ? 'Add to Cart' : 'Out of Stock'}
          onPress={() => {
            addItem(medicine, MOCK_PHARMACIES[0]);
            Alert.alert('Added!', `${medicine.name} added to cart`);
          }}
          disabled={!medicine.inStock}
          size="lg"
          icon={<Ionicons name="cart" size={18} color="#FFF" />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.xl, paddingBottom: 120 },
  headerCard: { alignItems: 'center', marginBottom: Spacing.lg },
  medIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md },
  medName: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text, textAlign: 'center' },
  medGeneric: { fontSize: FontSize.md, color: Colors.textSecondary, marginTop: Spacing.xs },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginVertical: Spacing.md, justifyContent: 'center' },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: Spacing.md },
  price: { fontSize: FontSize.xxxl, fontWeight: FontWeight.extrabold, color: Colors.primary },
  oldPrice: { fontSize: FontSize.lg, color: Colors.textTertiary, textDecorationLine: 'line-through' },
  section: { marginBottom: Spacing.md },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: Spacing.md },
  descText: { fontSize: FontSize.md, color: Colors.textSecondary, lineHeight: 22 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.divider },
  detailLabel: { fontSize: FontSize.md, color: Colors.textSecondary },
  detailValue: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  sideEffect: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  sideEffectText: { fontSize: FontSize.md, color: Colors.textSecondary },
  pharmacyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.divider },
  pharmacyInfo: { flex: 1 },
  pharmacyName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  pharmacyAddr: { fontSize: FontSize.sm, color: Colors.textSecondary },
  pharmacyPrice: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.primary },
  bottomBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.lg, backgroundColor: Colors.surface,
    borderTopWidth: 1, borderTopColor: Colors.divider, ...Shadow.lg,
  },
  bottomLabel: { fontSize: FontSize.sm, color: Colors.textSecondary },
  bottomPrice: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.primary },
});
