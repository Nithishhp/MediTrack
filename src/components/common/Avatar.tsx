import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Colors, BorderRadius } from '../../constants/theme';
import { getAvatarColor } from '../../utils/avatarUtils';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: number;
  showOnline?: boolean;
  isOnline?: boolean;
}

export default function Avatar({ uri, name, size = 48, showOnline, isOnline }: AvatarProps) {
  const initials = name ? name.split(' ').map(n => n[0]).filter(Boolean).join('').slice(0, 2).toUpperCase() : '?';
  const bgColor = getAvatarColor(name || '');

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      {uri ? (
        <Image source={{ uri }} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />
      ) : (
        <View style={[styles.placeholder, { width: size, height: size, borderRadius: size / 2, backgroundColor: bgColor }]}>
          <Text style={[styles.initials, { fontSize: size * 0.4 }]}>{initials}</Text>
        </View>
      )}
      {showOnline && (
        <View style={[styles.status, { backgroundColor: isOnline ? Colors.online : Colors.offline }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'relative' },
  image: { resizeMode: 'cover' },
  placeholder: { alignItems: 'center', justifyContent: 'center' },
  initials: { color: '#FFFFFF', fontWeight: '700' },
  status: {
    position: 'absolute', bottom: 0, right: 0, width: 14, height: 14,
    borderRadius: 7, borderWidth: 2, borderColor: Colors.surface,
  },
});
