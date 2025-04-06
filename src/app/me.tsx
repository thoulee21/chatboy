import { Redirect, router, Stack } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  Text,
  Tooltip,
  useTheme,
} from "react-native-paper";

import { expo } from "@/../app.json";
import { useUser } from "@/contexts/UserContext";

export default function MeScreen() {
  const appTheme = useTheme();
  const user = useUser();

  if (!user?.current) {
    return <Redirect href="/login" />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Me",
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="cog-outline"
              onPress={() => router.push("/settings")}
              iconColor={tintColor}
            />
          ),
        }}
      />

      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.cards}>
          <Tooltip title={new Date(user.current.$createdAt).toLocaleString()}>
            <Card>
              <Card.Content>
                <Text variant="titleMedium">
                  {expo.name} has accompanied you for
                </Text>
                <Text variant="headlineMedium">
                  {Math.floor(
                    (new Date().getTime() -
                      new Date(user.current.$createdAt).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days
                </Text>
              </Card.Content>
            </Card>
          </Tooltip>

          <Card>
            <Card.Title
              title={user.current?.name}
              subtitle={user.current?.email}
              left={({ size }) => {
                return <Avatar.Icon icon="account" size={size} />;
              }}
              right={({ size }) => (
                <IconButton
                  icon="logout"
                  iconColor={appTheme.colors.error}
                  size={size}
                  style={{ marginRight: 16 }}
                  onPress={async () => {
                    await user.logout();
                    router.replace("/(drawer)");
                  }}
                />
              )}
            />
          </Card>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  cards: {
    padding: 10,
    gap: 10,
  },
});
