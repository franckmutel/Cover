import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { ProgressBar } from '@/components/ProgressBar';
import type { ThemeResult } from '@/context/SurveyContext';

type ThemeResultCardProps = {
  result: ThemeResult;
  delay?: number;
};

export function ThemeResultCard({ result }: ThemeResultCardProps) {
  const colors = useColors();
  const [expanded, setExpanded] = useState(false);

  const { name, iconName, color, percentage, recommendation } = result;

  return (
    <Pressable
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => setExpanded((v) => !v)}
    >
      <View style={styles.header}>
        <View style={[styles.iconBadge, { backgroundColor: color + '20' }]}>
          <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={22} color={color} />
        </View>
        <View style={styles.titleArea}>
          <Text style={[styles.themeName, { color: colors.foreground }]}>{name}</Text>
          <View style={[styles.labelBadge, { backgroundColor: recommendation.color + '20' }]}>
            <Text style={[styles.labelText, { color: recommendation.color }]}>{recommendation.label}</Text>
          </View>
        </View>
        <Text style={[styles.percentage, { color }]}>{percentage}%</Text>
      </View>

      <View style={styles.barContainer}>
        <ProgressBar progress={percentage / 100} color={color} height={10} />
      </View>

      {expanded && (
        <View style={[styles.recommendationBox, { backgroundColor: color + '10', borderColor: color + '30' }]}>
          <Ionicons name="bulb-outline" size={16} color={color} style={styles.bulbIcon} />
          <Text style={[styles.recommendationText, { color: colors.foreground }]}>{recommendation.text}</Text>
        </View>
      )}

      <View style={styles.tapHint}>
        <Text style={[styles.tapHintText, { color: colors.mutedForeground }]}>
          {expanded ? 'Masquer le conseil' : 'Voir le conseil personnalisé'}
        </Text>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={14}
          color={colors.mutedForeground}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleArea: {
    flex: 1,
    gap: 4,
  },
  themeName: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
  },
  labelBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  labelText: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  percentage: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
  },
  barContainer: {
    width: '100%',
  },
  recommendationBox: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  bulbIcon: {
    marginTop: 2,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 21,
  },
  tapHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingTop: 4,
  },
  tapHintText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
});
