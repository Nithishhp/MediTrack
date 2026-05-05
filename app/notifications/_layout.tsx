import { Stack } from 'expo-router';
import { Colors } from '../../src/constants/theme';

export default function NotificationsLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: Colors.surface },
      headerTintColor: Colors.text,
      headerTitleStyle: { fontWeight: '600' },
      headerShadowVisible: false,
    }}>
      <Stack.Screen name="index" options={{ title: 'Notifications' }} />
    </Stack>
  );
}
