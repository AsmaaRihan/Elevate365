import { getMealsByCategory } from "@/src/api/mealsApi";
import { Meal } from "@/src/api/mealsResponse.dto";
import { useLocalSearchParams, useRouter } from "expo-router";
import { t } from "i18next";
import { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import _ from "loadsh";

export default function Category() {
  const { category, description, image, categoryId } = useLocalSearchParams<{
    category: string;
    description: string;
    image: string;
    categoryId: string;
  }>();

  const router = useRouter();
  const [meals, setMeals] = useState<Meal[]>([]);

  const fetchMealsByCategories = async () => {
    const meals = await getMealsByCategory(category);

    setMeals(meals?.meals);
  };

  const renderCategoryDetails = () => {
    if (_.isEmpty(meals)) {
      return (
        <View>
          <Image
            style={styles.categoryImage}
            source={{ uri: image }}
            resizeMode="cover"
          />
          <Text style={styles.titleStyle}>{category}</Text>
          <Text style={styles.descriptionStyle}>{description}</Text>
          <TouchableHighlight
            style={styles.button}
            onPress={fetchMealsByCategories}
          >
            <Text style={styles.titleButton}>{t("check_meals")}</Text>
          </TouchableHighlight>
        </View>
      );
    }

    if (meals) {
      return (
        <FlatList
          data={meals}
          numColumns={2}
          key={"meals_flat_list"}
          style={styles.flatListStyle}
          renderItem={({ item }) => {
            return (
              <TouchableWithoutFeedback
                style={{ flex: 1, margin: 5 }}
                onPress={() =>
                  router.push({
                    pathname: "/details/[mealId]",
                    params: { mealId: item?.idMeal },
                  })
                }
              >
                <View style={{ flex: 1 }}>
                  <Image
                    style={styles.mealImage}
                    source={{ uri: item?.strMealThumb }}
                    resizeMode="cover"
                  />
                  <Text style={styles.mealTextStyle}>{item?.strMeal}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewStyle}>{renderCategoryDetails()}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  viewStyle: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "white",
    paddingTop: 10,
  },
  titleStyle: { fontFamily: "bold", fontSize: 18 },
  categoryImage: {
    resizeMode: "contain",
    width: "100%",
    height: 250,
    padding: 14,
  },
  descriptionStyle: { fontSize: 12, padding: 10 },
  button: {
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 6,
    height: 44,
    paddingHorizontal: 2,
    justifyContent: "center",
    margin: 5,
  },
  titleButton: { color: "white" },
  mealImage: {
    resizeMode: "contain",
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  flatListStyle: { alignContent: "stretch", padding: 10 },
  mealTextStyle: {
    fontSize: 12,
  },
});
