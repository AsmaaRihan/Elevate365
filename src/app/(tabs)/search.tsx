import { getProductsBySearch } from "@/src/api/ProductsApi";
import { Product } from "@/src/api/productsResponse.dto";
import SearchList from "@/src/components/searchList";
import { Ionicons } from "@expo/vector-icons";
import _ from "lodash";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchBar = () => {
  const [searchProducts, setSearchProducts] = useState<Product[]>([]);
  const fetchProductsBySearch = async (text: string) => {
    if (_.isEmpty(text)) {
      setSearchProducts([]);
      return;
    }
    const searchResponse = await getProductsBySearch(text);

    setSearchProducts(searchResponse?.products);
  };

  return (
    <SafeAreaView edges={["top"]}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={22}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#888"
          autoFocus
          onChangeText={_.debounce((text: string) => {
            fetchProductsBySearch(text);
          }, 300)}
        />
      </View>
      {searchProducts.length && <SearchList searchProducts={searchProducts} />}
    </SafeAreaView>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 10,
    paddingHorizontal: 12,
    borderColor: "#007AFF",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: "#222",
    backgroundColor: "transparent",
    borderWidth: 0,
  },
});
