import {
  clearCart,
  decrementItem,
  getCart,
  incrementItem,
  removeItem,
} from "@/store/cart";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const loadCart = async () => {
    const data = await getCart();
    setCart(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, []),
  );

  const handleIncrement = async (id: number) => {
    await incrementItem(id);
    loadCart();
  };

  const handleDecrement = async (id: number) => {
    await decrementItem(id);
    loadCart();
  };

  const handleRemove = async (id: number) => {
    await removeItem(id);
    loadCart();
  };

  const handleClearCart = async () => {
    await clearCart();
    setCart([]);
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <SafeAreaView className="bg-white">
        <View className="h-16 flex-row items-center justify-between px-4 border-b border-gray-100">
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
            className="bg-gray-200 px-3 py-2 rounded-xl"
          >
            <Text className="text-sm font-bold">Back</Text>
          </TouchableOpacity>

          <Text className="text-xl text-center font-bold">Product</Text>
          <View className="w-16" />
        </View>
      </SafeAreaView>

      {cart.length === 0 ? (
        <View className="flex-1 justify-center items-center bg-white">
          <Text className="text-lg font-semibold">Your cart is empty 🛒</Text>

          <TouchableOpacity
            onPress={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-green-300 rounded-xl"
          >
            <Text>Go to Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View className="h-4" />}
            renderItem={({ item }) => (
              <View className="bg-white rounded-2xl p-4 flex-row items-center">
                <Image
                  source={{ uri: item.image }}
                  className="w-14 h-14 rounded-xl bg-gray-100"
                  resizeMode="contain"
                />

                <View className="flex-1 ml-4">
                  <Text className="font-semibold" numberOfLines={2}>
                    {item.title}
                  </Text>

                  <Text className="text-sm mt-1">
                    ${item.price} × {item.quantity}
                  </Text>

                  <View className="flex-row items-center gap-3 mt-2">
                    <TouchableOpacity
                      onPress={() => handleDecrement(item.id)}
                      className="px-3 py-1 rounded-lg bg-gray-200"
                    >
                      <Text>−</Text>
                    </TouchableOpacity>

                    <Text className="font-semibold">{item.quantity}</Text>

                    <TouchableOpacity
                      onPress={() => handleIncrement(item.id)}
                      className="px-3 py-1 rounded-lg bg-green-300"
                    >
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => handleRemove(item.id)}
                  className="ml-2"
                >
                  <Text className="text-red-500 text-sm">Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Footer */}
          <View className="mt-4 p-4 bg-white rounded-2xl">
            <Text className="text-lg font-bold">
              Total: ${totalPrice.toFixed(2)}
            </Text>

            <TouchableOpacity
              onPress={handleClearCart}
              className="mt-3 p-3 rounded-xl bg-red-100"
            >
              <Text className="text-center text-red-600">Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Cart;
