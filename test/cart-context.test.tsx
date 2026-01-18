import {
  addToCart,
  clearCart,
  decrementItem,
  getCart,
  incrementItem,
} from "../store/cart";

const sampleProduct = {
  id: 1,
  title: "Test Product",
  price: 9.99,
  image: "test.png",
  description: "A test product",
};

const secondProduct = {
  id: 2,
  title: "Second Product",
  price: 19.99,
  image: "test2.png",
  description: "Another product",
};

beforeEach(async () => {
  await clearCart();
});

describe("Cart store - edge cases", () => {
  it("adds multiple items and keeps them separate", async () => {
    await addToCart(sampleProduct);
    await addToCart(secondProduct);

    const cart = await getCart();

    expect(cart.length).toBe(2);
    expect(cart.find((x) => x.id === 1)?.quantity).toBe(1);
    expect(cart.find((x) => x.id === 2)?.quantity).toBe(1);
  });

  it("increments the correct item only", async () => {
    await addToCart(sampleProduct);
    await addToCart(secondProduct);

    await incrementItem(2);

    const cart = await getCart();

    expect(cart.find((x) => x.id === 1)?.quantity).toBe(1);
    expect(cart.find((x) => x.id === 2)?.quantity).toBe(2);
  });

  it("decrements correctly and removes item at 0 quantity", async () => {
    await addToCart(sampleProduct);
    await incrementItem(1); // quantity becomes 2

    await decrementItem(1); // quantity becomes 1
    await decrementItem(1); // quantity becomes 0 => removed

    const cart = await getCart();

    expect(cart.length).toBe(0);
  });

  it("clears the cart", async () => {
    await addToCart(sampleProduct);
    await addToCart(secondProduct);

    await clearCart();

    const cart = await getCart();
    expect(cart.length).toBe(0);
  });
});
