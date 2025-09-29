import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Product } from "../api/productsResponse.dto";

const ProductListItem = ({
  item,
  onPress,
}: {
  item: Product;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.cardView}>
        <Image
          style={styles.categoryImage}
          source={{ uri: item?.images?.[0] }}
          resizeMode="contain"
        />
        <Text style={styles.cardTextStyle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardView: {
    backgroundColor: "white",
    shadowColor: "grey",
    padding: 20,
    flex: 1,
    margin: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  cardTextStyle: { fontSize: 16, fontFamily: "bold" },
  categoryImage: { width: "100%", height: 80 },
  button: { flex: 1 },
});
