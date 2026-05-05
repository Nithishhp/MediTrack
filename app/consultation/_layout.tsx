import { Stack } from 'expo-router';
import { Colors } from '../../src/constants/theme';

export default function ConsultationLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: Colors.surface },
      headerTintColor: Colors.text,
      headerTitleStyle: { fontWeight: '600' },
      headerShadowVisible: false,
    }}>
      <Stack.Screen name="start" options={{ title: 'Start Consultation' }} />
      <Stack.Screen name="video" options={{ headerShown: false }} />
    </Stack>
  );
}
