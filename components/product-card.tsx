import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  onAddToCartPress: () => void;
  handleIncrement: () => void;
  handleDecrement: () => void;
  onCardPress: () => void;
}

const ProductCard = ({
  id,
  title,
  price,
  image,
  quantity,
  onAddToCartPress,
  handleIncrement,
  handleDecrement,
  onCardPress,
}: ProductCardProps) => {
  return (
    <TouchableOpacity
      onPress={onCardPress}
      className="bg-white rounded-2xl p-4 flex-row items-center"
    >
      <Image
        source={{ uri: image }}
        className="w-16 h-16 rounded-xl bg-gray-100"
        resizeMode="contain"
      />

      <View className="flex-1 ml-4">
        <Text className="text-base font-semibold" numberOfLines={2}>
          {title}
        </Text>
        <Text className="text-sm font-medium mt-1">${price}</Text>
      </View>

      {quantity === 0 ? (
        <TouchableOpacity
          onPress={onAddToCartPress}
          className="p-2 rounded-xl bg-green-300"
        >
          <Text>Add To Cart</Text>
        </TouchableOpacity>
      ) : (
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={handleDecrement}
            className="px-3 py-1 rounded-lg bg-gray-200"
          >
            <Text className="text-lg">−</Text>
          </TouchableOpacity>

          <Text className="font-semibold">{quantity}</Text>

          <TouchableOpacity
            onPress={handleIncrement}
            className="px-3 py-1 rounded-lg bg-green-300"
          >
            <Text className="text-lg">+</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ProductCard;
