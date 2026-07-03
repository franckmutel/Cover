import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useColors } from '@/hooks/useColors';

type ProgressBarProps = {
  progress: number; // 0 to 1
  color?: string;
  height?: number;
  backgroundColor?: string;
  borderRadius?: number;
};

export function ProgressBar({
  progress,
  color,
  height = 8,
  backgroundColor,
  borderRadius,
}: ProgressBarProps) {
  const colors = useColors();
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: Math.max(0, Math.min(1, progress)),
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const br = borderRadius ?? height / 2;

  return (
    <View
      style={[
        styles.track,
        {
          height,
          borderRadius: br,
          backgroundColor: backgroundColor ?? colors.muted,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.fill,
          {
            backgroundColor: color ?? colors.primary,
            borderRadius: br,
            width: animValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    height: '100%',
  },
});
