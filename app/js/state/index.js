import {MODALS_TYPES} from "../const/index";

export default {
    openedModal: MODALS_TYPES.NONE,
};

export const recipeState = {
    data: null,
};

export const breakfastState = {
    data: null,
    isLoading: false,
};

export const categoriesState = {
    data: null,
    isLoading: false,
};

export const categoriesCarouselState = {
    data: null,
    isLoading: false,
};

export const ingredientModalState = {
    data: {
        ingredients: null,
        meals: null,
    },
    openedData: null,
    isLoading: false,
};
