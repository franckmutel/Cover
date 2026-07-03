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
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { MAX_SCORE_PER_THEME, THEMES, getRecommendation } from '@/data/questions';
import { ProgressBar } from '@/components/ProgressBar';
import * as Haptics from 'expo-haptics';

const SCORE_THRESHOLDS = [
  { max: 40, emoji: 'cloud-outline', label: 'En développement' },
  { max: 70, emoji: 'partly-sunny-outline', label: 'En progression' },
  { max: 101, emoji: 'sunny-outline', label: 'Épanouissant' },
] as const;

export default function ThemeQuizResultsScreen() {
  const { themeId, score } = useLocalSearchParams<{ themeId: string; score: string }>();
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const theme = THEMES.find((t) => t.id === Number(themeId));
  const scoreNum = Number(score ?? '0');
  const percentage = theme ? Math.round((scoreNum / MAX_SCORE_PER_THEME) * 100) : 0;
  const recommendation = theme ? getRecommendation(theme.id, percentage) : null;
  const tier = SCORE_THRESHOLDS.find((t) => percentage < t.max) ?? SCORE_THRESHOLDS[2];

  const scoreAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!theme) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Animated.parallel([
      Animated.timing(scoreAnim, {
        toValue: percentage,
        duration: 1100,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, [theme]);

  if (!theme || !recommendation) {
    return (
      <View style={[styles.root, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.foreground }}>Résultat introuvable.</Text>
      </View>
    );
  }

  const topPadding = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPadding = Platform.OS === 'web' ? 34 : insets.bottom;

  const handleRetryTheme = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace({
      pathname: '/quiz/[themeId]',
      params: { themeId: String(theme.id) },
    });
  };

  const handleOtherTheme = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace('/');
  };

  const handleFullDiagnostic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.replace('/survey');
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Hero header with theme color */}
      <View
        style={[
          styles.hero,
          {
            backgroundColor: theme.color,
            paddingTop: topPadding + 12,
          },
        ]}
      >
        {/* Decorative circle */}
        <View style={[styles.decorCircle, { borderColor: 'rgba(255,255,255,0.12)' }]} />

        {/* Theme badge */}
        <View style={styles.themeBadge}>
          <Ionicons
            name={theme.iconName as keyof typeof Ionicons.glyphMap}
            size={16}
            color="rgba(255,255,255,0.9)"
          />
          <Text style={styles.themeBadgeText}>{theme.name}</Text>
        </View>

        <Text style={styles.heroTitle}>Votre résultat</Text>

        {/* Animated score circle */}
        <View style={[styles.scoreCircle, { borderColor: 'rgba(255,255,255,0.35)' }]}>
          <Animated.Text style={styles.scoreNum}>
            {scoreAnim.interpolate({
              inputRange: [0, percentage],
              outputRange: ['0', `${percentage}`],
              extrapolate: 'clamp',
            })}
          </Animated.Text>
          <Text style={styles.scorePercent}>%</Text>
        </View>

        {/* Tier badge */}
        <View style={[styles.tierBadge, { backgroundColor: 'rgba(255,255,255,0.20)' }]}>
          <Ionicons name={tier.emoji} size={15} color="#fff" />
          <Text style={styles.tierText}>{tier.label}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomPadding + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.body, { opacity: fadeAnim }]}>
          {/* Progress bar card */}
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: colors.foreground }]}>Score détaillé</Text>
              <Text style={[styles.scoreRaw, { color: theme.color }]}>
                {scoreNum} / {MAX_SCORE_PER_THEME} pts
              </Text>
            </View>
            <ProgressBar progress={percentage / 100} color={theme.color} height={12} borderRadius={6} />
            <View style={styles.scaleLabels}>
              <Text style={[styles.scaleLabel, { color: colors.mutedForeground }]}>0%</Text>
              <Text style={[styles.scaleLabel, { color: colors.mutedForeground }]}>50%</Text>
              <Text style={[styles.scaleLabel, { color: colors.mutedForeground }]}>100%</Text>
            </View>
          </View>

          {/* Recommendation */}
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: theme.color + '40' }]}>
            <View style={styles.recHeader}>
              <View style={[styles.recIconWrap, { backgroundColor: theme.color + '18' }]}>
                <Ionicons name="bulb" size={18} color={theme.color} />
              </View>
              <Text style={[styles.recTitle, { color: colors.foreground }]}>Conseil personnalisé</Text>
              <View style={[styles.recLabelBadge, { backgroundColor: recommendation.color + '20' }]}>
                <Text style={[styles.recLabelText, { color: recommendation.color }]}>
                  {recommendation.label}
                </Text>
              </View>
            </View>
            <Text style={[styles.recText, { color: colors.foreground }]}>{recommendation.text}</Text>
          </View>

          {/* Score legend */}
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.cardTitle, { color: colors.foreground, marginBottom: 10 }]}>
              Échelle de référence
            </Text>
            {[
              { range: '0 – 39%', label: 'À travailler', color: '#E57373' },
              { range: '40 – 69%', label: 'En progression', color: '#FFB74D' },
              { range: '70 – 100%', label: 'Épanouissant', color: '#81C784' },
            ].map((item) => (
              <View key={item.label} style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                <Text style={[styles.legendRange, { color: colors.mutedForeground }]}>{item.range}</Text>
                <Text style={[styles.legendLabel, { color: colors.foreground }]}>{item.label}</Text>
              </View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom actions */}
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
        <View style={styles.bottomRow}>
          <Pressable
            style={({ pressed }) => [
              styles.secondaryBtn,
              { backgroundColor: colors.secondary, borderColor: colors.border, opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={handleRetryTheme}
          >
            <Ionicons name="refresh" size={16} color={colors.primary} />
            <Text style={[styles.secondaryBtnText, { color: colors.primary }]}>Réessayer</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryBtn,
              { backgroundColor: colors.secondary, borderColor: colors.border, opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={handleOtherTheme}
          >
            <Ionicons name="apps-outline" size={16} color={colors.primary} />
            <Text style={[styles.secondaryBtnText, { color: colors.primary }]}>Autre thème</Text>
          </Pressable>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.primaryBtn,
            {
              backgroundColor: colors.primary,
              opacity: pressed ? 0.88 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            },
          ]}
          onPress={handleFullDiagnostic}
        >
          <Ionicons name="albums-outline" size={18} color="#fff" />
          <Text style={styles.primaryBtnText}>Diagnostic complet</Text>
          <Text style={styles.primaryBtnSub}>(30 questions)</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  hero: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 10,
    overflow: 'hidden',
  },
  decorCircle: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 28,
  },
  themeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.20)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  themeBadgeText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
  },
  heroTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 4,
  },
  scoreNum: {
    fontSize: 46,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    lineHeight: 56,
  },
  scorePercent: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  tierText: {
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
  },
  content: {
    padding: 16,
    gap: 12,
  },
  body: {
    gap: 12,
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
  },
  scoreRaw: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
  scaleLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scaleLabel: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
  recHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  recIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recTitle: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
  },
  recLabelBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  recLabelText: {
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  recText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 22,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 4,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendRange: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    width: 90,
  },
  legendLabel: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    gap: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    gap: 10,
  },
  secondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 12,
  },
  secondaryBtnText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  primaryBtn: {
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#3B7D6E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryBtnText: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
  },
  primaryBtnSub: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.75)',
  },
});
