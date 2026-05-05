import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { Card, Button } from '../../src/components/common';
import { useAuth } from '../../src/context/AuthContext';

const MOCK_CARDS = [
  { id: '1', type: 'visa', last4: '4242', expiry: '12/27', name: 'Visa', color: '#1A1F71' },
  { id: '2', type: 'mastercard', last4: '8888', expiry: '06/26', name: 'Mastercard', color: '#EB001B' },
];

export default function PaymentsScreen() {
  const { user } = useAuth();
  const [cards, setCards] = useState(MOCK_CARDS);

  const handleRemoveCard = (id: string) => {
    Alert.alert('Remove Card', 'Are you sure you want to remove this card?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => setCards(prev => prev.filter(c => c.id !== id)) },
    ]);
  };

  const handleAddCard = () => {
    Alert.alert('Add Card', 'Card payment integration will be available soon. Stay tuned!');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Payment Methods</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Saved Cards */}
        <Text style={styles.sectionTitle}>Saved Cards</Text>
        {cards.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Ionicons name="card-outline" size={40} color={Colors.textTertiary} />
            <Text style={styles.emptyText}>No saved cards</Text>
          </Card>
        ) : (
          cards.map(card => (
            <Card key={card.id} style={styles.cardItem}>
              <View style={styles.cardRow}>
                <View style={[styles.cardIcon, { backgroundColor: card.color }]}>
                  <Ionicons name="card" size={20} color="#FFF" />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{card.name} ending in {card.last4}</Text>
                  <Text style={styles.cardExpiry}>Expires {card.expiry}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemoveCard(card.id)}>
                <Ionicons name="trash-outline" size={18} color={Colors.danger} />
                <Text style={styles.removeBtnText}>Remove</Text>
              </TouchableOpacity>
            </Card>
          ))
        )}

        {/* Other Methods */}
        <Text style={styles.sectionTitle}>Other Methods</Text>
        <Card>
          <TouchableOpacity style={styles.row} onPress={() => Alert.alert('UPI', 'UPI linking will be available soon.')}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconCircle, { backgroundColor: Colors.secondaryLight }]}>
                <Ionicons name="phone-portrait-outline" size={20} color={Colors.secondary} />
              </View>
              <View>
                <Text style={styles.rowText}>UPI Payment</Text>
                <Text style={styles.rowSub}>Link your UPI ID</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconCircle, { backgroundColor: Colors.primaryLight }]}>
                <Ionicons name="shield-checkmark-outline" size={20} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.rowText}>Insurance</Text>
                <Text style={styles.rowSub}>{user?.insuranceId || 'No insurance ID linked'}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
          </View>
        </Card>

        {/* Add Card */}
        <Button
          title="Add New Card"
          onPress={handleAddCard}
          fullWidth
          size="lg"
          variant="outline"
          style={{ marginTop: Spacing.xxl }}
        />

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.xl },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.xl },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.text },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.text, marginBottom: Spacing.md, marginTop: Spacing.lg },
  cardItem: { marginBottom: Spacing.md },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  cardIcon: { width: 44, height: 30, borderRadius: BorderRadius.sm, alignItems: 'center', justifyContent: 'center' },
  cardInfo: { flex: 1 },
  cardName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  cardExpiry: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  removeBtn: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, marginTop: Spacing.md, alignSelf: 'flex-end' },
  removeBtnText: { fontSize: FontSize.sm, color: Colors.danger, fontWeight: FontWeight.medium },
  emptyCard: { alignItems: 'center', paddingVertical: Spacing.xxxl },
  emptyText: { fontSize: FontSize.md, color: Colors.textTertiary, marginTop: Spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: Spacing.md },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, flex: 1 },
  rowText: { fontSize: FontSize.md, fontWeight: FontWeight.medium, color: Colors.text },
  rowSub: { fontSize: FontSize.xs, color: Colors.textTertiary, marginTop: 2 },
  iconCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  divider: { height: 1, backgroundColor: Colors.divider, marginVertical: Spacing.xs },
});
