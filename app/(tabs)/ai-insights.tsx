import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/components/Header';
import Colors from '@/constants/Colors';
import {
  Brain,
  TrendingUp,
  Clock,
  MessageSquare,
  TriangleAlert as AlertTriangle,
} from 'lucide-react-native';

type InsightCard = {
  id: string;
  title: string;
  description: string;
  type: 'priority' | 'trend' | 'reminder' | 'suggestion' | 'alert';
  actionText: string;
};

const insights: InsightCard[] = [
  {
    id: '1',
    title: 'Priority Messages',
    description:
      'You have 3 unread messages that require urgent attention based on content analysis.',
    type: 'priority',
    actionText: 'View Messages',
  },
  {
    id: '2',
    title: 'Communication Trends',
    description:
      'Your response time has improved by 15% this week. Keep up the good work!',
    type: 'trend',
    actionText: 'See Details',
  },
  {
    id: '3',
    title: 'Smart Reminder',
    description:
      'You promised to send files to Sarah by today. Would you like to do it now?',
    type: 'reminder',
    actionText: 'Send Files',
  },
  {
    id: '4',
    title: 'Response Suggestions',
    description:
      "We've generated smart replies for 5 recent messages to help you respond faster.",
    type: 'suggestion',
    actionText: 'View Suggestions',
  },
  {
    id: '5',
    title: 'Security Alert',
    description:
      'Unusual login detected on your WhatsApp account. Please verify this activity.',
    type: 'alert',
    actionText: 'Verify Now',
  },
];

export default function AIInsightsScreen() {
  const renderInsightIcon = (type: string) => {
    switch (type) {
      case 'priority':
        return <AlertTriangle size={24} color={Colors.warning} />;
      case 'trend':
        return <TrendingUp size={24} color={Colors.info} />;
      case 'reminder':
        return <Clock size={24} color={Colors.accent} />;
      case 'suggestion':
        return <MessageSquare size={24} color={Colors.success} />;
      case 'alert':
        return <AlertTriangle size={24} color={Colors.error} />;
      default:
        return <Brain size={24} color={Colors.accent} />;
    }
  };

  const getCardStyle = (type: string) => {
    switch (type) {
      case 'priority':
        return { borderColor: Colors.warning };
      case 'trend':
        return { borderColor: Colors.info };
      case 'reminder':
        return { borderColor: Colors.accent };
      case 'suggestion':
        return { borderColor: Colors.success };
      case 'alert':
        return { borderColor: Colors.error };
      default:
        return { borderColor: Colors.accent };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#121218', '#1E1E2A']}
        style={StyleSheet.absoluteFill}
      />
      <Header title="AI Insights" />

      <View style={styles.headerContainer}>
        <View style={styles.aiIconContainer}>
          <Brain size={32} color={Colors.accent} />
        </View>
        <Text style={styles.aiTitle}>TextBean AI Assistant</Text>
        <Text style={styles.aiDescription}>
          Your personal AI assistant analyzes your communication patterns to
          provide helpful insights and suggestions.
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {insights.map((insight) => (
          <View
            key={insight.id}
            style={[styles.insightCard, getCardStyle(insight.type)]}
          >
            <View style={styles.insightHeader}>
              <View style={styles.iconContainer}>
                {renderInsightIcon(insight.type)}
              </View>
              <Text style={styles.insightTitle}>{insight.title}</Text>
            </View>
            <Text style={styles.insightDescription}>{insight.description}</Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>{insight.actionText}</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  headerContainer: {
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  aiIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(124, 77, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 8,
  },
  aiDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  insightCard: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.text,
  },
  insightDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  actionButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.backgroundTertiary,
    borderRadius: 20,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.accent,
  },
  bottomPadding: {
    height: 80, // Add padding at the bottom to avoid content being hidden by tab bar
  },
});
