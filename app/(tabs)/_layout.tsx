import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize } from '../../src/constants/theme';
import { useCart } from '../../src/context/CartContext';
import { useApp } from '../../src/context/AppContext';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function TabBarBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <View style={badgeStyles.container}>
      <Text style={badgeStyles.text}>{count > 9 ? '9+' : count}</Text>
    </View>
  );
}

const badgeStyles = StyleSheet.create({
  container: {
    position: 'absolute', top: -4, right: -10, backgroundColor: Colors.danger,
    borderRadius: 10, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 4,
  },
  text: { color: '#FFF', fontSize: 10, fontWeight: '700' },
});

export default function TabLayout() {
  const { totalItems } = useCart();
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 10);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textTertiary,
        tabBarLabelStyle: { fontSize: FontSize.xs, fontWeight: '600', marginBottom: 2 },
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.divider,
          height: 56 + bottomPadding,
          paddingTop: 6,
          paddingBottom: bottomPadding,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: 'Appts',
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="pharmacy"
        options={{
          title: 'Pharmacy',
          tabBarIcon: ({ color, size }) => (
            <View>
              <Ionicons name="medkit" size={size} color={color} />
              <TabBarBadge count={totalItems} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          title: 'Health',
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
