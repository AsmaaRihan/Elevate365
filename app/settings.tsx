import { changeLanguage } from "i18next";
import { Button, View } from "react-native";

const SettingsScreen = () => {
  const languages = [
    { code: "ar", label: "العربية" },
    { code: "en", label: "English" },
  ];

  return (
    <View>
      {languages.map((lang) => {
        console.log("lang", lang);

        return (
          <Button
            key={lang.code}
            onPress={() => changeLanguage(lang.code)}
            title={lang.label}
          />
        );
      })}
    </View>
  );
};

export default SettingsScreen;
