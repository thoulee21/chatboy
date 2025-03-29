import { Redirect, Stack } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { useUser } from "@/contexts/UserContext";

export default function SettingsScreen() {
  const user = useUser();

  if (!user?.current) {
    return <Redirect href="/login" />;
  }

  return (
    <>
      <Stack.Screen options={{ title: "Settings" }} />

      <SafeAreaView>
        <ScrollView></ScrollView>
      </SafeAreaView>
    </>
  );
}
