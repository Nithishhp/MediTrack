import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { Card, Button } from '../../src/components/common';

export default function UploadPrescriptionScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const pickImage = async (fromCamera: boolean) => {
    const permission = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permission.granted) {
      Alert.alert('Permission Required', 'Please grant camera/photo permissions');
      return;
    }

    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({ quality: 0.8, allowsEditing: true })
      : await ImagePicker.launchImageLibraryAsync({ quality: 0.8, allowsEditing: true, mediaTypes: ['images'] });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select a prescription image first');
      return;
    }
    setIsUploading(true);
    // Simulate upload & OCR processing
    await new Promise(r => setTimeout(r, 2500));
    setIsUploading(false);
    router.push('/prescription/analysis');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      {/* Info Card */}
      <Card style={styles.infoCard}>
        <Ionicons name="scan" size={40} color={Colors.primary} />
        <Text style={styles.infoTitle}>AI Prescription Scanner</Text>
        <Text style={styles.infoText}>
          Upload or scan your prescription and our AI will extract medicine details, detect interactions, and suggest generic alternatives.
        </Text>
      </Card>

      {/* Upload Options */}
      <Text style={styles.sectionTitle}>Upload Prescription</Text>
      {!selectedImage ? (
        <View style={styles.uploadOptions}>
          <TouchableOpacity style={styles.uploadCard} onPress={() => pickImage(true)}>
            <View style={[styles.uploadIcon, { backgroundColor: Colors.primaryLight }]}>
              <Ionicons name="camera" size={32} color={Colors.primary} />
            </View>
            <Text style={styles.uploadLabel}>Take Photo</Text>
            <Text style={styles.uploadSub}>Use camera to scan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadCard} onPress={() => pickImage(false)}>
            <View style={[styles.uploadIcon, { backgroundColor: Colors.secondaryLight }]}>
              <Ionicons name="images" size={32} color={Colors.secondary} />
            </View>
            <Text style={styles.uploadLabel}>Gallery</Text>
            <Text style={styles.uploadSub}>Choose from photos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadCard} onPress={() => Alert.alert('PDF', 'PDF upload coming soon')}>
            <View style={[styles.uploadIcon, { backgroundColor: Colors.accentLight }]}>
              <Ionicons name="document" size={32} color={Colors.accent} />
            </View>
            <Text style={styles.uploadLabel}>PDF File</Text>
            <Text style={styles.uploadSub}>Upload PDF document</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
          <TouchableOpacity style={styles.removeBtn} onPress={() => setSelectedImage(null)}>
            <Ionicons name="close-circle" size={30} color={Colors.danger} />
          </TouchableOpacity>
        </View>
      )}

      {selectedImage && (
        <Button
          title={isUploading ? 'Analyzing...' : 'Analyze with AI'}
          onPress={handleAnalyze}
          isLoading={isUploading}
          fullWidth
          size="lg"
          icon={!isUploading ? <Ionicons name="sparkles" size={20} color="#FFF" /> : undefined}
          style={{ marginTop: Spacing.xl }}
        />
      )}

      {/* Features */}
      <Text style={styles.sectionTitle}>AI Analysis Features</Text>
      {[
        { icon: 'text', title: 'OCR Text Extraction', desc: 'Extract medicine names, dosage, and frequency', color: Colors.primary },
        { icon: 'alert-circle', title: 'Drug Interaction Check', desc: 'Detect potentially harmful drug combinations', color: Colors.danger },
        { icon: 'shield-checkmark', title: 'Allergy Alert', desc: 'Cross-check with your allergy profile', color: Colors.warning },
        { icon: 'copy', title: 'Duplicate Detection', desc: 'Identify duplicate medicine prescriptions', color: Colors.info },
        { icon: 'swap-horizontal', title: 'Generic Alternatives', desc: 'Suggest cost-effective generic options', color: Colors.secondary },
        { icon: 'checkmark-done', title: 'Medicine Verification', desc: 'Verify authenticity and expiry status', color: '#9C27B0' },
        { icon: 'alarm', title: 'Dosage Reminders', desc: 'Auto-setup medicine reminders', color: Colors.accent },
      ].map((feature, i) => (
        <Card key={i} style={styles.featureCard}>
          <View style={styles.featureRow}>
            <View style={[styles.featureIcon, { backgroundColor: feature.color + '15' }]}>
              <Ionicons name={feature.icon as any} size={22} color={feature.color} />
            </View>
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.desc}</Text>
            </View>
          </View>
        </Card>
      ))}
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.xl, paddingBottom: Spacing.xxxxl },
  infoCard: { alignItems: 'center', marginBottom: Spacing.xl },
  infoTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text, marginTop: Spacing.md },
  infoText: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.sm, lineHeight: 22 },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: Spacing.md, marginTop: Spacing.lg },
  uploadOptions: { flexDirection: 'row', gap: Spacing.md },
  uploadCard: {
    flex: 1, alignItems: 'center', padding: Spacing.lg, backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg, borderWidth: 1.5, borderColor: Colors.border, borderStyle: 'dashed',
  },
  uploadIcon: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm },
  uploadLabel: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  uploadSub: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: 2, textAlign: 'center' },
  previewContainer: { position: 'relative', borderRadius: BorderRadius.lg, overflow: 'hidden' },
  previewImage: { width: '100%', height: 300, borderRadius: BorderRadius.lg },
  removeBtn: { position: 'absolute', top: Spacing.sm, right: Spacing.sm },
  featureCard: { marginBottom: Spacing.sm },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  featureIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  featureInfo: { flex: 1 },
  featureTitle: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  featureDesc: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
});
