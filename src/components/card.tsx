import { ReactNode } from "react";
import { View } from "react-native";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <View
      style={{
        padding: 10,
        borderRadius: 20,
        backgroundColor: "#b3babacf",
        margin: 4,
      }}
    >
      {children}
    </View>
  );
};

export default Card;
