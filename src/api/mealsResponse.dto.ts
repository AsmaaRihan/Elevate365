export interface Meal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

export interface MealsResponse {
  meals: Meal[];
}
