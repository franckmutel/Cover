import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { THEMES } from '@/data/questions';
import type { QuizCover, QuizCoversMap } from '@/data/quizCovers';
import { ProgressBar } from '@/components/ProgressBar';
import { QuestionCard } from '@/components/QuestionCard';
import * as Haptics from 'expo-haptics';

// All require() calls must live in the component file so Metro resolves them statically.
const QUIZ_COVERS: QuizCoversMap = {
  // Bien-être Personnel — "Suis-je prêt(e) à être parent ?"
  1: [
    { image: require('@/assets/images/quiz-covers/cover1_1.jpg'), alt: 'Suis-je prête à être mère ?' },
    { image: require('@/assets/images/quiz-covers/cover1_2.jpg'), alt: 'Suis-je prêt à être père ?' },
    { image: require('@/assets/images/quiz-covers/cover1_3.jpg'), alt: 'Sommes-nous prêts à être pères ?' },
    { image: require('@/assets/images/quiz-covers/cover1_4.jpg'), alt: 'Sommes-nous prêtes à être mères ?' },
    { image: require('@/assets/images/quiz-covers/cover1_5.jpg'), alt: 'Suis-je prête à être mère ?' },
  ],
  // Relations Sociales — "Suis-je un(e) bon(ne) parent(e) ?"
  2: [
    { image: require('@/assets/images/quiz-covers/cover2_1.jpg'), alt: 'Suis-je une bonne maman ?' },
    { image: require('@/assets/images/quiz-covers/cover2_2.jpg'), alt: 'Suis-je un bon papa ?' },
  ],
  // Vie Professionnelle — "Suis-je un(e) bon(ne) collègue ?"
  3: [
    { image: require('@/assets/images/quiz-covers/cover3_1.jpg'), alt: 'Suis-je un(e) bon(ne) collègue ?' },
    { image: require('@/assets/images/quiz-covers/cover3_2.jpg'), alt: 'Suis-je un bon collègue ?' },
    { image: require('@/assets/images/quiz-covers/cover3_3.jpg'), alt: 'Suis-je une bonne collègue ?' },
  ],
  // Santé & Équilibre — "Sommes-nous prêts à avoir un animal ?"
  4: [
    { image: require('@/assets/images/quiz-covers/cover4_1.jpg'), alt: 'Sommes-nous prêts à avoir un chien ?' },
    { image: require('@/assets/images/quiz-covers/cover4_2.jpg'), alt: 'Sommes-nous prêts à avoir un chat ?' },
  ],
  // Développement Personnel — "Suis-je prêt(e) à transmettre mes valeurs ?"
  5: [
    { image: require('@/assets/images/quiz-covers/cover5_1.jpg'), alt: 'Suis-je prêt(e) à transmettre mes valeurs ?' },
  ],
};

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

type Phase = 'cover' | 'quiz';

