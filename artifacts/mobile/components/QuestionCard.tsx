import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ANSWER_OPTIONS } from '@/data/questions';
import * as Haptics from 'expo-haptics';

type QuestionCardProps = {
  questionText: string;
  selectedScore: number | undefined;
  onSelectScore: (score: number) => void;
  themeColor: string;
};

export function QuestionCard({
  questionText,
  selectedScore,
  onSelectScore,
  themeColor,
}: QuestionCardProps) {
  const colors = useColors();

  const handleSelect = (score: number) => {
    Haptics.selectionAsync();
    onSelectScore(score);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.questionBox, { borderColor: colors.border, backgroundColor: colors.card }]}>
        <Text style={[styles.questionText, { color: colors.foreground }]}>{questionText}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {ANSWER_OPTIONS.map((option) => {
          const isSelected = selectedScore === option.score;
          return (
            <Pressable
              key={option.score}
              style={({ pressed }) => [
                styles.optionButton,
                {
                  backgroundColor: isSelected ? themeColor : colors.card,
                  borderColor: isSelected ? themeColor : colors.border,
                  opacity: pressed ? 0.8 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                },
              ]}
              onPress={() => handleSelect(option.score)}
              testID={`option-${option.score}`}
            >
              <View style={[styles.scoreIndicator, { backgroundColor: isSelected ? 'rgba(255,255,255,0.3)' : colors.muted }]}>
                <Text style={[styles.scoreText, { color: isSelected ? '#fff' : colors.mutedForeground }]}>
                  {option.score}
                </Text>
              </View>
              <Text style={[styles.optionLabel, { color: isSelected ? '#fff' : colors.foreground }]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  questionBox: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  questionText: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    lineHeight: 30,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    borderRadius: 14,
    borderWidth: 1.5,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  scoreIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },
  optionLabel: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
});
