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

const FEATURES = [
  { icon: 'list-outline' as const, label: '30 questions', desc: '6 par thème' },
  { icon: 'layers-outline' as const, label: '5 thèmes', desc: 'Bien-être complet' },
  { icon: 'time-outline' as const, label: '~15 minutes', desc: 'À votre rythme' },
];

export default function WelcomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { resetSurvey, totalAnswered } = useSurvey();

  const hasProgress = totalAnswered > 0;

  const handleStart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    resetSurvey();
    router.push('/survey');
  };

  const topPadding = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPadding = Platform.OS === 'web' ? 34 : insets.bottom;

  return (
    <View style={[styles.root, { backgroundColor: colors.primary }]}>
      {/* Decorative circles */}
      <View style={[styles.circleTopRight, { borderColor: 'rgba(255,255,255,0.12)' }]} />
      <View style={[styles.circleBottomLeft, { borderColor: 'rgba(255,255,255,0.08)' }]} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: topPadding + 20 }]}>
        <View style={styles.logoRow}>
          <View style={[styles.logoCircle, { backgroundColor: 'rgba(255,255,255,0.18)' }]}>
            <Ionicons name="pulse" size={30} color="#fff" />
          </View>
        </View>
        <Text style={styles.appTitle}>Mon Diagnostic</Text>
        <Text style={styles.appSubtitle}>Évaluez votre bien-être{'\n'}en 30 questions</Text>
      </View>

      {/* White card content */}
      <View style={[styles.card, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.cardContent, { paddingBottom: bottomPadding + 24 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Feature pills */}
          <View style={styles.featuresRow}>
            {FEATURES.map((f) => (
              <View key={f.label} style={[styles.featurePill, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Ionicons name={f.icon} size={20} color={colors.primary} />
                <Text style={[styles.featureLabel, { color: colors.foreground }]}>{f.label}</Text>
                <Text style={[styles.featureDesc, { color: colors.mutedForeground }]}>{f.desc}</Text>
              </View>
            ))}
          </View>

          {/* Themes preview */}
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Les thèmes explorés</Text>
          <View style={styles.themesList}>
            {THEMES.map((theme, idx) => (
              <View key={theme.id} style={[styles.themeRow, { borderBottomColor: colors.border, borderBottomWidth: idx < THEMES.length - 1 ? 1 : 0 }]}>
                <View style={[styles.themeIconBadge, { backgroundColor: theme.color + '20' }]}>
                  <Ionicons name={theme.iconName as keyof typeof Ionicons.glyphMap} size={18} color={theme.color} />
                </View>
                <Text style={[styles.themeRowName, { color: colors.foreground }]}>{theme.name}</Text>
                <Text style={[styles.themeQCount, { color: colors.mutedForeground }]}>6 questions</Text>
              </View>
            ))}
          </View>

          {/* Description */}
          <View style={[styles.infoBox, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
            <Ionicons name="information-circle-outline" size={18} color={colors.primary} />
            <Text style={[styles.infoText, { color: colors.secondaryForeground }]}>
              Ce diagnostic est un outil de réflexion personnelle. Répondez spontanément et honnêtement pour obtenir des recommandations personnalisées.
            </Text>
          </View>

          {/* CTA Button */}
          <Pressable
            style={({ pressed }) => [
              styles.ctaButton,
              { backgroundColor: colors.primary, opacity: pressed ? 0.88 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
            ]}
            onPress={handleStart}
            testID="start-button"
          >
            <Text style={styles.ctaText}>
              {hasProgress ? 'Recommencer le diagnostic' : 'Commencer le diagnostic'}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  circleTopRight: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 40,
  },
  circleBottomLeft: {
    position: 'absolute',
    bottom: 200,
    left: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 30,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: 32,
    alignItems: 'center',
    gap: 12,
  },
  logoRow: {
    marginBottom: 4,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: 34,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  appSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.80)',
    textAlign: 'center',
    lineHeight: 24,
  },
  card: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 24,
    gap: 20,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 10,
  },
  featurePill: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    alignItems: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  featureLabel: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 4,
  },
  themesList: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5DFD8',
    backgroundColor: '#FFFFFF',
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  themeIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeRowName: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  themeQCount: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  infoBox: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 19,
  },
  ctaButton: {
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#3B7D6E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  ctaText: {
    fontSize: 17,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
  },
});
