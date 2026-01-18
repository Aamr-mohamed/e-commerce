import Header from "@/components/header";
import ProductCard from "@/components/product-card";
import api from "@/hooks/api";
import {
  addToCart,
  CartItem,
  decrementItem,
  getCart,
  incrementItem,
} from "@/store/cart";
import { useSelectedProduct } from "@/store/product-context";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const Index = () => {
  const [products, setProducts] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const response = await api.get("/products");
      setProducts(response.data);
    } finally {
      setRefreshing(false);
    }
  };

  const { setProduct } = useSelectedProduct();

  const getData = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (item: CartItem) => {
    await addToCart(item);

    setQuantities((prev) => ({
      ...prev,
      [item.id]: 1,
    }));
  };

  const handleIncrement = async (id: number) => {
    await incrementItem(id);

    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = async (id: number) => {
    await decrementItem(id);

    setQuantities((prev) => {
      const newQty = (prev[id] || 0) - 1;
      if (newQty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: newQty };
    });
  };

  useFocusEffect(
    useCallback(() => {
      const loadCartQuantities = async () => {
        const cart = await getCart();

        const map: Record<number, number> = {};
        cart.forEach((item) => {
          map[item.id] = item.quantity;
        });

        setQuantities(map);
      };

      loadCartQuantities();
    }, []),
  );

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
        <Text className="mt-2 text-gray-500">Loading products...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <Header
        title="Products"
        rightString="Cart"
        onPressRight={() => router.push("/cart")}
      />

      <FlatList
        data={products}
        ItemSeparatorComponent={() => <View className="h-4" />}
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const quantity = quantities[item.id] || 0;
          return (
            <ProductCard
              handleDecrement={() => handleDecrement(item.id)}
              handleIncrement={() => handleIncrement(item.id)}
              image={item.image}
              onAddToCartPress={() => handleAdd(item)}
              onCardPress={() => {
                router.push("/product");
                setProduct(item);
              }}
              price={item.price}
              quantity={quantity}
              title={item.title}
              id={item.id}
              key={item.id}
            />
          );
        }}
      />
    </View>
  );
};

export default Index;
