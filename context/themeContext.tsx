import React, { createContext, useContext, useState, useEffect, PropsWithChildren, FC } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { ThemeContextType } from '@/types';
import { THEME_STORAGE_KEY } from '@/constants';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const systemColorScheme = useRNColorScheme();
  const [colorScheme, setColorSchemeState] = useState<'light' | 'dark'>(
    systemColorScheme === 'dark' ? 'dark' : 'light'
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setColorSchemeState(savedTheme);
      } else if (systemColorScheme) {
        setColorSchemeState(systemColorScheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setColorScheme = async (scheme: 'light' | 'dark') => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, scheme);
      setColorSchemeState(scheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const toggleColorScheme = () => {
    const newScheme = colorScheme === 'light' ? 'dark' : 'light';
    setColorScheme(newScheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        setColorScheme,
        toggleColorScheme,
        isDarkColorScheme: colorScheme === 'dark',
        isLoading,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};



