import { Redirect, router, Stack } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Text,
  useTheme,
} from "react-native-paper";

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
        <ScrollView style={styles.root} contentContainerStyle={{ padding: 10 }}>
          <Card style={styles.card}>
            <Card.Cover
              source={require("../assets/images/adaptive-icon.png")}
            />
            <Card.Title
              title="User Profile"
              left={({ size }) => <Avatar.Icon icon="account" size={size} />}
            />
            <Card.Content>
              <Text>{user.current?.name}</Text>
              <Text>{user.current?.email}</Text>
            </Card.Content>
          </Card>

          <Button
            icon="logout"
            mode="contained"
            onPress={async () => {
              await user.logout();
              router.replace("/(drawer)");
            }}
            textColor={appTheme.colors.error}
            buttonColor={appTheme.colors.errorContainer}
          >
            Logout
          </Button>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  card: {
    marginBottom: 16,
  },
});
