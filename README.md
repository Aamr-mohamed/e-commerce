# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## 📁 Project Structure

```text
├── app
│   ├── _layout.tsx
│   ├── globals.css
│   ├── index.tsx
│   ├── product
│   │   └── index.tsx
│   ├── cart
│   │   └── index.tsx
├── components
│   ├── animated-add-button
│   ├── cart-footer
│   ├── empty-state
│   ├── header
│   ├── product-card
│   └── single-cart-product
├── store
│   ├── cart.ts
│   └── product-context.tsx
├── hooks
│   ├── api.ts
├── utils
│   └── toast.ts
└── package.json
```

## 📦 Libraries Used

- `@react-native-async-storage/async-storage`
- `react-native-reanimated`
- `react-native-toast-message`
- `nativewind`
- `@react-navigation/native`
- `@react-navigation/native-stack`
