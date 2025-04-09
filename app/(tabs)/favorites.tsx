import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/components/Header';
import Colors from '@/constants/Colors';
import { Pin } from 'lucide-react-native';

type FavoriteChat = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  platform: string;
  isPinned: boolean;
};

const favoriteChats: FavoriteChat[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    lastMessage: 'See you tomorrow at the coffee shop!',
    timestamp: '10:30 AM',
    platform: 'whatsapp',
    isPinned: true,
  },
  {
    id: '2',
    name: 'Design Team',
    avatar:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=100&auto=format&fit=crop',
    lastMessage: 'New design system updates are ready for review',
    timestamp: 'Yesterday',
    platform: 'slack',
    isPinned: true,
  },
  {
    id: '3',
    name: 'Michael Chen',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
    lastMessage: "The project files look great! Let's discuss tomorrow.",
    timestamp: 'Monday',
    platform: 'telegram',
    isPinned: false,
  },
  {
    id: '4',
    name: 'Emma Wilson',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
    lastMessage: 'Thanks for the help with the presentation!',
    timestamp: 'Last week',
    platform: 'messenger',
    isPinned: false,
  },
  {
    id: '5',
    name: 'Family Group',
    avatar:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=100&auto=format&fit=crop',
    lastMessage: "Mom: Don't forget about Sunday dinner!",
    timestamp: 'Last week',
    platform: 'whatsapp',
    isPinned: true,
  },
];

export default function FavoritesScreen() {
  const renderItem = ({ item }: { item: FavoriteChat }) => (
    <TouchableOpacity style={styles.chatItem}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View
          style={[
            styles.platformIndicator,
            { backgroundColor: getPlatformColor(item.platform) },
          ]}
        />
      </View>
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      {item.isPinned && (
        <View style={styles.pinnedContainer}>
          <Pin size={16} color={Colors.accent} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#121218', '#1E1E2A']}
        style={StyleSheet.absoluteFill}
      />
      <Header title="Favorites" />
      <FlatList
        data={favoriteChats}
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
  chatItem: {
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
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chatName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.text,
  },
  timestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  lastMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  pinnedContainer: {
    marginLeft: 8,
    transform: [{ rotate: '45deg' }],
  },
});
