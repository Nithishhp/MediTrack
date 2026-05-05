import { Stack } from 'expo-router';
import { Colors } from '../../src/constants/theme';

export default function DoctorLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: Colors.surface },
      headerTintColor: Colors.text,
      headerTitleStyle: { fontWeight: '600' },
      headerShadowVisible: false,
    }}>
      <Stack.Screen name="search" options={{ title: 'Find Doctors' }} />
      <Stack.Screen name="profile" options={{ title: 'Doctor Profile' }} />
      <Stack.Screen name="book-appointment" options={{ title: 'Book Appointment' }} />
      <Stack.Screen name="appointment-detail" options={{ title: 'Appointment Details' }} />
      <Stack.Screen name="ai-recommendation" options={{ title: 'AI Doctor Recommendation' }} />
    </Stack>
  );
}
