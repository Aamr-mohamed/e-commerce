import React, { createContext, useContext, useState } from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

interface SelectedProductContextType {
  product: Product | null;
  setProduct: (product: Product) => void;
  clearProduct: () => void;
}

const SelectedProductContext = createContext<SelectedProductContextType | null>(
  null,
);

export const SelectedProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [product, setProductState] = useState<Product | null>(null);

  const setProduct = (product: Product) => setProductState(product);
  const clearProduct = () => setProductState(null);

  return (
    <SelectedProductContext.Provider
      value={{ product, setProduct, clearProduct }}
    >
      {children}
    </SelectedProductContext.Provider>
  );
};

export const useSelectedProduct = () => {
  const context = useContext(SelectedProductContext);
  if (!context) {
    throw new Error(
      "useSelectedProduct must be used within SelectedProductProvider",
    );
  }
  return context;
};
