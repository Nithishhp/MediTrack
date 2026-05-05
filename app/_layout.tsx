import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../src/context/AuthContext';
import { CartProvider } from '../src/context/CartContext';
import { AppProvider } from '../src/context/AppContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppProvider>
        <CartProvider>
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="auth" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="doctor" options={{ headerShown: false }} />
            <Stack.Screen name="consultation" options={{ headerShown: false }} />
            <Stack.Screen name="prescription" options={{ headerShown: false }} />
            <Stack.Screen name="pharmacy" options={{ headerShown: false }} />
            <Stack.Screen name="health" options={{ headerShown: false }} />
            <Stack.Screen name="emergency" options={{ headerShown: false }} />
            <Stack.Screen name="inventory" options={{ headerShown: false }} />
            <Stack.Screen name="notifications" options={{ headerShown: false }} />
            <Stack.Screen name="reminders" options={{ headerShown: false }} />
            <Stack.Screen name="support" options={{ headerShown: false }} />
          </Stack>
        </CartProvider>
      </AppProvider>
    </AuthProvider>
  );
}
