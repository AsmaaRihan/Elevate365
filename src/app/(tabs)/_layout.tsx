import { Tabs } from "expo-router";
import { t } from "i18next";
import { Image } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "red" },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("home"),
          tabBarIcon: ({ size, color }) => (
            <Image
              width={size}
              height={size}
              tintColor={color}
              source={{
                uri: "https://img.icons8.com/?size=100&id=2797&format=png&color=000000",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("settings"),
          tabBarBadge: 2,
          tabBarIcon: ({ size, color }) => (
            <Image
              width={size}
              height={size}
              tintColor={color}
              source={{
                uri: "https://img.icons8.com/?size=100&id=BYnvGv84C52t&format=png&color=000000",
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
