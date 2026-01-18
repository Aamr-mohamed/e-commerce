import Header from "@/components/header";
import { addToCart, decrementItem, getCart, incrementItem } from "@/store/cart";
import { useSelectedProduct } from "@/store/product-context";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const ProductDetails = () => {
  const { product } = useSelectedProduct();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const loadQuantity = async () => {
      const cart = await getCart();
      const item = cart.find((i) => i.id === product?.id);
      setQuantity(item?.quantity || 0);
    };

    loadQuantity();
  }, [product?.id]);

  if (!product) return null;

  return (
    <View className="flex-1 bg-white">
      <Header
        leftIcon="Back"
        title="Product"
        onPressLeft={() => router.back()}
        rightString=""
      />

      {/* Scrollable content */}
      <ScrollView className="flex-1 px-4">
        <Image
          source={{ uri: product.image }}
          className="h-60 mt-4"
          resizeMode="contain"
        />

        <Text className="text-xl font-bold mt-4">{product.title}</Text>
        <Text className="text-sm font-normal text-gray-500 mt-2">
          {product.description}
        </Text>
        <Text className="text-lg mt-4">${product.price}</Text>

        {/* add extra space to avoid content hidden behind footer */}
        <View className="h-32" />
      </ScrollView>

      {/* Fixed Footer */}
      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200">
        {quantity === 0 ? (
          <TouchableOpacity
            onPress={async () => {
              await addToCart(product);
              setQuantity(1);
            }}
            className="bg-green-300 p-4 rounded-xl"
          >
            <Text className="text-center font-bold">Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-4">
              <TouchableOpacity
                onPress={async () => {
                  await decrementItem(product.id);
                  setQuantity((q) => q - 1);
                }}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                <Text>−</Text>
              </TouchableOpacity>

              <Text className="text-lg font-semibold">{quantity}</Text>

              <TouchableOpacity
                onPress={async () => {
                  await incrementItem(product.id);
                  setQuantity((q) => q + 1);
                }}
                className="px-4 py-2 bg-green-300 rounded-lg"
              >
                <Text>+</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-lg font-bold">
              ${(product.price * quantity).toFixed(2)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProductDetails;
