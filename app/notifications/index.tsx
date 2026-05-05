import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../../src/constants/theme';
import { Card, EmptyState } from '../../src/components/common';
import { useApp } from '../../src/context/AppContext';

const notifIcons: Record<string, { icon: string; color: string }> = {
  appointment: { icon: 'calendar', color: Colors.primary },
  medicine_reminder: { icon: 'alarm', color: Colors.accent },
  order: { icon: 'cart', color: Colors.secondary },
  health_alert: { icon: 'heart', color: Colors.danger },
  emergency: { icon: 'warning', color: Colors.danger },
  general: { icon: 'notifications', color: Colors.info },
};

export default function NotificationsScreen() {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useApp();

  if (notifications.length === 0) {
    return <EmptyState icon="notifications-off-outline" title="No Notifications" subtitle="You're all caught up!" />;
  }

  const formatTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      {unreadCount > 0 && (
        <TouchableOpacity style={styles.markAllBtn} onPress={markAllAsRead}>
          <Ionicons name="checkmark-done" size={18} color={Colors.primary} />
          <Text style={styles.markAllText}>Mark all as read ({unreadCount})</Text>
        </TouchableOpacity>
      )}

      {notifications.map(notif => {
        const config = notifIcons[notif.type] || notifIcons.general;
        return (
          <TouchableOpacity
            key={notif.id}
            style={[styles.notifCard, !notif.isRead && styles.unread]}
            onPress={() => markAsRead(notif.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconCircle, { backgroundColor: config.color + '15' }]}>
              <Ionicons name={config.icon as any} size={22} color={config.color} />
            </View>
            <View style={styles.notifInfo}>
              <Text style={[styles.notifTitle, !notif.isRead && styles.unreadTitle]}>{notif.title}</Text>
              <Text style={styles.notifBody}>{notif.body}</Text>
              <Text style={styles.notifTime}>{formatTime(notif.createdAt)}</Text>
            </View>
            {!notif.isRead && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.xl },
  markAllBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, paddingVertical: Spacing.md, marginBottom: Spacing.md },
  markAllText: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.primary },
  notifCard: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md, padding: Spacing.lg, backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, marginBottom: Spacing.sm, borderWidth: 1, borderColor: Colors.divider },
  unread: { backgroundColor: Colors.primaryLight, borderColor: Colors.primary + '30' },
  iconCircle: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  notifInfo: { flex: 1 },
  notifTitle: { fontSize: FontSize.md, fontWeight: FontWeight.medium, color: Colors.text },
  unreadTitle: { fontWeight: FontWeight.bold },
  notifBody: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2, lineHeight: 20 },
  notifTime: { fontSize: FontSize.xs, color: Colors.textTertiary, marginTop: Spacing.sm },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary, marginTop: Spacing.xs },
});
