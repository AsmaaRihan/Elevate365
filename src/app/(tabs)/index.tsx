import { getAllProducts, getProductsBySearch } from "@/src/api/ProductsApi";

import { FlatList, StyleSheet, TextInput, View } from "react-native";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";

import { Product } from "@/src/api/productsResponse.dto";
import ProductListItem from "@/src/components/ProductListItem";
import SearchList from "@/src/components/searchList";
import i18n from "@/src/language";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import _ from "lodash";
import { SafeAreaView } from "react-native-safe-area-context";

//infinite query for pagination
export default function Index() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [searchProducts, setSearchProducts] = useState<Product[]>([]);

  const fetchAllProducts = async (skip?: string) => {
    console.log("fetchAllProducts,", skip);
    const productsResponse = await getAllProducts(skip);

    setProducts((prev) => [...prev, ...productsResponse?.products]);
  };

  const fetchProductsBySearch = async (text: string) => {
    if (_.isEmpty(text)) {
      setSearchProducts([]);
      return;
    }
    const searchResponse = await getProductsBySearch(text);

    setSearchProducts(searchResponse?.products);
  };

  useEffect(() => {
    fetchAllProducts("");
  }, []);

  return (
    <SafeAreaView edges={["top"]}>
      <I18nextProvider i18n={i18n}>
        <View>
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
              onChangeText={_.debounce((text: string) => {
                fetchProductsBySearch(text);
              }, 500)}
            />
          </View>

          {searchProducts.length > 0 ? (
            <SearchList searchProducts={searchProducts} />
          ) : (
            <FlatList
              data={products}
              numColumns={2}
              keyExtractor={(item) => item?.title}
              key={"products_flat_list"}
              style={styles.flatListStyle}
              renderItem={({ item }) => (
                <ProductListItem
                  key={item?.title}
                  item={item}
                  onPress={() =>
                    router.push({
                      pathname: `/product/[productId]`,
                      params: {
                        productId: item?.id,
                      },
                    })
                  }
                />
              )}
              onEndReached={() => fetchAllProducts(products.length.toString())}
              onEndReachedThreshold={1}
            />
          )}
        </View>
      </I18nextProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flatListStyle: {
    alignContent: "stretch",
    padding: 10,
  },
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
