import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../src/screens/LoginScreen';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_STORAGE_KEYS } from '../src/redux/types';
import * as Navigation from '@react-navigation/native'; 


jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');


jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return Object.defineProperty(RN, 'NativeModules', {
      enumerable: true,
      get: () => ({
          ...RN.NativeModules,
          DevMenu: { show: jest.fn(), reload: jest.fn() },
          RNGestureHandlerModule: {
            attachGestureHandler: jest.fn(), createGestureHandler: jest.fn(),
            dropGestureHandler: jest.fn(), updateGestureHandler: jest.fn(),
            setGestureHandlerState: jest.fn(),
          },
      }),
  });
});
jest.spyOn(Alert, 'alert');



let mockNavigate: jest.Mock;
let mockReplace: jest.Mock;



jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate, // Assign the top-level mock
      replace: mockReplace,   // Assign the top-level mock
    }),
    CommonActions: { 
      reset: jest.fn((state) => state), // Make sure to spy/mock it if you need to assert its calls
    },
  };
});

beforeEach(() => {
  jest.clearAllMocks();
  mockNavigate = jest.fn(); 
  mockReplace = jest.fn();  
  
  (Alert.alert as jest.Mock).mockClear();
  
  if (Navigation.CommonActions.reset) {
     (Navigation.CommonActions.reset as jest.Mock).mockClear();
  }

  (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
  (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined); 
  (AsyncStorage.removeItem as jest.Mock).mockResolvedValue(undefined);
});

describe('LoginScreen', () => {
  test('renders all core elements correctly', () => {
    render(<LoginScreen />);

    expect(screen.getByText('Welcome Back!')).toBeTruthy();
    expect(screen.getByPlaceholderText('Username or Email')).toBeTruthy();
    expect(screen.getByPlaceholderText('Password')).toBeTruthy();
    expect(screen.getByText('Login')).toBeTruthy();

    expect(screen.getByText('Forgot Password?')).toBeTruthy();
    expect(screen.getByText('Sign Up')).toBeTruthy();
  });

  test('handles successful login and navigates to MainApp', async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === ASYNC_STORAGE_KEYS.USERS) {
        return Promise.resolve(JSON.stringify([{ email: 'test@example.com', password: '12345' }]));
      }
      return Promise.resolve(null);
    });

    render(<LoginScreen />);

    fireEvent.changeText(screen.getByTestId('emailInput'), 'test@example.com');
    fireEvent.changeText(screen.getByTestId('passwordInput'), '12345');
    fireEvent.press(screen.getByTestId('loginButton'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Login Success', 'Welcome back, test@example.com!');
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(ASYNC_STORAGE_KEYS.USER_TOKEN, 'dummy_Tokken');
    expect(mockNavigate).toHaveBeenCalledWith('MainApp');
    expect(Navigation.CommonActions.reset).not.toHaveBeenCalled();
  });

  test('handles failed login with invalid credentials', async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
        if (key === ASYNC_STORAGE_KEYS.USERS) {
            return Promise.resolve(JSON.stringify([])); 
        }
        return Promise.resolve(null);
    });

    render(<LoginScreen />);

    fireEvent.changeText(screen.getByTestId('emailInput'), 'wrong@example.com');
    fireEvent.changeText(screen.getByTestId('passwordInput'), 'wrongpass');
    fireEvent.press(screen.getByTestId('loginButton'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Login Failed', 'Invalid email or password.');
    });
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled(); 
    expect(Navigation.CommonActions.reset).not.toHaveBeenCalled(); 
  });

  test('handles failed login with empty fields', async () => {
    render(<LoginScreen />);

    fireEvent.press(screen.getByTestId('loginButton'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Login Failed', 'Please enter email and password.');
    });
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(Navigation.CommonActions.reset).not.toHaveBeenCalled();
  });

  // test('handles AsyncStorage getItem error during login', async () => {
  //   (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('AsyncStorage read error'));

  //   render(<LoginScreen />);

  //   fireEvent.changeText(screen.getByTestId('emailInput'), 'test@example.com');
  //   fireEvent.changeText(screen.getByTestId('passwordInput'), '12345');
  //   fireEvent.press(screen.getByTestId('loginButton'));

  //   await waitFor(() => {
  //     expect(Alert.alert).toHaveBeenCalledWith('Login Error', 'Something went wrong during login. Please try again.');
  //   });
  //   expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  //   expect(mockNavigate).not.toHaveBeenCalled();
  //   expect(Navigation.CommonActions.reset).not.toHaveBeenCalled();
  // });

  test('navigates to Register screen when "Sign Up" link is pressed', async () => {
    render(<LoginScreen />);

    fireEvent.press(screen.getByTestId('registerLink'));

    expect(mockReplace).toHaveBeenCalledWith('Register');
  });

  // test('shows alert when "Forgot Password?" link is pressed', async () => {
  //   render(<LoginScreen />);

  //   fireEvent.press(screen.getByTestId('forgotPasswordLink'));

  //   expect(Alert.alert).toHaveBeenCalledWith('Forgot Password', 'Feature not implemented.');
  // });

 
});