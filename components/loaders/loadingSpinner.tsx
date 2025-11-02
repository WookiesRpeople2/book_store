import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';

export const LoadingSpinner = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => spin());
    };
    spin();
  }, [spinValue]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <Animated.View
        style={{ transform: [{ rotate }] }}
        className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full"
      />
      <View className="mt-4">
        <View className="text-gray-600 text-base font-medium">Loading...</View>
      </View>
    </View>
  );
};
