import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface Props {
  onPress: () => void;
  label: string;
}

const AnimatedAddButton = ({ onPress, label }: Props) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withTiming(1.15, { duration: 120 }),
      withTiming(1, { duration: 120 }),
    );

    onPress();
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={handlePress}
        className="bg-green-500 p-3 rounded-xl shadow"
      >
        <Text className="text-center text-white font-bold">{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AnimatedAddButton;
