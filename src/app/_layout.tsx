import {
  useMaterial3Theme,
} from '@pchmn/expo-material3-theme';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';

import { JsStack as Stack } from '@/layouts/js-stack';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export default function RootStack() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme({
    sourceColor: '#6a2c73',
  });

  const paperTheme = colorScheme === 'dark'
    ? { ...MD3DarkTheme, colors: theme.dark }
    : { ...MD3LightTheme, colors: theme.light };

  const {
    DarkTheme: NavigationDarkTheme,
    LightTheme: NavigationLightTheme,
  } = adaptNavigationTheme({
    reactNavigationLight: DefaultTheme,
    reactNavigationDark: DarkTheme,
    materialLight: MD3LightTheme,
    materialDark: MD3DarkTheme,
  });

  return (
    <ThemeProvider
      value={{
        ...(colorScheme === 'dark'
          ? NavigationDarkTheme
          : NavigationLightTheme),
        fonts: DefaultTheme.fonts,
      }}
    >
      <StatusBar
        backgroundColor="transparent"
        translucent
        animated
        barStyle={
          colorScheme === 'dark'
            ? 'light-content'
            : 'dark-content'
        }
      />
      <PaperProvider theme={paperTheme}>
        <Stack>
          <Stack.Screen
            name='index'
            options={{ title: 'Home' }}
          />
        </Stack>
      </PaperProvider>
    </ThemeProvider>
  )
}