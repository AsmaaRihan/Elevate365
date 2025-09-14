import { getIngredient } from "@/src/api/mealsApi";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Linking, ScrollView, StyleSheet, Text } from "react-native";

const Details = () => {
  const { mealId } = useLocalSearchParams<{ mealId: string }>();

  const [mealIngredient, setMealIngredient] = useState<any>({});
  const fetchIngredient = async () => {
    const ingredient = await getIngredient(mealId);

    setMealIngredient(ingredient?.meals?.[0]);
  };

  useEffect(() => {
    fetchIngredient();
  }, []);

  // Helper to extract ingredients and measures
  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = mealIngredient[`strIngredient${i}`];
      const measure = mealIngredient[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure ? measure : ""} ${ingredient}`.trim());
      }
    }
    return ingredients;
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={{ uri: mealIngredient?.strMealThumb }}
      />
      <Text style={styles.mealTitle}>{mealIngredient?.strMeal}</Text>
      <Text style={styles.sectionLabel}>Category:</Text>
      <Text style={styles.sectionValue}>{mealIngredient?.strCategory}</Text>
      <Text style={styles.sectionLabel}>Area:</Text>
      <Text style={styles.sectionValue}>{mealIngredient?.strArea}</Text>
      <Text style={styles.titlesStyle}>Ingredients:</Text>
      {getIngredients().map((item, idx) => (
        <Text key={idx}>• {item}</Text>
      ))}
      <Text style={styles.titlesStyle}>Instructions:</Text>
      <Text>{mealIngredient?.strInstructions}</Text>
      {mealIngredient?.strYoutube ? (
        <Text
          style={{ color: "blue", marginTop: 10 }}
          onPress={() => Linking.openURL(mealIngredient?.strYoutube)}
        >
          Watch on YouTube
        </Text>
      ) : null}
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: { paddingBottom: 20 },
  imageStyle: { width: "100%", height: 200, alignSelf: "center" },
  mealTitle: {
    fontWeight: "bold",
    fontSize: 22,
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  sectionLabel: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 8,
    color: "#555",
  },
  sectionValue: { fontSize: 16, marginBottom: 4, color: "#222" },
  titlesStyle: { marginTop: 10, fontWeight: "bold" },
});
