import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Chrome as Home, Bell, Star, Brain } from 'lucide-react-native';
import { Platform } from 'react-native';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
        tabBarBackground: () =>
          Platform.OS !== 'web' ? (
            <BlurView
              tint="dark"
              intensity={80}
              style={StyleSheet.absoluteFill}
            />
          ) : (
            <View
              style={[StyleSheet.absoluteFill, styles.webTabBarBackground]}
            />
          ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, size }) => <Bell size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => <Star size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ai-insights"
        options={{
          title: 'AI Insights',
          tabBarIcon: ({ color, size }) => <Brain size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    height: 60,
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  webTabBarBackground: {
    backgroundColor: Colors.backgroundSecondary,
    opacity: 0.7,
  },
  tabBarLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
});
