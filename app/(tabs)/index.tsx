import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  Animated,
  PanResponder,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PlatformSidebar from '@/components/PlatformSidebar';
import MessageList from '@/components/MessageList';
import Header from '@/components/Header';
import Colors from '@/constants/Colors';

export default function HomeScreen() {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Animation values
  const sidebarPosition = useRef(new Animated.Value(0)).current;
  const mainContentPosition = useRef(new Animated.Value(0)).current;
  const sidebarWidth = 80;

  // Create pan responder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only respond to horizontal gestures
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 3);
      },
      onPanResponderMove: (evt, gestureState) => {
        // If sidebar is visible, allow swiping left (negative dx)
        if (sidebarVisible && gestureState.dx < 0) {
          // Limit the movement to -sidebarWidth
          const newPosition = Math.max(gestureState.dx, -sidebarWidth);
          sidebarPosition.setValue(newPosition);
          mainContentPosition.setValue(newPosition);
        }
        // If sidebar is hidden, allow swiping right (positive dx)
        else if (!sidebarVisible && gestureState.dx > 0) {
          // Limit the movement to sidebarWidth
          const newPosition = Math.min(gestureState.dx - sidebarWidth, 0);
          sidebarPosition.setValue(newPosition);
          mainContentPosition.setValue(newPosition);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Determine if we should complete the animation or revert
        if (sidebarVisible) {
          // If swiped left more than 40% of sidebar width, hide it
          if (gestureState.dx < -sidebarWidth * 0.4) {
            hideSidebar();
          } else {
            // Otherwise, snap back to visible
            showSidebar();
          }
        } else {
          // If swiped right more than 40% of sidebar width, show it
          if (gestureState.dx > sidebarWidth * 0.4) {
            showSidebar();
          } else {
            // Otherwise, snap back to hidden
            hideSidebar();
          }
        }
      },
    })
  ).current;

  const showSidebar = () => {
    setSidebarVisible(true);
    Animated.spring(sidebarPosition, {
      toValue: 0,
      useNativeDriver: true,
      friction: 8,
      tension: 50,
    }).start();
    Animated.spring(mainContentPosition, {
      toValue: 0,
      useNativeDriver: true,
      friction: 8,
      tension: 50,
    }).start();
  };

  const hideSidebar = () => {
    Animated.spring(sidebarPosition, {
      toValue: -sidebarWidth,
      useNativeDriver: true,
      friction: 8,
      tension: 50,
    }).start(() => {
      setSidebarVisible(false);
    });
    Animated.spring(mainContentPosition, {
      toValue: -sidebarWidth,
      useNativeDriver: true,
      friction: 8,
      tension: 50,
    }).start();
  };

  // Set initial position based on visibility
  useEffect(() => {
    sidebarPosition.setValue(sidebarVisible ? 0 : -sidebarWidth);
    mainContentPosition.setValue(sidebarVisible ? 0 : -sidebarWidth);
  }, []);

  const handleSelectPlatform = (platform) => {
    setSelectedPlatform(platform);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#121218', '#1E1E2A']}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content} {...panResponder.panHandlers}>
        <Animated.View
          style={[
            styles.sidebarContainer,
            { transform: [{ translateX: sidebarPosition }] },
          ]}
        >
          <PlatformSidebar onSelectPlatform={handleSelectPlatform} />
        </Animated.View>
        <Animated.View
          style={[
            styles.mainContent,
            { transform: [{ translateX: mainContentPosition }] },
          ]}
        >
          <Header
            title="TextBean"
            subtitle={selectedPlatform ? selectedPlatform.name : 'All Messages'}
            onMenuPress={() => (sidebarVisible ? hideSidebar() : showSidebar())}
            showMenuButton={true}
          />
          <MessageList platform={selectedPlatform?.id} />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebarContainer: {
    width: 80,
    zIndex: 10,
  },
  mainContent: {
    flex: 1,
  },
});
