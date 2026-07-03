import React, { useEffect, useRef, useState } from 'react';
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
import { MAX_SCORE_PER_THEME, THEMES } from '@/data/questions';
import { ProgressBar } from '@/components/ProgressBar';
import { QuestionCard } from '@/components/QuestionCard';
import * as Haptics from 'expo-haptics';

export default function ThemeQuizScreen() {
  const { themeId } = useLocalSearchParams<{ themeId: string }>();
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const theme = THEMES.find((t) => t.id === Number(themeId));

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(slideOpacity, { toValue: 0, duration: 80, useNativeDriver: true }),
      Animated.timing(slideOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  }, [currentIndex]);

  if (!theme) {
    return (
      <View style={[styles.root, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.foreground }}>Thème introuvable</Text>
      </View>
    );
  }

  const questions = theme.questions;
  const totalQ = questions.length;
  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQ - 1;
  const canGoNext = currentAnswer !== undefined;
  const progress = Object.keys(answers).length / totalQ;

  const topPadding = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPadding = Platform.OS === 'web' ? 34 : insets.bottom;

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

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
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
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={12}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
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
