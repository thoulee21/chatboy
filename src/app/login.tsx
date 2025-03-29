import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Caption, TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useUser } from "@/contexts/UserContext";

export default function App() {
  const insets = useSafeAreaInsets();
  const user = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <SafeAreaView style={[styles.root, { paddingBottom: insets.bottom || 10 }]}>
      <View>
        <Caption>
          {user?.current
            ? `Logged in as ${user.current.name}`
            : "Not logged in"}
        </Caption>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>

      <View style={{ gap: 5 }}>
        <Button
          icon="login"
          mode="contained"
          onPress={async () => {
            await user?.login(email, password);
            router.replace("/(drawer)");
          }}
        >
          Login
        </Button>

        <Button
          mode="contained-tonal"
          icon="account-plus"
          onPress={() => user?.register(email, password, name)}
        >
          Register
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
