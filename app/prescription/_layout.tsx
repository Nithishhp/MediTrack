import { Stack } from 'expo-router';
import { Colors } from '../../src/constants/theme';

export default function PrescriptionLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: Colors.surface },
      headerTintColor: Colors.text,
      headerTitleStyle: { fontWeight: '600' },
      headerShadowVisible: false,
    }}>
      <Stack.Screen name="upload" options={{ title: 'Upload Prescription' }} />
      <Stack.Screen name="analysis" options={{ title: 'AI Analysis' }} />
    </Stack>
  );
}