export default function ThemeQuizScreen() {
  const { themeId } = useLocalSearchParams<{ themeId: string }>();
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const theme = THEMES.find((t) => t.id === Number(themeId));
  const covers = QUIZ_COVERS[Number(themeId)] ?? [];

  // ── Phase state ──────────────────────────────────────────────
  const [phase, setPhase] = useState<Phase>('cover');
  const phaseOpacity = useRef(new Animated.Value(1)).current;

  const switchToQuiz = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Animated.timing(phaseOpacity, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
      setPhase('quiz');
      Animated.timing(phaseOpacity, { toValue: 1, duration: 280, useNativeDriver: true }).start();
    });
  };

  // ── Quiz state ────────────────────────────────────────────────
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (phase === 'quiz') {
      Animated.sequence([
        Animated.timing(slideOpacity, { toValue: 0, duration: 80, useNativeDriver: true }),
        Animated.timing(slideOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [currentIndex]);

  // ── Android hardware back handler ─────────────────────────────
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (phase === 'quiz') {
        // Return to cover instead of exiting the screen
        setPhase('cover');
        setAnswers({});
        setCurrentIndex(0);
        return true; // intercept
      }
      return false; // let router handle it (go back to home)
    });
    return () => sub.remove();
  }, [phase]);

  // ── Gallery pagination ─────────────────────────────────────────
  const [activeSlide, setActiveSlide] = useState(0);
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setActiveSlide(viewableItems[0].index);
    }
  });

  const topPadding = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPadding = Platform.OS === 'web' ? 34 : insets.bottom;

  if (!theme) {
    return (
      <View style={[styles.root, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.foreground }}>Thème introuvable</Text>
      </View>
    );
  }

  // ── Quiz helpers ───────────────────────────────────────────────
  const questions = theme.questions;
  const totalQ = questions.length;
  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQ - 1;
  const canGoNext = currentAnswer !== undefined;
  const progress = Object.keys(answers).length / totalQ;

  const handleSelectScore = (score: number) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: score }));
  };

  const handleNext = () => {
    if (!canGoNext) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (isLast) {
      const totalScore = Object.values({ ...answers, [currentIndex]: currentAnswer! }).reduce(
        (sum, s) => sum + s,
        0
      );
      router.replace({
        pathname: '/quiz-results/[themeId]',
        params: { themeId: String(theme.id), score: String(totalScore) },
      });
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      Haptics.selectionAsync();
      setCurrentIndex((i) => i - 1);
    }
  };

  // ════════════════════════════════════════════════════════════════
  // COVER SCREEN
  // ════════════════════════════════════════════════════════════════
  if (phase === 'cover') {
    return (
      <Animated.View style={[styles.root, { backgroundColor: '#000', opacity: phaseOpacity }]}>
        {/* Image gallery — full screen */}
        {covers.length > 0 ? (
          <FlatList
            data={covers}
            keyExtractor={(_, i) => String(i)}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            initialNumToRender={1}
            windowSize={2}
            removeClippedSubviews
            onViewableItemsChanged={onViewableItemsChanged.current}
            viewabilityConfig={viewabilityConfig.current}
            renderItem={({ item }) => (
              <Image
                source={item.image}
                style={styles.coverImage}
                resizeMode="cover"
              />
            )}
          />
        ) : (
          // Fallback coloured background if no images
          <View style={[styles.coverFallback, { backgroundColor: theme.color }]} />
        )}

        {/* Dark gradient overlay at top + bottom */}
        <View style={[styles.overlayTop, { pointerEvents: 'none' }]} />
        <View style={[styles.overlayBottom, { pointerEvents: 'none' }]} />

        {/* Back button */}
        <Pressable
          onPress={() => router.back()}
          style={[styles.coverBackBtn, { top: topPadding + 8 }]}
          hitSlop={12}
        >
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </Pressable>

        {/* Bottom card */}
        <View style={[styles.coverCard, { paddingBottom: bottomPadding + 16 }]}>
          {/* Theme badge */}
          <View style={[styles.themeBadge, { backgroundColor: theme.color + 'EE' }]}>
            <Ionicons
              name={theme.iconName as keyof typeof Ionicons.glyphMap}
              size={14}
              color="#fff"
            />
            <Text style={styles.themeBadgeText}>{theme.name}</Text>
          </View>

          {/* Quiz info */}
          <Text style={styles.coverTitle}>Quiz · {totalQ} questions</Text>
          <Text style={styles.coverSub}>~{Math.ceil(totalQ * 0.5)} minutes · Résultats personnalisés</Text>

          {/* Pagination dots (only if more than 1 image) */}
          {covers.length > 1 && (
            <View style={styles.dots}>
              {covers.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    {
                      backgroundColor: i === activeSlide ? '#fff' : 'rgba(255,255,255,0.35)',
                      width: i === activeSlide ? 20 : 7,
                    },
                  ]}
                />
              ))}
            </View>
          )}

          {/* CTA */}
          <Pressable
            style={({ pressed }) => [
              styles.coverCta,
              { backgroundColor: theme.color, opacity: pressed ? 0.88 : 1 },
            ]}
            onPress={switchToQuiz}
          >
            <Text style={styles.coverCtaText}>Commencer le quiz</Text>
            <Ionicons name="arrow-forward-circle" size={20} color="#fff" />
          </Pressable>
        </View>
      </Animated.View>
    );
  }

  // ════════════════════════════════════════════════════════════════
  // QUIZ SCREEN
  // ════════════════════════════════════════════════════════════════
  return (
    <Animated.View style={[styles.root, { backgroundColor: colors.background, opacity: phaseOpacity }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: topPadding + 6,
            backgroundColor: theme.color,
          },
        ]}
      >
        <Pressable
          onPress={() => {
            setPhase('cover');
            setAnswers({});
            setCurrentIndex(0);
          }}
          style={styles.backBtn}
          hitSlop={12}
        >
          <Ionicons name="arrow-back" size={20} color="rgba(255,255,255,0.9)" />
        </Pressable>

        <View style={styles.headerCenter}>
          <View style={styles.headerTitleRow}>
            <Ionicons
              name={theme.iconName as keyof typeof Ionicons.glyphMap}
              size={16}
              color="rgba(255,255,255,0.9)"
            />
            <Text style={styles.headerTheme}>{theme.name}</Text>
          </View>
          <Text style={styles.headerCount}>
            Question {currentIndex + 1} sur {totalQ}
          </Text>
        </View>

        <View style={styles.scoreTag}>
          <Text style={styles.scoreTagText}>{currentIndex + 1}/{totalQ}</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={[styles.progressBar, { backgroundColor: theme.color + '30' }]}>
        <ProgressBar
          progress={progress}
          color={theme.color}
          height={4}
          backgroundColor={theme.color + '20'}
        />
      </View>

      {/* Question */}
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomPadding + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: slideOpacity }}>
          {currentQuestion && (
            <QuestionCard
              questionText={currentQuestion.text}
              selectedScore={currentAnswer}
              onSelectScore={handleSelectScore}
              themeColor={theme.color}
            />
          )}
        </Animated.View>
      </ScrollView>

      {/* Nav */}
      <View
        style={[
          styles.navBar,
          {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            paddingBottom: bottomPadding + 8,
          },
        ]}
      >
        <Pressable
          style={({ pressed }) => [
            styles.navBack,
            {
              backgroundColor: colors.secondary,
              opacity: isFirst ? 0.35 : pressed ? 0.7 : 1,
            },
          ]}
          onPress={handlePrev}
          disabled={isFirst}
        >
          <Ionicons name="arrow-back" size={18} color={colors.primary} />
          <Text style={[styles.navBackText, { color: colors.primary }]}>Précédent</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.navNext,
            {
              backgroundColor: canGoNext ? theme.color : colors.muted,
              opacity: pressed ? 0.85 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            },
          ]}
          onPress={handleNext}
          disabled={!canGoNext}
        >
          <Text
            style={[
              styles.navNextText,
              { color: canGoNext ? '#fff' : colors.mutedForeground },
            ]}
          >
            {isLast ? 'Voir mes résultats' : 'Question suivante'}
          </Text>
          <Ionicons
            name={isLast ? 'checkmark-circle' : 'arrow-forward'}
            size={18}
            color={canGoNext ? '#fff' : colors.mutedForeground}
          />
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

  // ── Cover ──────────────────────────────────────────────────────
  coverImage: {
    width: SCREEN_W,
    height: SCREEN_H,
  },
  coverFallback: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 140,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 340,
    backgroundColor: 'rgba(0,0,0,0.62)',
  },
  coverBackBtn: {
    position: 'absolute',
    left: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 20,
    gap: 8,
  },
  themeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 4,
  },
  themeBadgeText: {
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    letterSpacing: 0.3,
  },
  coverTitle: {
    fontSize: 26,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    lineHeight: 32,
  },
  coverSub: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.72)',
    marginBottom: 4,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginVertical: 6,
  },
  dot: {
    height: 7,
    borderRadius: 4,
  },
  coverCta: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  coverCtaText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    letterSpacing: 0.3,
  },

  // ── Quiz ───────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 14,
    gap: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTheme: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
  },
  headerCount: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.75)',
  },
  scoreTag: {
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  scoreTagText: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
  },
  progressBar: {
    paddingHorizontal: 0,
  },
  content: {
    padding: 20,
    paddingTop: 20,
  },
  navBar: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  navBack: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  navBackText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  navNext: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  navNextText: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
  },
});
