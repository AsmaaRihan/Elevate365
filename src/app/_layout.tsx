import { Stack } from "expo-router";
import { t } from "i18next";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "red" },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, title: t("home") }}
      />
      <SafeAreaView>
        <Stack.Screen
          name="category"
          options={{ headerShown: false, title: t("category") }}
        />
        <Stack.Screen
          name="details"
          options={{ headerShown: false, title: t("details") }}
        />
      </SafeAreaView>
    </Stack>
  );
}
