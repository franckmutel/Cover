import React from 'react';
import {
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
import { THEMES } from '@/data/questions';
import * as Haptics from 'expo-haptics';

export default function WelcomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { resetSurvey } = useSurvey();

  const topPadding = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPadding = Platform.OS === 'web' ? 34 : insets.bottom;

  const handleThemeQuiz = (themeId: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({ pathname: '/quiz/[themeId]', params: { themeId: String(themeId) } });
  };

  const handleFullDiagnostic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    resetSurvey();
    router.push('/survey');
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.primary }]}>
      {/* Decorative circles */}
      <View style={styles.circleTopRight} />
      <View style={styles.circleBottomLeft} />

      {/* Hero header */}
      <View style={[styles.hero, { paddingTop: topPadding + 16 }]}>
        <View style={styles.logoCircle}>
          <Ionicons name="pulse" size={28} color="#fff" />
        </View>
        <Text style={styles.heroTitle}>Mon Diagnostic</Text>
        <Text style={styles.heroSub}>Évaluez votre bien-être{'\n'}un thème à la fois</Text>
      </View>

      {/* White card */}
      <View style={[styles.card, { backgroundColor: colors.background }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.cardContent, { paddingBottom: bottomPadding + 24 }]}
        >
          {/* Theme quiz section */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              Choisissez un thème
            </Text>
            <Text style={[styles.sectionSub, { color: colors.mutedForeground }]}>
              6 questions · ~3 minutes
            </Text>
          </View>

          <View style={styles.themeList}>
            {THEMES.map((theme) => (
              <Pressable
                key={theme.id}
                style={({ pressed }) => [
                  styles.themeCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: theme.color + '40',
                    borderLeftColor: theme.color,
                    opacity: pressed ? 0.85 : 1,
                    transform: [{ scale: pressed ? 0.985 : 1 }],
                  },
                ]}
                onPress={() => handleThemeQuiz(theme.id)}
              >
                <View style={[styles.themeIconWrap, { backgroundColor: theme.color + '18' }]}>
                  <Ionicons
                    name={theme.iconName as keyof typeof Ionicons.glyphMap}
                    size={22}
                    color={theme.color}
                  />
                </View>

                <View style={styles.themeInfo}>
                  <Text style={[styles.themeName, { color: colors.foreground }]}>{theme.name}</Text>
                  <Text style={[styles.themeDesc, { color: colors.mutedForeground }]}>
                    6 questions
                  </Text>
                </View>

                <View style={[styles.startPill, { backgroundColor: theme.color + '18' }]}>
                  <Text style={[styles.startPillText, { color: theme.color }]}>Démarrer</Text>
                  <Ionicons name="chevron-forward" size={14} color={theme.color} />
                </View>
              </Pressable>
            ))}
          </View>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.mutedForeground, backgroundColor: colors.background }]}>
              ou
            </Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          </View>

          {/* Full diagnostic */}
          <Pressable
            style={({ pressed }) => [
              styles.fullBtn,
              {
                backgroundColor: colors.primary,
                opacity: pressed ? 0.88 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              },
            ]}
            onPress={handleFullDiagnostic}
          >
            <View style={styles.fullBtnLeft}>
              <Ionicons name="albums-outline" size={20} color="rgba(255,255,255,0.85)" />
              <View>
                <Text style={styles.fullBtnTitle}>Diagnostic complet</Text>
                <Text style={styles.fullBtnSub}>30 questions · 5 thèmes · ~15 min</Text>
              </View>
            </View>
            <Ionicons name="arrow-forward" size={18} color="rgba(255,255,255,0.8)" />
          </Pressable>

          {/* Info note */}
          <View style={[styles.infoBox, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
            <Ionicons name="information-circle-outline" size={16} color={colors.primary} />
            <Text style={[styles.infoText, { color: colors.secondaryForeground }]}>
              Répondez spontanément et honnêtement pour des recommandations personnalisées.
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  circleTopRight: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 32,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  circleBottomLeft: {
    position: 'absolute',
    bottom: 220,
    left: -50,
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 25,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  hero: {
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingBottom: 28,
    gap: 10,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: 30,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    letterSpacing: -0.5,
  },
  heroSub: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.78)',
    textAlign: 'center',
    lineHeight: 21,
  },
  card: {
    flex: 1,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 20,
    gap: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  sectionTitle: {
    fontSize: 19,
    fontFamily: 'Inter_700Bold',
  },
  sectionSub: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  themeList: {
    gap: 10,
  },
  themeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 16,
    borderWidth: 1.5,
    borderLeftWidth: 4,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  themeIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeInfo: {
    flex: 1,
    gap: 2,
  },
  themeName: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
  },
  themeDesc: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  startPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  startPillText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    paddingHorizontal: 4,
  },
  fullBtn: {
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#3B7D6E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 4,
  },
  fullBtnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  fullBtnTitle: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
  },
  fullBtnSub: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.75)',
    marginTop: 1,
  },
  infoBox: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
  },
});
