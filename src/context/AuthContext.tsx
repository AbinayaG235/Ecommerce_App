import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (jwtToken: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('jwtToken');
        if (storedToken) {
          setToken(storedToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Failed to load token from storage:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  const login = async (jwtToken: string) => {
    try {
      await AsyncStorage.setItem('jwtToken', jwtToken);
      setToken(jwtToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to save token to storage:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('jwtToken');
      setToken(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Failed to remove token from storage:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};