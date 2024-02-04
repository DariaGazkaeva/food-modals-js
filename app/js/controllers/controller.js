import {categoriesState, breakfastState, ingredientModalState, recipeState, categoriesCarouselState} from "../state";
import {
    getBreakfastPromise,
    getRecipePromise,
    getDishesByCategoryPromise,
    getCategoriesPromise,
    getIngredientPromise,
    getIngredientsPromise
} from "../api/mealApi";

export const setCategoriesLoaderState = (loaderState) => {
    categoriesState.isLoading = loaderState
};

export const setCategoriesDataState = () => {
    getCategoriesPromise().then(response => {
        categoriesState.data = response;
    });
};

export const setCategoriesCarouselLoaderState = (loaderState) => {
    categoriesState.isLoading = loaderState
};

export const setCategoriesCarouselDataState = (category) => {
    getDishesByCategoryPromise(category).then(response => {
        categoriesCarouselState.data = response;
    });
};

export const setBreakfastLoaderState = (loaderState) => {
    breakfastState.isLoading = loaderState
};

export const setBreakfastDataState = () => {
    getBreakfastPromise().then(response => {
        breakfastState.data = response[Math.floor(Math.random() * response.length)];
    });
};

export const setIngredientLoaderState = (loaderState) => {
    ingredientModalState.isLoading = loaderState;
};

export const setIngredientsDataState = () => {
    getIngredientsPromise().then(arrayOfIngredients =>
        ingredientModalState.data.ingredients = arrayOfIngredients);
};

export const setIngredientDataState = (ingredient) => {
    getIngredientPromise(ingredient).then(arrayOfMeal => {
        if (arrayOfMeal === null) setEmptyArrayOnMealsByIngredient();
        else ingredientModalState.data.meals = arrayOfMeal;
    })
};

export const setRecipeDataState = (id) => {
    getRecipePromise(id).then(meal => {
        recipeState.data = meal;
    });
};

export const setIngredientsOpenedData = (openedData) => {
    ingredientModalState.openedData = openedData;
}

export const setEmptyArrayOnMealsByIngredient = () => {
    ingredientModalState.data.meals = [];
}
