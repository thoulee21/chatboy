import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NaviThemeProvider,
} from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import "react-native-url-polyfill/auto";

import { SOURCE_COLOR } from "@/constants/theme";
import { UserProvider, useUser } from "@/contexts/UserContext";
import { JsStack as Stack } from "@/layouts/js-stack";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

SplashScreen.preventAutoHideAsync();

function RootStack() {
  const user = useUser();
  const colorScheme = useColorScheme();

  const { theme } = useMaterial3Theme({
    sourceColor: user?.current ? user.current?.prefs.sourceColor : SOURCE_COLOR,
  });

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
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />

      <NaviThemeProvider
        value={{
          ...(colorScheme === "dark"
            ? NavigationDarkTheme
            : NavigationLightTheme),
          fonts: DefaultTheme.fonts,
        }}
      >
        <PaperProvider theme={paperTheme}>
          <Stack screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}>
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ title: "Login" }} />
          </Stack>
        </PaperProvider>
      </NaviThemeProvider>
    </>
  );
}

export default function Index() {
  return (
    <UserProvider>
      <RootStack />
    </UserProvider>
  );
}
