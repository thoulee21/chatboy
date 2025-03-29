import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function NotFoundScreen() {
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />

      <View style={styles.container}>
        <Text variant="titleLarge">This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text variant="bodyMedium" style={{ color: colors.primary }}>
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
