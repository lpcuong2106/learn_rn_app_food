import React from "react";
import { View, Text, StyleSheet, Button, Platform } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";
import {useSelector} from 'react-redux'
import MealItem from "../components/MealItem";
import { CATEGORIES, MEALS } from "../data/dummy-data";

export default function CategoriesMealsScreen({ navigation, route }) {
  const { categoryId: catId } = route.params;
  const availableMeals = useSelector(state => state.meals.filteredMeals)

  const displayMeal = availableMeals.filter((meal) => {
    return meal.categoryIds.indexOf(catId) >= 0;
  });


  const renderMeal = (itemData) => {
    return (
      <MealItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        onSelectMeal={() => {
          navigation.navigate("MealDetail", {
              mealId: itemData.item.id,
          });
        }}
      />
    );
  };
  return (
    <View style={styles.screen}>
      <FlatList
        data={displayMeal}
        keyExtractor={(item) => item.id}
        renderItem={renderMeal}
        style={{ width: "100%" }}
      />
    </View>
  );
}

CategoriesMealsScreen.navigationOptions = ({ navigation, route }) => {
  const { categoryId: catId } = route.params;
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
