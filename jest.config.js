module.exports = {
  preset: 'react-native',
  // THIS IS CRUCIAL: Point to your jest.setup.js file
  setupFiles: ['./jest.setup.js'],

  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|react-native-reanimated|react-native-vector-icons|@react-native-async-storage|@react-native-community)/",
  ],
  moduleNameMapper: {
    // This is still useful for react-native-gesture-handler specifically
    "^react-native-gesture-handler$": "<rootDir>/__mocks__/react-native-gesture-handler.js",
  },
};