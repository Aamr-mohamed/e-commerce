import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CartFooterProps {
  totalPrice: string;
  handleClearCart: () => void;
}
const CartFooter = ({ totalPrice, handleClearCart }: CartFooterProps) => {
  return (
    <View className="mt-4 p-4 bg-white rounded-2xl">
      <Text className="text-lg font-bold">Total: ${totalPrice}</Text>

      <TouchableOpacity
        onPress={handleClearCart}
        className="mt-3 p-3 rounded-xl bg-red-100"
      >
        <Text className="text-center text-red-600">Clear Cart</Text>
      </TouchableOpacity>
    </View>
  );
};
export default CartFooter;
