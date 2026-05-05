import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { Avatar, Button, Input, Card } from '../../src/components/common';
import { useAuth } from '../../src/context/AuthContext';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const GENDERS: Array<{ value: 'male' | 'female' | 'other'; label: string }> = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

export default function EditProfileScreen() {
  const { user, updateProfile } = useAuth();

  const [avatarUri, setAvatarUri] = useState<string | undefined>(user?.avatar);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || '');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(user?.gender || 'male');
  const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup || '');
  const [insuranceId, setInsuranceId] = useState(user?.insuranceId || '');
  const [ecName, setEcName] = useState(user?.emergencyContact?.name || '');
  const [ecPhone, setEcPhone] = useState(user?.emergencyContact?.phone || '');
  const [ecRelationship, setEcRelationship] = useState(user?.emergencyContact?.relationship || '');
  const [allergies, setAllergies] = useState<string[]>(user?.allergies || []);
  const [newAllergy, setNewAllergy] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handlePickImage = () => {
    Alert.alert('Change Profile Photo', 'Choose an option', [
      {
        text: 'Take Photo',
        onPress: async () => {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Permission needed', 'Camera access is required to take a photo.');
            return;
          }
          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
          });
          if (!result.canceled) setAvatarUri(result.assets[0].uri);
        },
      },
      {
        text: 'Choose from Gallery',
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
          });
          if (!result.canceled) setAvatarUri(result.assets[0].uri);
        },
      },
      { text: 'Remove Photo', style: 'destructive', onPress: () => setAvatarUri(undefined) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const addAllergy = () => {
    const trimmed = newAllergy.trim();
    if (!trimmed) return;
    if (allergies.includes(trimmed)) {
      Alert.alert('Duplicate', 'This allergy is already added.');
      return;
    }
    setAllergies(prev => [...prev, trimmed]);
    setNewAllergy('');
  };

  const removeAllergy = (item: string) => {
    setAllergies(prev => prev.filter(a => a !== item));
  };

  const handleSave = async () => {
    if (!firstName.trim()) {
      Alert.alert('Error', 'First name is required.');
      return;
    }
    setIsSaving(true);
    try {
      await updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        dateOfBirth,
        gender,
        bloodGroup: bloodGroup || undefined,
        insuranceId: insuranceId || undefined,
        avatar: avatarUri,
        allergies,
        emergencyContact: ecName.trim() ? {
          name: ecName.trim(),
          phone: ecPhone.trim(),
          relationship: ecRelationship.trim(),
        } : undefined,
      });
      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch {
      Alert.alert('Error', 'Failed to save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={Colors.text} />
            </TouchableOpacity>
            <Text style={styles.title}>Edit Profile</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <TouchableOpacity onPress={handlePickImage} activeOpacity={0.8}>
              <Avatar uri={avatarUri} name={`${firstName} ${lastName}`} size={96} />
              <View style={styles.cameraOverlay}>
                <Ionicons name="camera" size={18} color="#FFF" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePickImage}>
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          </View>

          {/* Personal Info */}
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <Card style={styles.card}>
            <Input label="First Name" placeholder="Enter first name" value={firstName} onChangeText={setFirstName} icon="person-outline" />
            <Input label="Last Name" placeholder="Enter last name" value={lastName} onChangeText={setLastName} icon="person-outline" />
            <Input label="Phone" placeholder="Enter phone number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" icon="call-outline" />
            <Input label="Date of Birth" placeholder="YYYY-MM-DD" value={dateOfBirth} onChangeText={setDateOfBirth} icon="calendar-outline" />
            <Input label="Insurance ID" placeholder="Enter insurance ID (optional)" value={insuranceId} onChangeText={setInsuranceId} icon="card-outline" />
          </Card>

          {/* Gender */}
          <Text style={styles.sectionTitle}>Gender</Text>
          <View style={styles.chipRow}>
            {GENDERS.map(g => (
              <TouchableOpacity
                key={g.value}
                style={[styles.chip, gender === g.value && styles.chipActive]}
                onPress={() => setGender(g.value)}
              >
                <Text style={[styles.chipText, gender === g.value && styles.chipTextActive]}>{g.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Blood Group */}
          <Text style={styles.sectionTitle}>Blood Group</Text>
          <View style={styles.chipRow}>
            {BLOOD_GROUPS.map(bg => (
              <TouchableOpacity
                key={bg}
                style={[styles.chip, bloodGroup === bg && styles.chipActive]}
                onPress={() => setBloodGroup(bloodGroup === bg ? '' : bg)}
              >
                <Text style={[styles.chipText, bloodGroup === bg && styles.chipTextActive]}>{bg}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Allergies */}
          <Text style={styles.sectionTitle}>Allergies</Text>
          <Card style={styles.card}>
            <View style={styles.chipRow}>
              {allergies.map(a => (
                <View key={a} style={styles.allergyChip}>
                  <Text style={styles.allergyText}>{a}</Text>
                  <TouchableOpacity onPress={() => removeAllergy(a)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Ionicons name="close-circle" size={18} color={Colors.danger} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <View style={styles.addAllergyRow}>
              <TextInput
                style={styles.allergyInput}
                placeholder="Add allergy..."
                placeholderTextColor={Colors.textTertiary}
                value={newAllergy}
                onChangeText={setNewAllergy}
                onSubmitEditing={addAllergy}
                returnKeyType="done"
              />
              <TouchableOpacity style={styles.addAllergyBtn} onPress={addAllergy}>
                <Ionicons name="add-circle" size={28} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </Card>

          {/* Emergency Contact */}
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          <Card style={styles.card}>
            <Input label="Contact Name" placeholder="Enter contact name" value={ecName} onChangeText={setEcName} icon="person-outline" />
            <Input label="Contact Phone" placeholder="Enter contact phone" value={ecPhone} onChangeText={setEcPhone} keyboardType="phone-pad" icon="call-outline" />
            <Input label="Relationship" placeholder="e.g. Spouse, Parent" value={ecRelationship} onChangeText={setEcRelationship} icon="heart-outline" />
          </Card>

          {/* Save */}
          <Button title="Save Changes" onPress={handleSave} isLoading={isSaving} fullWidth size="lg" style={{ marginTop: Spacing.lg }} />
          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.xl },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.xl },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.text },
  avatarSection: { alignItems: 'center', marginBottom: Spacing.xxl },
  cameraOverlay: {
    position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.surface,
  },
  changePhotoText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.primary, marginTop: Spacing.sm },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.text, marginBottom: Spacing.md, marginTop: Spacing.lg },
  card: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.md },
  chip: {
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full, borderWidth: 1.5, borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  chipActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  chipText: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, color: Colors.textSecondary },
  chipTextActive: { color: Colors.primary, fontWeight: FontWeight.semibold },
  allergyChip: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full, backgroundColor: Colors.dangerLight,
  },
  allergyText: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, color: Colors.danger },
  addAllergyRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: Spacing.sm },
  allergyInput: {
    flex: 1, height: 44, paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.border,
    fontSize: FontSize.md, color: Colors.text, backgroundColor: Colors.background,
  },
  addAllergyBtn: { padding: Spacing.xs },
});
