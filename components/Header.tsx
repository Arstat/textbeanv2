import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, Settings, Menu } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showMenuButton?: boolean;
  onMenuPress?: () => void;
}

export default function Header({
  title,
  subtitle,
  showMenuButton,
  onMenuPress,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {showMenuButton && (
          <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
            <Menu size={24} color={Colors.text} />
          </TouchableOpacity>
        )}
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconButton}>
          <Search size={24} color={Colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Settings size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(30, 30, 42, 0.7)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.text,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
