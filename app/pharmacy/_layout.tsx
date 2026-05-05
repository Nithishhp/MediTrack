import { Stack } from 'expo-router';
import { Colors } from '../../src/constants/theme';

export default function PharmacyLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: Colors.surface },
      headerTintColor: Colors.text,
      headerTitleStyle: { fontWeight: '600' },
      headerShadowVisible: false,
    }}>
      <Stack.Screen name="cart" options={{ title: 'Shopping Cart' }} />
      <Stack.Screen name="orders" options={{ title: 'My Orders' }} />
      <Stack.Screen name="medicine-detail" options={{ title: 'Medicine Details' }} />
    </Stack>
  );
}
