import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NaviThemeProvider,
} from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from "react-native";
import "react-native-get-random-values";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import "react-native-url-polyfill/auto";

import { SOURCE_COLOR } from "@/constants/theme";
import { UserProvider } from "@/contexts/UserContext";
import { JsStack as Stack } from "@/layouts/js-stack";

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

function ThemedApp() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme({ sourceColor: SOURCE_COLOR });

  const paperTheme =
    colorScheme === "dark"
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.light };

  const { DarkTheme: NavigationDarkTheme, LightTheme: NavigationLightTheme } =
    adaptNavigationTheme({
      reactNavigationLight: DefaultTheme,
      reactNavigationDark: DarkTheme,
      materialLight: MD3LightTheme,
      materialDark: MD3DarkTheme,
    });

  return (
    <PaperProvider theme={paperTheme}>
      <NaviThemeProvider
        value={{
          ...(colorScheme === "dark"
            ? NavigationDarkTheme
            : NavigationLightTheme),
          fonts: DefaultTheme.fonts,
        }}
      >
        <StatusBar
          translucent
          style={colorScheme === "dark" ? "light" : "dark"}
        />
        <RootStack />
      </NaviThemeProvider>
    </PaperProvider>
  );
}

function RootStack() {
  return (
    <Stack screenOptions={TransitionPresets.SlideFromRightIOS}>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
    </Stack>
  );
}

export default function Index() {
  return (
    <UserProvider>
      <ThemedApp />
    </UserProvider>
  );
}
