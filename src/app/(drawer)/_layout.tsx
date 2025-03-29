import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React, { useCallback } from "react";
import { View } from "react-native";
import {
  Avatar,
  Button,
  Divider,
  Drawer as PaperDrawer,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DRAWER_ICONS = ["home"];

export default function DrawerLayout() {
  const insets = useSafeAreaInsets();

  const renderDrawerContent = useCallback(
    (props: DrawerContentComponentProps) => (
      <View style={{ flex: 1 }}>
        <Button
          style={{ marginTop: insets.top, marginBottom: 8 }}
          icon={({ size }) => {
            return <Avatar.Icon icon="account" size={26} />;
          }}
          onPress={() => router.push("/auth")}
        >
          Profile
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
    [insets.top]
  );

  return (
    <Drawer
      screenOptions={{
        drawerStyle: { width: 100 },
        drawerType: "slide",
      }}
      drawerContent={renderDrawerContent}
      detachInactiveScreens
    >
      <Drawer.Screen name="index" options={{ title: "Chat" }} />
    </Drawer>
  );
}
