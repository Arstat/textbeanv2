import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/components/Header';
import Colors from '@/constants/Colors';
import { MessageSquare, UserPlus, Heart, Bell } from 'lucide-react-native';

type Notification = {
  id: string;
  type: 'message' | 'friend_request' | 'reaction' | 'system';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  platform: string;
};

const notifications: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'New message from Sarah',
    description: 'Hey, are we still meeting for coffee tomorrow?',
    timestamp: '10 min ago',
    isRead: false,
    platform: 'whatsapp',
  },
  {
    id: '2',
    type: 'friend_request',
    title: 'Friend request',
    description: 'Michael Chen wants to connect with you',
    timestamp: '1 hour ago',
    isRead: false,
    platform: 'telegram',
  },
  {
    id: '3',
    type: 'reaction',
    title: 'New reaction',
    description: 'Emma liked your message',
    timestamp: '3 hours ago',
    isRead: true,
    platform: 'instagram',
  },
  {
    id: '4',
    type: 'system',
    title: 'System notification',
    description: 'Your account was successfully connected to Slack',
    timestamp: 'Yesterday',
    isRead: true,
    platform: 'slack',
  },
  {
    id: '5',
    type: 'message',
    title: 'New message from David',
    description: 'Happy birthday! Hope you have an amazing day! 🎂🎉',
    timestamp: 'Yesterday',
    isRead: true,
    platform: 'messenger',
  },
];

export default function NotificationsScreen() {
  const renderNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare size={24} color={Colors.accent} />;
      case 'friend_request':
        return <UserPlus size={24} color={Colors.info} />;
      case 'reaction':
        return <Heart size={24} color={Colors.error} />;
      case 'system':
        return <Bell size={24} color={Colors.warning} />;
      default:
        return <Bell size={24} color={Colors.accent} />;
    }
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !item.isRead && styles.unreadNotification,
      ]}
    >
      <View style={styles.iconContainer}>
        {renderNotificationIcon(item.type)}
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text style={styles.notificationDescription}>{item.description}</Text>
        <View
          style={[
            styles.platformIndicator,
            { backgroundColor: getPlatformColor(item.platform) },
          ]}
        >
          <Text style={styles.platformText}>{item.platform}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#121218', '#1E1E2A']}
        style={StyleSheet.absoluteFill}
      />
      <Header title="Notifications" />
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

function getPlatformColor(platform: string): string {
  switch (platform) {
    case 'whatsapp':
      return Colors.whatsapp;
    case 'telegram':
      return Colors.telegram;
    case 'messenger':
      return Colors.messenger;
    case 'instagram':
      return Colors.instagram;
    case 'signal':
      return Colors.signal;
    case 'slack':
      return Colors.slack;
    default:
      return Colors.accent;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 8,
    paddingBottom: 80, // Add padding to avoid content being hidden by tab bar
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  unreadNotification: {
    backgroundColor: 'rgba(124, 77, 255, 0.05)',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  notificationTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.text,
  },
  timestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  notificationDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  platformIndicator: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  platformText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.text,
    textTransform: 'capitalize',
  },
});
