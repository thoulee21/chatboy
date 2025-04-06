import { Redirect, Stack } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { List } from "react-native-paper";

import { version } from "@/../package.json";
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
        <ScrollView>
          <List.Section title="General">
            <List.Item
              title="App Version"
              description={version}
              left={(props) => (
                <List.Icon {...props} icon="information-outline" />
              )}
            />
          </List.Section>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
