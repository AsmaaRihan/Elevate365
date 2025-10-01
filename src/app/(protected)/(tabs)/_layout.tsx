import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { t } from 'i18next';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('home'),
          tabBarIcon: ({ size, color }) => <Feather name="home" size={size} color={color} iconType="solid" />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: t('search'),
          tabBarIcon: ({ size, color }) => (
            <Feather name="search" size={size} color={color} iconType="solid" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('settings'),
          tabBarBadge: 2,
          tabBarIcon: ({ size, color }) => (
            <Feather name="settings" size={size} color={color} iconType="solid" />
          ),
        }}
      />
    </Tabs>
  );
}
