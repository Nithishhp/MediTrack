import { Stack } from 'expo-router';
import { Colors } from '../../src/constants/theme';

export default function HealthLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: Colors.surface },
      headerTintColor: Colors.text,
      headerTitleStyle: { fontWeight: '600' },
      headerShadowVisible: false,
    }}>
      <Stack.Screen name="records" options={{ title: 'Health Records' }} />
      <Stack.Screen name="analytics" options={{ title: 'Health Analytics' }} />
      <Stack.Screen name="ai-assistant" options={{ title: 'AI Health Assistant' }} />
      <Stack.Screen name="vitals" options={{ title: 'Log Vitals' }} />
    </Stack>
  );
}
