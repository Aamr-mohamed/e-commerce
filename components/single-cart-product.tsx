import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface SingleCartProductProps {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleRemove: () => void;
}
export default function SingleCartProduct({
  id,
  title,
  price,
  image,
  quantity,
  handleIncrement,
  handleDecrement,
  handleRemove,
}: SingleCartProductProps) {
  return (
    <View className="bg-white rounded-2xl p-4 flex-row items-center mx-4">
      <Image
        source={{ uri: image }}
        className="w-14 h-14 rounded-xl bg-gray-100"
        resizeMode="contain"
      />

      <View className="flex-1 ml-4">
        <Text className="font-semibold" numberOfLines={2}>
          {title}
        </Text>

        <Text className="text-sm mt-1">
          ${price} × {quantity}
        </Text>

        <View className="flex-row items-center gap-3 mt-2">
          <TouchableOpacity
            onPress={handleDecrement}
            className="px-3 py-1 rounded-lg bg-gray-200"
          >
            <Text>−</Text>
          </TouchableOpacity>

          <Text className="font-semibold">{quantity}</Text>

          <TouchableOpacity
            onPress={handleIncrement}
            className="px-3 py-1 rounded-lg bg-green-300"
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={handleRemove} className="ml-2">
        <Text className="text-red-500 text-sm">Remove</Text>
      </TouchableOpacity>
    </View>
  );
}
