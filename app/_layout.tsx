import { SelectedProductProvider } from "@/store/product-context";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import "./globals.css";

export default function RootLayout() {
  return (
    <SelectedProductProvider>
      <StatusBar hidden={true} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <Toast />
    </SelectedProductProvider>
  );
}
