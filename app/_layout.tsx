import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function RootLayout() {
  const { t: translate } = useTranslation();

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
      <Stack.Screen name="index" options={{ title: translate("home") }} />
      <Stack.Screen name="details" options={{ title: translate("details") }} />
      <Stack.Screen
        name="settings"
        options={{ title: translate("settings") }}
      />
      <Stack.Screen
        name="favorites"
        options={{ title: translate("favorites") }}
      />
    </Stack>
  );
}
