import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  PanResponder,
} from 'react-native';
import { Plus } from 'lucide-react-native';
import Colors from '../constants/Colors';

type Platform = {
  id: string;
  name: string;
  icon: string;
  color: string;
  unreadCount: number;
  isActive: boolean;
};

const platforms: Platform[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: 'https://i.postimg.cc/4yxn32T9/whatsapp.png',
    color: Colors.whatsapp,
    unreadCount: 3,
    isActive: true,
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: 'https://i.postimg.cc/C1NzST90/telegram.png',
    color: Colors.telegram,
    unreadCount: 0,
    isActive: false,
  },
  {
    id: 'messenger',
    name: 'Messenger',
    icon: 'https://i.postimg.cc/qvPtGG2P/messenger.png',
    color: Colors.messenger,
    unreadCount: 5,
    isActive: false,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'https://i.postimg.cc/bNv2YrzB/insta.png',
    color: Colors.instagram,
    unreadCount: 2,
    isActive: false,
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: 'https://i.postimg.cc/0NtQx7gg/281-2810396-paper-icon-png.png',
    color: Colors.slack,
    unreadCount: 0,
    isActive: false,
  },
];

interface PlatformSidebarProps {
  onSelectPlatform: (platform: Platform) => void;
}

export default function PlatformSidebar({
  onSelectPlatform,
}: PlatformSidebarProps) {
  const [isVisible, setIsVisible] = useState(true);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 50) {
          setIsVisible(true);
        } else if (gestureState.dx < -50) {
          setIsVisible(false);
        }
      },
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {isVisible && (
        <View style={styles.sidebar}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {platforms.map((platform) => (
              <TouchableOpacity
                key={platform.id}
                style={[
                  styles.platformButton,
                  platform.isActive && styles.activePlatform,
                ]}
                onPress={() => onSelectPlatform(platform)}
              >
                <View
                  style={[
                    styles.platformIconContainer,
                    { borderColor: platform.color },
                  ]}
                >
                  <Image
                    source={{ uri: platform.icon }}
                    style={styles.platformIcon}
                  />
                  {platform.unreadCount > 0 && (
                    <View style={styles.badgeContainer}>
                      <Text style={styles.badgeText}>
                        {platform.unreadCount}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sidebar: {
    width: 80,
    backgroundColor: Colors.backgroundSecondary,
    borderRightWidth: 1,
    borderRightColor: Colors.divider,
    paddingVertical: 16,
    alignItems: 'center',
    height: '100%',
  },
  scrollView: {
    width: '100%',
  },
  platformButton: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  activePlatform: {
    backgroundColor: 'rgba(124, 77, 255, 0.1)',
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent,
  },
  platformIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    overflow: 'hidden',
  },
  platformIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  badgeContainer: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: Colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: Colors.text,
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.accentSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
});
