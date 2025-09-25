import { ReactNode } from "react";
import { View } from "react-native";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <View
      style={{
        padding: 7,
        borderRadius: 20,
        backgroundColor: "#b3babacf",
      }}
    >
      {children}
    </View>
  );
};

export default Card;
