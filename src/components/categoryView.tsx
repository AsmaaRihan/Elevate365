import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Category } from "../api/categoriesResponse.dto";

const CategoryView = ({
  item,
  onPress,
}: {
  item: Omit<Category, "idCategory">;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.cardView}>
        <Image
          style={styles.categoryImage}
          source={{ uri: item.strCategoryThumb }}
          resizeMode="contain"
        />
        <Text style={styles.cardTextStyle}>{item.strCategory}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryView;

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
