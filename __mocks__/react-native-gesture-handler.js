const View = require('react-native/Libraries/Components/View/View');

module.exports = {
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
  ViewPager: View,
  WebView: View,
  // Common functions needed for internal linking/setup by the library
  gestureHandlerRootHOC: (Component) => Component,
  GestureHandlerRootView: View,
  // Mock native modules that cause errors if they are accessed
  NativeViewGestureHandler: View,
  // Explicitly mock RNGestureHandlerModule if still needed by the library's internal `require`
  RNGestureHandlerModule: {
      attachGestureHandler: jest.fn(),
      createGestureHandler: jest.fn(),
      dropGestureHandler: jest.fn(),
      updateGestureHandler: jest.fn(),
      setGestureHandlerState: jest.fn(),
      // Add other methods as needed if you encounter errors from this mock
  },
  // Some versions might require a mock for the default export directly
  default: View,
};