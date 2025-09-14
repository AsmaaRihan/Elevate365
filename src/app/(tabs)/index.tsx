import { getAllCategories } from "@/src/api/mealsApi";

import { FlatList, StyleSheet, View } from "react-native";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";

import { Category } from "@/src/api/categoriesResponse.dto";
import CategoryView from "@/src/components/categoryView";
import i18n from "@/src/language";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);

  const fetchAllCategories = async () => {
    const categoryResponse = await getAllCategories();

    setCategories(categoryResponse.categories);
  };

  useEffect(() => {
    fetchAllCategories();
  });

  return (
    <SafeAreaView edges={["top"]}>
      <I18nextProvider i18n={i18n}>
        <View>
          <FlatList
            data={categories}
            numColumns={2}
            keyExtractor={(item) => item?.idCategory}
            key={"categories_flat_list"}
            style={styles.flatListStyle}
            renderItem={({ item }) => (
              <CategoryView
                item={item}
                onPress={() =>
                  router.push({
                    pathname: `/category/[categoryId]`,
                    params: {
                      category: item?.strCategory,
                      description: item?.strCategoryDescription,
                      image: item?.strCategoryThumb,
                      categoryId: item?.idCategory,
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
});
