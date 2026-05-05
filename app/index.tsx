import React, { useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import { router } from 'expo-router';
import * as SplashScreenModule from 'expo-splash-screen';
import { Colors, FontSize, FontWeight, Spacing } from '../src/constants/theme';
import { useAuth } from '../src/context/AuthContext';
import { Logo } from '../src/components/common';

// Keep native splash visible while JS loads
SplashScreenModule.preventAutoHideAsync().catch(() => {});

export default function SplashScreen() {
  const { isAuthenticated } = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const onLayoutReady = useCallback(async () => {
    // Hide native splash once JS splash is mounted
    await SplashScreenModule.hideAsync();
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, delay: 400, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/auth/login');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  return (
    <View style={styles.container} onLayout={onLayoutReady}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        {/* collapsable={false} prevents Android view flattening which breaks SVG rendering */}
        <View collapsable={false}>
          <Logo size={110} variant="white" />
        </View>
      </Animated.View>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <Text style={styles.title}>MediTrack</Text>
        <Text style={styles.subtitle}>AI-Enhanced Healthcare & Smart Medicine Management</Text>
      </Animated.View>
      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <Text style={styles.version}>v1.0.0</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', padding: Spacing.xxxl },
  logoContainer: { marginBottom: Spacing.xxl },
  iconBg: { alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: FontSize.hero, fontWeight: FontWeight.extrabold, color: Colors.textLight, textAlign: 'center' },
  subtitle: { fontSize: FontSize.md, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginTop: Spacing.sm, lineHeight: 22 },
  footer: { position: 'absolute', bottom: 50 },
  version: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.5)' },
});
