import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeaderProps {
  leftIcon?: React.ReactNode;
  title?: string;
  rightIcon?: React.ReactNode;
  rightString?: string;
  onPressRight?: () => void;
  onPressLeft?: () => void;
}
const Header = ({
  leftIcon,
  title,
  rightString,
  onPressRight,
  onPressLeft,
}: HeaderProps) => {
  return (
    <SafeAreaView className="bg-white px-4 border-b border-gray-100">
      <View className="h-16 flex-row items-center justify-between">
        {leftIcon ? (
          <TouchableOpacity
            onPress={onPressLeft}
            className="bg-gray-200 px-3 py-2 rounded-xl"
          >
            <Text className="text-sm font-bold">{leftIcon}</Text>
          </TouchableOpacity>
        ) : (
          <View className="w-16" />
        )}
        <Text className="text-xl font-bold">{title}</Text>
        {rightString ? (
          <TouchableOpacity
            onPress={onPressRight}
            className="bg-green-400 px-3 py-2 rounded-xl"
          >
            <Text className="text-sm font-bold text-white">{rightString}</Text>
          </TouchableOpacity>
        ) : (
          <View className="w-16" />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;
