import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = "@cart";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

export const getCart = async (): Promise<CartItem[]> => {
  const data = await AsyncStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveCart = async (cart: CartItem[]) => {
  await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = async (product: Omit<CartItem, "quantity">) => {
  const cart = await getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing && existing.quantity) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  await saveCart(cart);
};

export const incrementItem = async (id: number) => {
  const cart = await getCart();
  cart.forEach((item) => {
    if (item.id === id && item.quantity) item.quantity += 1;
  });
  await saveCart(cart);
};

export const decrementItem = async (id: number) => {
  let cart = await getCart();
  cart = cart
    .map((item) =>
      item.id === id && item.quantity
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    )
    .filter((item) => item?.quantity > 0);

  await saveCart(cart);
};

export const removeItem = async (id: number) => {
  const cart = (await getCart()).filter((item) => item.id !== id);
  await saveCart(cart);
};

export const clearCart = async () => {
  await AsyncStorage.removeItem(CART_KEY);
};
