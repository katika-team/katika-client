import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function SplashAnimation({
  source,
  duration = 1000, 
  imageSize = 200,
  onAnimationEnd,
}) {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // 1. Define the single pulse (Small -> Big -> Small)
    const pulse = Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: duration / 2,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: duration / 2,
        useNativeDriver: true,
      }),
    ]);

    // 2. Loop it exactly 2 times
    const animation = Animated.loop(pulse, { iterations: 2 });
    
    animation.start(({ finished }) => {
      // 3. Trigger redirect only if the animation finished naturally
      if (finished) {
        onAnimationEnd?.();
      }
    });

    // Cleanup: Stop animation if component unmounts to prevent glitches
    return () => scaleAnim.stopAnimation();
  }, [duration, onAnimationEnd]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={source}
        style={{
            width: imageSize,
            height: imageSize,
            transform: [{ scale: scaleAnim }],
        }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});