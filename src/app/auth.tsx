import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ToastAndroid, View } from "react-native";
import {
  Account,
  Client,
  ID,
  Models,
  type AppwriteException,
} from "react-native-appwrite";
import { Button, Caption, TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e7a80d001d8f41da47")
  .setPlatform("com.thoulee.chatboy");

const account = new Account(client);

export default function App() {
  const insets = useSafeAreaInsets();

  const [loggedInUser, setLoggedInUser] =
    useState<Models.User<Models.Preferences> | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function login(email: string, password: string) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      console.log(session.$id);
      setLoggedInUser(await account.get());
    } catch (e) {
      const credErr = e as AppwriteException;
      ToastAndroid.show(credErr.type, ToastAndroid.LONG);
    }
  }

  async function register(email: string, password: string, name: string) {
    await account.create(ID.unique(), email, password, name);
    await login(email, password);
    setLoggedInUser(await account.get());
  }

  return (
    <SafeAreaView style={[styles.root, { paddingBottom: insets.bottom || 10 }]}>
      <View>
        <Caption>
          {loggedInUser ? `Logged in as ${loggedInUser.name}` : "Not logged in"}
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

      <View>
        <View style={styles.btns}>
          <Button
            mode="contained"
            onPress={() => login(email, password)}
            icon="login"
          >
            Login
          </Button>

          <Button
            mode="contained-tonal"
            icon="account-plus"
            onPress={() => register(email, password, name)}
          >
            Register
          </Button>
        </View>

        <Button
          mode="outlined"
          icon="logout"
          onPress={async () => {
            await account.deleteSession("current");
            setLoggedInUser(null);
          }}
        >
          Logout
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
  btns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
