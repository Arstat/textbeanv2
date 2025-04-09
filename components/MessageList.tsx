import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';

type Message = {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  isRead: boolean;
  platform: string;
};

const messages: Message[] = [
  {
    id: '1',
    sender: {
      id: 'user1',
      name: 'Sarah Johnson',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    },
    content: 'Hey, are we still meeting for coffee tomorrow?',
    timestamp: '10:30 AM',
    isRead: false,
    platform: 'whatsapp',
  },
  {
    id: '2',
    sender: {
      id: 'user2',
      name: 'Michael Chen',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
    },
    content: 'I just sent you the project files. Let me know what you think!',
    timestamp: '9:45 AM',
    isRead: true,
    platform: 'telegram',
  },
  {
    id: '3',
    sender: {
      id: 'user3',
      name: 'Emma Wilson',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
    },
    content: 'Did you see the latest updates to the design system?',
    timestamp: 'Yesterday',
    isRead: false,
    platform: 'slack',
  },
  {
    id: '4',
    sender: {
      id: 'user4',
      name: 'David Kim',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
    },
    content: 'Happy birthday! Hope you have an amazing day! 🎂🎉',
    timestamp: 'Yesterday',
    isRead: true,
    platform: 'messenger',
  },
  {
    id: '5',
    sender: {
      id: 'user5',
      name: 'Sophia Martinez',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop',
    },
    content: 'Can you send me the address for the event tonight?',
    timestamp: 'Monday',
    isRead: true,
    platform: 'instagram',
  },
];

interface MessageListProps {
  platform?: string;
}

export default function MessageList({ platform }: MessageListProps) {
  const filteredMessages = platform
    ? messages.filter((message) => message.platform === platform)
    : messages;

  const renderItem = ({ item }: { item: Message }) => (
    <TouchableOpacity style={styles.messageContainer}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.sender.avatar }} style={styles.avatar} />
        <View
          style={[
            styles.platformIndicator,
            { backgroundColor: getPlatformColor(item.platform) },
          ]}
        />
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.senderName}>{item.sender.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text
          style={[styles.messageText, !item.isRead && styles.unreadMessage]}
          numberOfLines={1}
        >
          {item.content}
        </Text>
      </View>
      {!item.isRead && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={filteredMessages}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.container}
      contentContainerStyle={styles.listContent}
    />
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
  },
  listContent: {
    paddingVertical: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  platformIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  senderName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.text,
  },
  timestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  messageText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  unreadMessage: {
    fontFamily: 'Inter-Medium',
    color: Colors.text,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
    marginLeft: 8,
  },
});
