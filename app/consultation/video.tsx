import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../../src/constants/theme';
import { Avatar } from '../../src/components/common';
import { MOCK_APPOINTMENTS } from '../../src/constants/mockData';

interface ChatMsg {
  id: string;
  sender: 'patient' | 'doctor';
  text: string;
  time: string;
}

export default function VideoConsultationScreen() {
  const { appointmentId } = useLocalSearchParams<{ appointmentId: string }>();
  const appointment = MOCK_APPOINTMENTS.find(a => a.id === appointmentId) || MOCK_APPOINTMENTS[0];
  const doctor = appointment.doctor;

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMsg, setChatMsg] = useState('');
  const [messages, setMessages] = useState<ChatMsg[]>([
    { id: '1', sender: 'doctor', text: 'Hello! How are you feeling today?', time: '10:00' },
  ]);
  const [duration, setDuration] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setDuration(d => d + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const sendMessage = () => {
    if (!chatMsg.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now().toString(), sender: 'patient', text: chatMsg.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    setChatMsg('');
    // Simulate doctor response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), sender: 'doctor', text: 'I understand. Let me note that down.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    }, 2000);
  };

  const endCall = () => {
    Alert.alert('End Consultation', 'Are you sure you want to end this consultation?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'End Call', style: 'destructive', onPress: () => {
        Alert.alert('Consultation Ended', 'Your medical notes and prescription will be updated shortly.', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      }},
    ]);
  };

  if (showChat) {
    return (
      <SafeAreaView style={styles.chatContainer}>
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => setShowChat(false)}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.chatTitle}>Chat with Dr. {doctor?.firstName}</Text>
          <TouchableOpacity onPress={() => Alert.alert('Upload', 'Upload reports or files')}>
            <Ionicons name="attach" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatList}
          renderItem={({ item }) => (
            <View style={[styles.msgBubble, item.sender === 'patient' ? styles.myMsg : styles.theirMsg]}>
              <Text style={[styles.msgText, item.sender === 'patient' && styles.myMsgText]}>{item.text}</Text>
              <Text style={[styles.msgTime, item.sender === 'patient' && styles.myMsgTime]}>{item.time}</Text>
            </View>
          )}
        />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.chatInput}>
            <TextInput
              style={styles.chatTextInput}
              value={chatMsg}
              onChangeText={setChatMsg}
              placeholder="Type a message..."
              placeholderTextColor={Colors.textTertiary}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
              <Ionicons name="send" size={20} color={Colors.textLight} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {/* Video Area */}
      <View style={styles.videoArea}>
        <View style={styles.remoteVideo}>
          <Avatar uri={doctor?.avatar} name={`${doctor?.firstName} ${doctor?.lastName}`} size={120} />
          <Text style={styles.remoteName}>Dr. {doctor?.firstName} {doctor?.lastName}</Text>
          <Text style={styles.remoteSpec}>{doctor?.specialization}</Text>
        </View>

        {/* Self View */}
        <View style={styles.selfVideo}>
          {isVideoOff ? (
            <Ionicons name="videocam-off" size={24} color={Colors.textLight} />
          ) : (
            <Avatar name="You" size={40} />
          )}
        </View>

        {/* Top Bar */}
        <SafeAreaView style={styles.topBar} edges={['top']}>
          <TouchableOpacity style={styles.topBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.durationBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.durationText}>{formatDuration(duration)}</Text>
          </View>
          <TouchableOpacity style={styles.topBtn} onPress={() => { setIsRecording(!isRecording); }}>
            <Ionicons name={isRecording ? 'radio-button-on' : 'radio-button-off'} size={24} color={isRecording ? '#FF4444' : '#FFF'} />
          </TouchableOpacity>
        </SafeAreaView>

        {/* AI Notes Badge */}
        <View style={styles.aiBadge}>
          <Ionicons name="sparkles" size={14} color={Colors.primary} />
          <Text style={styles.aiText}>AI transcribing medical notes...</Text>
        </View>
      </View>

      {/* Controls */}
      <SafeAreaView style={styles.controls} edges={['bottom']}>
        <TouchableOpacity style={[styles.controlBtn, isMuted && styles.controlBtnActive]} onPress={() => setIsMuted(!isMuted)}>
          <Ionicons name={isMuted ? 'mic-off' : 'mic'} size={24} color={isMuted ? Colors.danger : '#FFF'} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlBtn, isVideoOff && styles.controlBtnActive]} onPress={() => setIsVideoOff(!isVideoOff)}>
          <Ionicons name={isVideoOff ? 'videocam-off' : 'videocam'} size={24} color={isVideoOff ? Colors.danger : '#FFF'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn} onPress={() => setShowChat(true)}>
          <Ionicons name="chatbubble" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn} onPress={() => Alert.alert('Upload', 'Choose file to share with doctor')}>
          <Ionicons name="document-attach" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.endBtn} onPress={endCall}>
          <Ionicons name="call" size={28} color="#FFF" style={{ transform: [{ rotate: '135deg' }] }} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A2E' },
  videoArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  remoteVideo: { alignItems: 'center', gap: Spacing.md },
  remoteName: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: '#FFF' },
  remoteSpec: { fontSize: FontSize.md, color: 'rgba(255,255,255,0.6)' },
  selfVideo: {
    position: 'absolute', top: 100, right: Spacing.xl,
    width: 80, height: 100, borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)',
  },
  topBar: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.xl },
  topBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  durationBadge: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50' },
  durationText: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: '#FFF' },
  aiBadge: {
    position: 'absolute', bottom: 20, flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full,
  },
  aiText: { fontSize: FontSize.sm, color: Colors.primary, fontWeight: FontWeight.medium },
  controls: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: Spacing.lg,
    paddingVertical: Spacing.lg, paddingBottom: Spacing.xl, backgroundColor: '#1A1A2E',
  },
  controlBtn: { width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  controlBtnActive: { backgroundColor: 'rgba(255,255,255,0.3)' },
  endBtn: { width: 60, height: 60, borderRadius: 30, backgroundColor: Colors.danger, alignItems: 'center', justifyContent: 'center' },
  // Chat
  chatContainer: { flex: 1, backgroundColor: Colors.surface },
  chatHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.divider },
  chatTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.text },
  chatList: { padding: Spacing.xl },
  msgBubble: { maxWidth: '80%', padding: Spacing.md, borderRadius: BorderRadius.lg, marginBottom: Spacing.sm },
  myMsg: { backgroundColor: Colors.primary, alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  theirMsg: { backgroundColor: Colors.background, alignSelf: 'flex-start', borderBottomLeftRadius: 4 },
  msgText: { fontSize: FontSize.md, color: Colors.text },
  myMsgText: { color: '#FFF' },
  msgTime: { fontSize: FontSize.xs, color: Colors.textTertiary, marginTop: Spacing.xs },
  myMsgTime: { color: 'rgba(255,255,255,0.6)' },
  chatInput: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.divider, gap: Spacing.sm },
  chatTextInput: { flex: 1, backgroundColor: Colors.background, borderRadius: BorderRadius.full, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, fontSize: FontSize.md },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
});
