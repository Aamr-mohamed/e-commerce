module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["@testing-library/jest-native"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-navigation|nativewind)/)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};
