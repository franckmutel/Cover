import React from 'react';
import {
  Image,
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
import { getQuizzesByCategory } from '@/data/specificQuizzes';
import * as Haptics from 'expo-haptics';

// Thumbnail images — require() calls must be in a component file for Metro.
// Keys match quiz IDs from specificQuizzes.ts.
const QUIZ_THUMBS: Record<number, any> = {
  1:  require('@/assets/images/quiz-covers/cover1_1.jpg'),
  2:  require('@/assets/images/quiz-covers/cover1_2.jpg'),
  3:  require('@/assets/images/quiz-covers/cover1_3.jpg'),
  4:  require('@/assets/images/quiz-covers/cover1_4.jpg'),
  5:  require('@/assets/images/quiz-covers/cover2_1.jpg'),
  6:  require('@/assets/images/quiz-covers/cover2_2.jpg'),
  7:  require('@/assets/images/quiz-covers/cover3_1.jpg'),
  8:  require('@/assets/images/quiz-covers/cover3_2.jpg'),
  9:  require('@/assets/images/quiz-covers/cover3_3.jpg'),
  10: require('@/assets/images/quiz-covers/cover4_1.jpg'),
  11: require('@/assets/images/quiz-covers/cover4_2.jpg'),
  12: require('@/assets/images/quiz-covers/cover5_1.jpg'),
};

const QUIZ_SECTIONS = getQuizzesByCategory();

export default function WelcomeScreen() {
  const colors  = useColors();
  const router  = useRouter();
  const insets  = useSafeAreaInsets();
  const { resetSurvey } = useSurvey();

  const topPadding    = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPadding = Platform.OS === 'web' ? 34 : insets.bottom;

  const handleQuiz = (quizId: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({ pathname: '/quiz/[themeId]', params: { themeId: String(quizId) } });
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
        <Text style={styles.heroSub}>Choisissez votre quiz{'\n'}et obtenez une analyse personnalisée</Text>
      </View>

      {/* White card */}
      <View style={[styles.card, { backgroundColor: colors.background }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.cardContent, { paddingBottom: bottomPadding + 24 }]}
        >
          {/* ── Quiz sections by category ── */}
          {QUIZ_SECTIONS.map(({ category, quizzes }) => (
            <View key={category} style={styles.section}>
              {/* Section header */}
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{category}</Text>
                <Text style={[styles.sectionMeta, { color: colors.mutedForeground }]}>
                  {quizzes.length} quiz{quizzes.length > 1 ? 'zes' : ''}
                </Text>
              </View>

              {/* Quiz cards */}
              {quizzes.map((quiz) => (
                <Pressable
                  key={quiz.id}
                  style={({ pressed }) => [
                    styles.quizCard,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                      opacity: pressed ? 0.88 : 1,
                      transform: [{ scale: pressed ? 0.985 : 1 }],
                    },
                  ]}
                  onPress={() => handleQuiz(quiz.id)}
                >
                  {/* Thumbnail */}
                  <View style={[styles.thumbWrap, { borderColor: quiz.color + '40' }]}>
                    {QUIZ_THUMBS[quiz.id] ? (
                      <Image
                        source={QUIZ_THUMBS[quiz.id]}
                        style={styles.thumb}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={[styles.thumbFallback, { backgroundColor: quiz.color + '20' }]}>
                        <Ionicons
                          name={quiz.iconName as keyof typeof Ionicons.glyphMap}
                          size={22}
                          color={quiz.color}
                        />
                      </View>
                    )}
                  </View>

                  {/* Text */}
                  <View style={styles.quizInfo}>
                    <Text style={[styles.quizTitle, { color: colors.foreground }]}>{quiz.title}</Text>
                    {quiz.subtitle ? (
                      <Text style={[styles.quizSubtitle, { color: quiz.color }]}>{quiz.subtitle}</Text>
                    ) : null}
                    <Text style={[styles.quizMeta, { color: colors.mutedForeground }]}>
                      30 questions · ~15 min
                    </Text>
                  </View>

                  {/* Arrow */}
                  <View style={[styles.arrowWrap, { backgroundColor: quiz.color + '15' }]}>
                    <Ionicons name="chevron-forward" size={16} color={quiz.color} />
                  </View>
                </Pressable>
              ))}
            </View>
          ))}

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
    position: 'absolute', top: -60, right: -60, width: 200, height: 200,
    borderRadius: 100, borderWidth: 32, borderColor: 'rgba(255,255,255,0.10)',
  },
  circleBottomLeft: {
    position: 'absolute', bottom: 220, left: -50, width: 160, height: 160,
    borderRadius: 80, borderWidth: 25, borderColor: 'rgba(255,255,255,0.07)',
  },
  hero: {
    alignItems: 'center', paddingHorizontal: 28, paddingBottom: 28, gap: 10,
  },
  logoCircle: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center', justifyContent: 'center',
  },
  heroTitle: {
    fontSize: 30, fontFamily: 'Inter_700Bold', color: '#fff', letterSpacing: -0.5,
  },
  heroSub: {
    fontSize: 14, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.78)',
    textAlign: 'center', lineHeight: 21,
  },
  card: {
    flex: 1, borderTopLeftRadius: 28, borderTopRightRadius: 28,
    shadowColor: '#000', shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08, shadowRadius: 16, elevation: 8,
  },
  cardContent: { paddingHorizontal: 20, paddingTop: 24, gap: 0 },

  // ── Sections ─────────────────────────────────────────────────
  section: { marginBottom: 20 },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  sectionMeta: { fontSize: 12, fontFamily: 'Inter_400Regular' },

  // ── Quiz card ─────────────────────────────────────────────────
  quizCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderRadius: 16, borderWidth: 1, padding: 12, marginBottom: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 1,
  },
  thumbWrap: {
    width: 64, height: 64, borderRadius: 12, overflow: 'hidden',
    borderWidth: 1.5,
  },
  thumb: { width: 64, height: 64 },
  thumbFallback: {
    width: 64, height: 64, alignItems: 'center', justifyContent: 'center',
  },
  quizInfo: { flex: 1, gap: 2 },
  quizTitle: { fontSize: 13, fontFamily: 'Inter_700Bold', lineHeight: 18 },
  quizSubtitle: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
  quizMeta: { fontSize: 11, fontFamily: 'Inter_400Regular', marginTop: 2 },
  arrowWrap: {
    width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
  },

  // ── Divider ───────────────────────────────────────────────────
  divider: {
    flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 16,
  },
  dividerLine: { flex: 1, height: 1 },
  dividerText: {
    fontSize: 12, fontFamily: 'Inter_400Regular', paddingHorizontal: 8,
  },

  // ── Full diagnostic ───────────────────────────────────────────
  fullBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderRadius: 18, padding: 18, gap: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15, shadowRadius: 8, elevation: 3,
  },
  fullBtnLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  fullBtnTitle: { fontSize: 15, fontFamily: 'Inter_700Bold', color: '#fff' },
  fullBtnSub: { fontSize: 12, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.75)' },

  // ── Info note ─────────────────────────────────────────────────
  infoBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    borderRadius: 12, borderWidth: 1, padding: 14, marginTop: 12,
  },
  infoText: { flex: 1, fontSize: 12, fontFamily: 'Inter_400Regular', lineHeight: 18 },
});
