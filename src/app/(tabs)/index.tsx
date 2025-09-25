import { getAllProducts } from "@/src/api/ProductsApi";

import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, TextInput, View } from "react-native";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";

import { Product } from "@/src/api/productsResponse.dto";
import ProductView from "@/src/components/productView";
import i18n from "@/src/language";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
//infinite query for pagination
export default function Index() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);

  const fetchAllProducts = async ({ skip }: { skip?: number }) => {
    const productsResponse = await getAllProducts({ skip });

    setProducts(productsResponse?.products);
  };

  useEffect(() => {
    fetchAllProducts({});
  });

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
              onChange={(e) => {
                // console.log("e", e);
                // _.debounce(
                //   () => {
                //     console.log("debounced", e);
                //   },
                //   300,
                //   {
                //     leading: false,
                //     trailing: true,
                //   }
                // );
              }}
            />
          </View>

          <FlatList
            data={products}
            numColumns={2}
            // onEndReached={() => {
            //   console.log("onEndReached");
            //   fetchAllProducts({
            //     skip: _.last(products) ? _.last(products)?.id : undefined,
            //   });
            // }}
            keyExtractor={(item) => item?.id.toString()}
            key={"products_flat_list"}
            style={styles.flatListStyle}
            renderItem={({ item }) => (
              <ProductView
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
          />
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
