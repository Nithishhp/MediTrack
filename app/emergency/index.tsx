import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { Card, Rating, Button } from '../../src/components/common';
import { MOCK_HOSPITALS } from '../../src/constants/mockData';

const WEB_MAPS_FALLBACK = (lat: number, lng: number) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

export default function EmergencyScreen() {
  const [isBookingAmbulance, setIsBookingAmbulance] = useState(false);
  const [ambulanceBooked, setAmbulanceBooked] = useState(false);

  const callEmergency = () => {
    Alert.alert('Emergency Call', 'Call 911?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Call', onPress: () => Linking.openURL('tel:911') },
    ]);
  };

  const bookAmbulance = async () => {
    setIsBookingAmbulance(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsBookingAmbulance(false);
    setAmbulanceBooked(true);
  };

  const shareLocation = () => {
    Alert.alert('Share Location', 'Your live location has been shared with your emergency contacts.', [{ text: 'OK' }]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      {/* SOS Button */}
      <TouchableOpacity style={styles.sosButton} onPress={callEmergency} activeOpacity={0.8}>
        <View style={styles.sosRing}>
          <View style={styles.sosInner}>
            <Ionicons name="call" size={40} color="#FFF" />
            <Text style={styles.sosText}>SOS</Text>
          </View>
        </View>
        <Text style={styles.sosHint}>Tap to call emergency (911)</Text>
      </TouchableOpacity>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionCard} onPress={bookAmbulance}>
          <View style={[styles.actionIcon, { backgroundColor: Colors.dangerLight }]}>
            <Ionicons name="car" size={28} color={Colors.danger} />
          </View>
          <Text style={styles.actionLabel}>Book Ambulance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard} onPress={shareLocation}>
          <View style={[styles.actionIcon, { backgroundColor: Colors.primaryLight }]}>
            <Ionicons name="location" size={28} color={Colors.primary} />
          </View>
          <Text style={styles.actionLabel}>Share Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard} onPress={() => Alert.alert('First Aid', 'Opening first aid guide...')}>
          <View style={[styles.actionIcon, { backgroundColor: Colors.successLight }]}>
            <Ionicons name="medical" size={28} color={Colors.success} />
          </View>
          <Text style={styles.actionLabel}>First Aid</Text>
        </TouchableOpacity>
      </View>

      {/* Ambulance Status */}
      {ambulanceBooked && (
        <Card style={styles.ambulanceCard}>
          <View style={styles.ambulanceHeader}>
            <Ionicons name="car" size={24} color={Colors.danger} />
            <Text style={styles.ambulanceTitle}>Ambulance En Route</Text>
          </View>
          <View style={styles.ambulanceDetails}>
            {[
              { label: 'Driver', value: 'Robert K.' },
              { label: 'Vehicle', value: 'AMB-2847' },
              { label: 'ETA', value: '8 minutes' },
              { label: 'Phone', value: '+1 555-0199' },
            ].map((d, i) => (
              <View key={i} style={styles.ambulanceRow}>
                <Text style={styles.ambulanceLabel}>{d.label}:</Text>
                <Text style={styles.ambulanceValue}>{d.value}</Text>
              </View>
            ))}
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '35%' }]} />
          </View>
          <Text style={styles.progressText}>Ambulance is on the way...</Text>
          <Button title="Call Driver" onPress={() => Linking.openURL('tel:+15550199')} variant="outline" fullWidth size="md" style={{ marginTop: Spacing.md }} icon={<Ionicons name="call" size={18} color={Colors.primary} />} />
        </Card>
      )}

      {!ambulanceBooked && (
        <Button
          title={isBookingAmbulance ? 'Requesting...' : 'One-Click Ambulance Booking'}
          onPress={bookAmbulance}
          isLoading={isBookingAmbulance}
          variant="danger"
          fullWidth
          size="lg"
          icon={!isBookingAmbulance ? <Ionicons name="car" size={20} color="#FFF" /> : undefined}
          style={{ marginBottom: Spacing.xl }}
        />
      )}

      {/* Emergency Contacts */}
      <Text style={styles.sectionTitle}>Emergency Contacts</Text>
      <Card style={styles.contactsCard}>
        {[
          { name: 'Jane Doe (Spouse)', phone: '+1 555-0199', icon: 'person' },
          { name: 'Emergency Services', phone: '911', icon: 'alert-circle' },
          { name: 'Poison Control', phone: '1-800-222-1222', icon: 'warning' },
        ].map((contact, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.contactRow, i < 2 && styles.contactBorder]}
            onPress={() => Linking.openURL(`tel:${contact.phone.replace(/[^0-9+]/g, '')}`)}
          >
            <View style={styles.contactIcon}>
              <Ionicons name={contact.icon as any} size={20} color={Colors.primary} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactPhone}>{contact.phone}</Text>
            </View>
            <Ionicons name="call" size={22} color={Colors.secondary} />
          </TouchableOpacity>
        ))}
      </Card>

      {/* Nearby Hospitals */}
      <Text style={styles.sectionTitle}>Nearby Hospitals</Text>
      {MOCK_HOSPITALS.map(hospital => (
        <Card key={hospital.id} style={styles.hospitalCard}>
          <View style={styles.hospitalHeader}>
            <View style={styles.hospitalIcon}>
              <Ionicons name="business" size={24} color={Colors.primary} />
            </View>
            <View style={styles.hospitalInfo}>
              <Text style={styles.hospitalName}>{hospital.name}</Text>
              <Text style={styles.hospitalAddr}>{hospital.address}</Text>
              <View style={styles.hospitalMeta}>
                <View style={styles.metaItem}>
                  <Ionicons name="navigate" size={14} color={Colors.primary} />
                  <Text style={styles.metaText}>{hospital.distance} km</Text>
                </View>
                <Rating rating={hospital.rating} size={12} />
              </View>
            </View>
          </View>
          <View style={styles.hospitalSpecialties}>
            {hospital.specialties.slice(0, 4).map((s, i) => (
              <View key={i} style={styles.specChip}>
                <Text style={styles.specText}>{s}</Text>
              </View>
            ))}
          </View>
          <View style={styles.hospitalActions}>
            <TouchableOpacity style={styles.hospitalBtn} onPress={() => Linking.openURL(`tel:${hospital.emergencyPhone.replace(/[^0-9+]/g, '')}`)}>
              <Ionicons name="call" size={16} color={Colors.danger} />
              <Text style={styles.hospitalBtnText}>Emergency Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.hospitalBtn, styles.hospitalBtnPrimary]} onPress={() => {
              const nativeUrl = Platform.OS === 'ios'
                ? `maps:?daddr=${hospital.location.latitude},${hospital.location.longitude}`
                : `google.navigation:q=${hospital.location.latitude},${hospital.location.longitude}`;
              Linking.openURL(nativeUrl).catch(() => {
                Linking.openURL(WEB_MAPS_FALLBACK(hospital.location.latitude, hospital.location.longitude))
                  .catch(() => Alert.alert('Error', 'Could not open maps'));
              });
            }}>
              <Ionicons name="navigate" size={16} color={Colors.primary} />
              <Text style={[styles.hospitalBtnText, { color: Colors.primary }]}>Get Directions</Text>
            </TouchableOpacity>
          </View>
        </Card>
      ))}

      <View style={{ height: 30 }} />
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.xl },
  sosButton: { alignItems: 'center', marginBottom: Spacing.xxl },
  sosRing: { width: 140, height: 140, borderRadius: 70, backgroundColor: Colors.dangerLight, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: Colors.danger + '40' },
  sosInner: { width: 110, height: 110, borderRadius: 55, backgroundColor: Colors.danger, alignItems: 'center', justifyContent: 'center', ...Shadow.xl },
  sosText: { fontSize: FontSize.xl, fontWeight: FontWeight.extrabold, color: '#FFF', marginTop: 2 },
  sosHint: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.md },
  quickActions: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.xl },
  actionCard: { flex: 1, alignItems: 'center', backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.lg, ...Shadow.sm },
  actionIcon: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm },
  actionLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.text, textAlign: 'center' },
  ambulanceCard: { marginBottom: Spacing.xl, borderLeftWidth: 3, borderLeftColor: Colors.danger },
  ambulanceHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.md },
  ambulanceTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.danger },
  ambulanceDetails: { gap: Spacing.sm },
  ambulanceRow: { flexDirection: 'row' },
  ambulanceLabel: { fontSize: FontSize.md, color: Colors.textSecondary, width: 80 },
  ambulanceValue: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  progressBar: { height: 6, backgroundColor: Colors.divider, borderRadius: 3, marginTop: Spacing.md, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.danger, borderRadius: 3 },
  progressText: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.sm },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: Spacing.md },
  contactsCard: { marginBottom: Spacing.xl, padding: 0, overflow: 'hidden' },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, padding: Spacing.lg },
  contactBorder: { borderBottomWidth: 1, borderBottomColor: Colors.divider },
  contactIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  contactInfo: { flex: 1 },
  contactName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  contactPhone: { fontSize: FontSize.sm, color: Colors.textSecondary },
  hospitalCard: { marginBottom: Spacing.md },
  hospitalHeader: { flexDirection: 'row', gap: Spacing.md },
  hospitalIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  hospitalInfo: { flex: 1 },
  hospitalName: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text },
  hospitalAddr: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  hospitalMeta: { flexDirection: 'row', alignItems: 'center', gap: Spacing.lg, marginTop: Spacing.sm },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: FontSize.sm, color: Colors.textSecondary },
  hospitalSpecialties: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs, marginTop: Spacing.md },
  specChip: { paddingHorizontal: Spacing.sm, paddingVertical: 2, backgroundColor: Colors.primaryLight, borderRadius: BorderRadius.full },
  specText: { fontSize: FontSize.xs, color: Colors.primary, fontWeight: FontWeight.medium },
  hospitalActions: { flexDirection: 'row', gap: Spacing.md, marginTop: Spacing.md },
  hospitalBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.xs, padding: Spacing.md, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.danger },
  hospitalBtnPrimary: { borderColor: Colors.primary },
  hospitalBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.danger },
});
