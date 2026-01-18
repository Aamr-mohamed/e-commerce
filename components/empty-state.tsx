import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const EmptyState = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-lg font-semibold">Your cart is empty 🛒</Text>

      <TouchableOpacity
        onPress={() => router.push("/")}
        className="mt-4 px-4 py-2 bg-green-300 rounded-xl"
      >
        <Text>Go to Products</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyState;
