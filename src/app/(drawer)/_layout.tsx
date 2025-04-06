import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React, { useCallback } from "react";
import { View, useWindowDimensions } from "react-native";
import {
  Avatar,
  Button,
  Divider,
  Drawer as PaperDrawer,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useUser } from "@/contexts/UserContext";

const DRAWER_ICONS = ["home", "cog"];

export default function DrawerLayout() {
  const insets = useSafeAreaInsets();
  const user = useUser();

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const renderDrawerContent = useCallback(
    (props: DrawerContentComponentProps) => (
      <View style={{ flex: 1 }}>
        <Button
          style={{ marginTop: insets.top, marginBottom: 8 }}
          icon={() => <Avatar.Icon icon="account" size={26} />}
          onPress={() => {
            if (user?.current) {
              router.push("/me");
            } else {
              router.push("/login");
            }
          }}
          onLongPress={() => router.push("/me")}
        >
          {user?.current ? user.current.name : "Login"}
        </Button>
        <Divider />

        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{ paddingTop: 16 }}
        >
          {props.state.routes.map((route, index) => (
            <PaperDrawer.CollapsedItem
              key={route.key}
              label={props.descriptors[route.key].options.title}
              focusedIcon={DRAWER_ICONS[index]}
              unfocusedIcon={`${DRAWER_ICONS[index]}-outline`}
              active={props.state.index === index}
              onPress={() => {
                props.navigation.navigate(route.name);
              }}
            />
          ))}
        </DrawerContentScrollView>
      </View>
    ),
    [insets.top, user]
  );

  return (
    <Drawer
      screenOptions={{
        drawerStyle: { width: 100 },
        drawerType: isLandscape ? "permanent" : "slide",
      }}
      drawerContent={renderDrawerContent}
      detachInactiveScreens
    >
      <Drawer.Screen name="index" options={{ title: "Chat" }} />
      <Drawer.Screen name="settings" options={{ title: "Settings" }} />
    </Drawer>
  );
}
