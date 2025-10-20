import { useAuth } from '@/src/Contex/AuthContext/authContext';
import colors from '@/src/theme/colors';
import { changeLanguage } from 'i18next';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SettingsScreen = () => {
  const { logOut } = useAuth();

  const languages = [
    { code: 'ar', label: 'العربية' },
    { code: 'en', label: 'English' },
  ];

  const handleLogout = () => {
    logOut();
  };

  return (
    <View style={styles.container}>
      {languages.map((lang) => (
        <Button key={lang.code} onPress={() => changeLanguage(lang.code)} title={lang.label} />
      ))}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  logoutButton: {
    backgroundColor: colors.error,
    paddingVertical: 14,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 32,
  },
  logoutButtonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
