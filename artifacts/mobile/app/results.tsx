import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useSurvey } from '@/context/SurveyContext';
import { ThemeResultCard } from '@/components/ThemeResultCard';
import * as Haptics from 'expo-haptics';

function getOverallLabel(avg: number): { label: string; message: string; color: string } {
  if (avg < 40) return {
    label: 'En développement',
    message: 'Votre parcours commence ici. Chaque domaine recèle de belles opportunités de croissance.',
    color: '#E07A8B',
  };
  if (avg < 70) return {
    label: 'En progression',
    message: 'Vous êtes sur la bonne voie ! Continuez à investir dans chaque domaine de votre vie.',
    color: '#F5A623',
  };
  return {
    label: 'Épanouissant',
    message: 'Félicitations ! Votre bien-être global est remarquable. Continuez à cultiver cet équilibre.',
    color: '#4CAF8A',
  };
}

export default function ResultsScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { getThemeResults, resetSurvey } = useSurvey();

  const { totalAnswered } = useSurvey();
  const themeResults = getThemeResults();

  // Guard: redirect to home if no answers recorded
  useEffect(() => {
    if (totalAnswered === 0) {
      router.replace('/');
    }
  }, [totalAnswered]);

  const avgPercentage = Math.round(
    themeResults.reduce((sum, r) => sum + r.percentage, 0) / themeResults.length
  );
  const overallInfo = getOverallLabel(avgPercentage);

  const scoreAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Animated.parallel([
      Animated.timing(scoreAnim, {
        toValue: avgPercentage,
        duration: 1200,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleRestart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    resetSurvey();
    router.replace('/');
  };

  const topPadding = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPadding = Platform.OS === 'web' ? 34 : insets.bottom;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.heroHeader,
          {
            backgroundColor: colors.primary,
            paddingTop: topPadding + 12,
          },
        ]}
      >
        {/* Decorative circle */}
        <View style={styles.decorCircle} />

        <Text style={styles.heroTitle}>Votre Diagnostic</Text>
        <Text style={styles.heroSubtitle}>Score global de bien-être</Text>

        {/* Score circle */}
        <View style={[styles.scoreCircle, { borderColor: 'rgba(255,255,255,0.3)' }]}>
          <Animated.Text style={styles.scoreNumber}>
            {scoreAnim.interpolate({
              inputRange: [0, avgPercentage],
              outputRange: ['0', `${avgPercentage}`],
              extrapolate: 'clamp',
            })}
          </Animated.Text>
          <Text style={styles.scorePercent}>%</Text>
        </View>

        <View style={[styles.overallBadge, { backgroundColor: overallInfo.color + '25', borderColor: overallInfo.color + '50' }]}>
          <Ionicons name="sparkles" size={14} color={overallInfo.color} />
          <Text style={[styles.overallLabel, { color: overallInfo.color }]}>{overallInfo.label}</Text>
        </View>

        <Text style={styles.overallMessage}>{overallInfo.message}</Text>
      </View>

      {/* Results list */}
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomPadding + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.listContainer, { opacity: fadeAnim }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Résultats par thème
          </Text>
          <Text style={[styles.sectionHint, { color: colors.mutedForeground }]}>
            Touchez une carte pour afficher votre conseil personnalisé
          </Text>

          {themeResults.map((result) => (
            <ThemeResultCard key={result.themeId} result={result} />
          ))}

          {/* Summary insights */}
          <View style={[styles.summaryBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.summaryHeader}>
              <Ionicons name="analytics-outline" size={18} color={colors.primary} />
              <Text style={[styles.summaryTitle, { color: colors.foreground }]}>Points clés</Text>
            </View>
            {themeResults.sort((a, b) => b.percentage - a.percentage).slice(0, 1).map((r) => (
              <View key={r.themeId} style={styles.summaryRow}>
                <Ionicons name="trophy-outline" size={14} color="#4CAF8A" />
                <Text style={[styles.summaryText, { color: colors.foreground }]}>
                  <Text style={{ fontFamily: 'Inter_600SemiBold', color: r.color }}>{r.name}</Text>
                  {' '}est votre point le plus fort ({r.percentage}%)
                </Text>
              </View>
            ))}
            {themeResults.sort((a, b) => a.percentage - b.percentage).slice(0, 1).map((r) => (
              <View key={r.themeId} style={styles.summaryRow}>
                <Ionicons name="trending-up-outline" size={14} color="#F5A623" />
                <Text style={[styles.summaryText, { color: colors.foreground }]}>
                  <Text style={{ fontFamily: 'Inter_600SemiBold', color: r.color }}>{r.name}</Text>
                  {' '}offre le plus de potentiel de croissance
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Sticky bottom CTA */}
      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            paddingBottom: bottomPadding + 8,
          },
        ]}
      >
        <Pressable
          style={({ pressed }) => [
            styles.restartBtn,
            {
              backgroundColor: colors.primary,
              opacity: pressed ? 0.85 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            },
          ]}
          onPress={handleRestart}
        >
          <Ionicons name="refresh" size={18} color="#fff" />
          <Text style={styles.restartText}>Recommencer le diagnostic</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  heroHeader: {
    paddingHorizontal: 24,
    paddingBottom: 28,
    alignItems: 'center',
    gap: 10,
    overflow: 'hidden',
  },
  decorCircle: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 35,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  heroTitle: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  scoreCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 6,
  },
  scoreNumber: {
    fontSize: 52,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
    lineHeight: 62,
  },
  scorePercent: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
  },
  overallBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  overallLabel: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
  overallMessage: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 10,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  listContainer: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginBottom: 2,
  },
  sectionHint: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  summaryBox: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    gap: 12,
    marginTop: 4,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryTitle: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  summaryText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 14,
    borderTopWidth: 1,
  },
  restartBtn: {
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#3B7D6E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  restartText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
  },
});
