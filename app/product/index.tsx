import Header from "@/components/header";
import { addToCart, decrementItem, getCart, incrementItem } from "@/store/cart";
import { useSelectedProduct } from "@/store/product-context";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
    <SafeAreaView className="flex-1 bg-white">
      <Header
        leftIcon="Back"
        title="Product"
        onPressLeft={() => router.back()}
        rightString=""
      />

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="items-center mt-4">
          <Image
            source={{ uri: product.image }}
            className="w-full h-64"
            resizeMode="contain"
          />
        </View>

        <Text className="text-2xl font-bold mt-4">{product.title}</Text>
        <Text className="text-sm text-gray-500 mt-2 leading-6">
          {product.description}
        </Text>

        <View className="mt-4">
          <Text className="text-lg font-bold">${product.price.toFixed(2)}</Text>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200">
        {quantity === 0 ? (
          <TouchableOpacity
            onPress={async () => {
              await addToCart(product);
              setQuantity(1);
            }}
            className="bg-green-500 p-4 rounded-xl shadow"
          >
            <Text className="text-center text-white font-bold">
              Add to Cart
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <TouchableOpacity
                onPress={async () => {
                  await decrementItem(product.id);
                  setQuantity((q) => Math.max(0, q - 1));
                }}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                <Text className="text-xl font-bold">−</Text>
              </TouchableOpacity>

              <Text className="text-lg font-semibold">{quantity}</Text>

              <TouchableOpacity
                onPress={async () => {
                  await incrementItem(product.id);
                  setQuantity((q) => q + 1);
                }}
                className="px-4 py-2 bg-green-500 rounded-lg"
              >
                <Text className="text-xl font-bold text-white">+</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-lg font-bold">
              ${(product.price * quantity).toFixed(2)}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;
