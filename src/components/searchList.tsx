import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Product } from "../api/productsResponse.dto";

const SearchList = ({ searchProducts }: { searchProducts: Product[] }) => {
  const router = useRouter();
  return (
    <FlatList
      data={searchProducts}
      key={"searchProducts_flat_list"}
      style={styles.flatListStyle}
      ItemSeparatorComponent={() => (
        <View style={{ height: 1, backgroundColor: "#ccc" }} />
      )}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            router.push({
              pathname: `/product/[productId]`,
              params: {
                productId: item?.id,
              },
            })
          }
        >
          <View style={styles.searchContainer}>
            <Image
              source={{ uri: item?.images?.[0] }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                marginRight: 10,
              }}
            />
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {item.title}
            </Text>
          </View>
        </Pressable>
      )}
    />
  );
};

export default SearchList;

const styles = StyleSheet.create({
  flatListStyle: {
    alignContent: "stretch",
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});
