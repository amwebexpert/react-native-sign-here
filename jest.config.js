export default {
  preset: "react-native",
  transform: {
    "^.+\\.(js|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    // on ignore node_modules sauf ceux nécessaires pour les tests
    "node_modules/(?!(react-native|@react-native|parse-svg-path|simplify-js|fast-xml-parser)/)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}",
  ],
  moduleNameMapper: {
    "^react-native$": "<rootDir>/__mocks__/react-native.js",
  },
};
