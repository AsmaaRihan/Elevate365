import { Link } from "expo-router";
import { I18nextProvider, useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import i18n from "../language";

export default function Index() {
  const { t: translate } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{translate("home")}</Text>
        <Link href={"/details"}>{translate("view_details")}</Link>
        <Link href={"/settings"}>{translate("go_to_settings")}</Link>
      </View>
    </I18nextProvider>
  );
}
