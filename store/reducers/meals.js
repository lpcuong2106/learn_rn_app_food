import { MEALS } from "../../src/data/dummy-data";
import { TOGGLE_FAVORITE } from "../actions/meal";

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: [],
}
const mealsReducer = (state = initialState, action) => {
    switch(action.type){
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId)
            if(existingIndex >=0){
                const updatedMeal = [...state.favoriteMeals];
                updatedMeal.splice(existingIndex, 1);
                return {...state, favoriteMeals: updatedMeal}
            }else{
                const meal1  = state.meals.find(meal => meal.id === action.mealId)
                return {...state, favoriteMeals: state.favoriteMeals.concat(meal1)}
            }
        default:
            return state;
    }
    return state;
}

export default mealsReducer