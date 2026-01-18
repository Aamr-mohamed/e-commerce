import CartFooter from "@/components/cart-footer";
import EmptyState from "@/components/empty-state";
import Header from "@/components/header";
import SingleCartProduct from "@/components/single-cart-product";
import {
  clearCart,
  decrementItem,
  getCart,
  incrementItem,
  removeItem,
} from "@/store/cart";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, View } from "react-native";

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
    <View className="flex-1 bg-gray-50 gap-4">
      <Header
        leftIcon="Back"
        title="Cart"
        onPressLeft={() => {
          router.back();
        }}
      />

      {cart.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View className="h-4" />}
            renderItem={({ item }) => (
              <SingleCartProduct
                handleDecrement={() => handleDecrement(item.id)}
                handleIncrement={() => handleIncrement(item.id)}
                handleRemove={() => handleRemove(item.id)}
                id={item.id}
                image={item.image}
                price={item.price}
                quantity={item.quantity}
                title={item.title}
                key={item.id}
              />
            )}
          />
          <CartFooter
            handleClearCart={handleClearCart}
            totalPrice={totalPrice.toFixed(2)}
          />
        </>
      )}
    </View>
  );
};

export default Cart;
