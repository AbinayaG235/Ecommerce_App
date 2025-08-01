// jest.setup.js

// --- Mock AsyncStorage globally using the recommended mock ---
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// --- Mock react-native-reanimated globally ---
// This is typically handled by babel.config.js, but a mock is needed for Jest environment
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

// --- Mock react-native-gesture-handler globally ---
// This mock is needed for the 'import 'react-native-gesture-handler'' statement
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    VerticalPager: View,
    ViewPager: View,
    WebView: View,
    RNView: View,
    NativeViewGestureHandler: View,
    gestureHandlerRootHOC: (Component) => Component,
    GestureHandlerRootView: View,
    RNGestureHandlerModule: { // Mock the native module directly
        attachGestureHandler: jest.fn(),
        createGestureHandler: jest.fn(),
        dropGestureHandler: jest.fn(),
        updateGestureHandler: jest.fn(),
        setGestureHandlerState: jest.fn(),
    },
    default: View, // Some modules might need a default export mock
  };
});

// --- Mock other problematic native modules (if any, like DevMenu) ---
jest.mock('react-native', () => {
    const RN = jest.requireActual('react-native');
    return Object.defineProperty(RN, 'NativeModules', {
        enumerable: true,
        get: () => ({
            ...RN.NativeModules,
            DevMenu: { show: jest.fn(), reload: jest.fn() },
            // Add any other specific NativeModules that error out here
        }),
    });
});

// Add any global setup or custom matchers here if needed by other tests
// import '@testing-library/jest-native/extend-expect'; // If you're using this library