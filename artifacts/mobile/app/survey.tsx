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
import { ALL_QUESTIONS, THEMES } from '@/data/questions';
import { ProgressBar } from '@/components/ProgressBar';
import { QuestionCard } from '@/components/QuestionCard';
import * as Haptics from 'expo-haptics';

export default function SurveyScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    currentQuestionIndex,
    currentAnswer,
    setAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    completeSurvey,
    totalQuestions,
    totalAnswered,
  } = useSurvey();

  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const question = ALL_QUESTIONS[currentQuestionIndex];
  const currentTheme = question ? THEMES.find((t) => t.id === question.themeId) : undefined;

  const questionNumber = currentQuestionIndex + 1;
  const themeIndex = currentTheme ? THEMES.findIndex((t) => t.id === currentTheme.id) : 0;
  const questionsInTheme = currentTheme ? currentTheme.questions : [];
  const questionIndexInTheme = questionsInTheme.findIndex((q) => q.id === question?.id);

  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === totalQuestions - 1;
  const canGoNext = currentAnswer !== undefined;

  const progress = totalAnswered / totalQuestions;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacityAnim, { toValue: 0, duration: 80, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  }, [currentQuestionIndex]);

  const handleNext = () => {
    if (!canGoNext) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (isLast) {
      completeSurvey();
      router.replace('/results');
    } else {
      goToNextQuestion();
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      Haptics.selectionAsync();
      goToPreviousQuestion();
    }
  };

  const handleClose = () => {
    router.back();
  };

  if (!question || !currentTheme) return null;

  const topPadding = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPadding = Platform.OS === 'web' ? 34 : insets.bottom;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: topPadding + 8,
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <Pressable onPress={handleClose} style={styles.closeBtn} hitSlop={12}>
          <Ionicons name="close" size={22} color={colors.mutedForeground} />
        </Pressable>

        <View style={styles.headerCenter}>
          <Text style={[styles.headerTheme, { color: currentTheme.color }]}>
            {currentTheme.name}
          </Text>
          <Text style={[styles.headerCount, { color: colors.mutedForeground }]}>
            Question {questionNumber} / {totalQuestions}
          </Text>
        </View>

        <View style={[styles.themeCounter, { backgroundColor: currentTheme.color + '18' }]}>
          <Text style={[styles.themeCounterText, { color: currentTheme.color }]}>
            {themeIndex + 1}/5
          </Text>
        </View>
      </View>

      {/* Overall progress */}
      <View style={[styles.progressContainer, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <ProgressBar progress={progress} color={currentTheme.color} height={5} />
        <View style={styles.progressLabels}>
          <View style={styles.stepDots}>
            {THEMES.map((theme, idx) => (
              <View
                key={theme.id}
                style={[
                  styles.stepDot,
                  {
                    backgroundColor: idx <= themeIndex ? theme.color : colors.muted,
                    width: idx === themeIndex ? 20 : 8,
                  },
                ]}
              />
            ))}
          </View>
          <Text style={[styles.progressLabel, { color: colors.mutedForeground }]}>
            {Math.round(progress * 100)}% complété
          </Text>
        </View>
      </View>

      {/* Theme header pill */}
      <View style={[styles.themePill, { backgroundColor: currentTheme.color + '15' }]}>
        <Ionicons name={currentTheme.iconName as keyof typeof Ionicons.glyphMap} size={16} color={currentTheme.color} />
        <Text style={[styles.themePillText, { color: currentTheme.color }]}>
          {currentTheme.name} · Question {questionIndexInTheme + 1}/6
        </Text>
      </View>

      {/* Question */}
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomPadding + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: opacityAnim }}>
          <QuestionCard
            questionText={question.text}
            selectedScore={currentAnswer}
            onSelectScore={(score) => setAnswer(currentQuestionIndex, score)}
            themeColor={currentTheme.color}
          />
        </Animated.View>
      </ScrollView>

      {/* Navigation */}
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
            styles.navButton,
            styles.navBack,
            {
              backgroundColor: colors.secondary,
              opacity: isFirst ? 0.4 : pressed ? 0.7 : 1,
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
            styles.navButton,
            styles.navNext,
            {
              backgroundColor: canGoNext ? currentTheme.color : colors.muted,
              opacity: pressed ? 0.85 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            },
          ]}
          onPress={handleNext}
          disabled={!canGoNext}
        >
          <Text style={[styles.navNextText, { color: canGoNext ? '#fff' : colors.mutedForeground }]}>
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
  root: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    gap: 12,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  headerTheme: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
  },
  headerCount: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  themeCounter: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  themeCounterText: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    gap: 8,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepDots: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  stepDot: {
    height: 8,
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
  },
  themePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  themePillText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  content: {
    padding: 20,
    gap: 16,
    paddingTop: 12,
  },
  navBar: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  navButton: {
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navBack: {
    flex: 0,
    paddingHorizontal: 16,
  },
  navBackText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  navNext: {
    flex: 1,
    justifyContent: 'center',
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
