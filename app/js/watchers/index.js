import WatchJS from 'melanke-watchjs';
import state, {categoriesState, breakfastState, ingredientModalState, recipeState, categoriesCarouselState} from '../state';
import {MODAL_STATES, MODALS_TYPES} from "../const";
import {openCarousel} from "../carousel";
import {clickOnBackgroundListener} from "../helpers";
import {
    setCategoriesCarouselLoaderState,
    setCategoriesLoaderState,
    setIngredientLoaderState
} from "../controllers/controller";

const watch = WatchJS.watch;

watch(state, 'openedModal', () => {
    const modalWindows = document.querySelectorAll('.modal-window');

    modalWindows.forEach((item) => {
        item.style.display = 'none';
    });

    if (state.openedModal !== MODALS_TYPES.NONE) {
        const openedModalWindow = document.querySelector(`.modal-window[data-type="${state.openedModal}"]`);
        const app = document.querySelector('.app');
        app.classList.add('darkened');
        openedModalWindow.style.display = 'block';
        document.addEventListener( 'click', (event) => clickOnBackgroundListener(event));
    }
});

watch(breakfastState, 'isLoading', () => {
    const dishName = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.BREAKFAST}"] .modal-window__title`);
    const dishImage = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.BREAKFAST}"] .modal-window__img`);
    const nextDishButton = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.BREAKFAST}"] .modal-window__next-button`);
    const showRecipeButton = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.BREAKFAST}"] .modal-window__show-button`);
    const recipeWindow = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.BREAKFAST}"] .modal-window__recipe-window`);
    const recipe = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.BREAKFAST}"] .modal-window__recipe`);
    const backButton = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.BREAKFAST}"] .modal-window__back-button`);
    const loader = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.BREAKFAST}"] .loader`);

    if (breakfastState.isLoading) {
        dishName.style.display = 'none';
        dishImage.style.display = 'none';
        nextDishButton.style.display = 'none';
        showRecipeButton.style.display = 'none';
        recipeWindow.style.display = 'none';
        recipe.style.display = 'none';
        backButton.style.display = 'none';
        loader.style.display = 'block';
    } else {
        loader.style.display = 'none';
        dishName.style.display = 'block';
        dishImage.style.display = 'block';
        nextDishButton.style.display = 'block';
        showRecipeButton.style.display = 'block';
    }
});

watch(breakfastState, 'data', () => {
    const dishName = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.BREAKFAST}"] .modal-window__title`);
    const dishImage = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.BREAKFAST}"] .modal-window__img`);
    if (breakfastState.data !== null) {
        dishName.textContent = breakfastState.data['strMeal'];
        dishImage.src = breakfastState.data['strMealThumb'];
    }
});

watch(recipeState, 'data', () => {
    const recipeWindow = document.querySelector(`.modal-window[data-type="${state.openedModal}"] .modal-window__recipe-window`);
    const recipe = document.querySelector(`.modal-window[data-type="${state.openedModal}"] .modal-window__recipe`);
    const ingredients = document.querySelector(`.modal-window[data-type="${state.openedModal}"] .modal-window__ingredients`);
    const backButton = document.querySelector(`.modal-window[data-type="${state.openedModal}"] .modal-window__back-button`);

    while (ingredients.firstChild) {
        ingredients.removeChild(ingredients.lastChild);
    }

    if (recipeState.data !== null) {
        recipe.textContent = recipeState.data['strInstructions'];
        for (let i = 1; i <= 20; i++) {
            let ingredient;
            let name = recipeState.data['strIngredient' + i];
            let measure = recipeState.data['strMeasure' + i];
            if (name === '' || name === 'null' || name === null) break;
            if (measure === '' || measure === 'null' || measure === null) {
                ingredient = `<li>${name}</li>`;
            } else {
                ingredient = `<li>${name} - ${measure}</li>`;
            }
            ingredients.insertAdjacentHTML('beforeend', ingredient);
        }
        ingredients.style.display = 'block';
        recipe.style.display = 'block';
        backButton.style.display = 'block';
        recipeWindow.style.display = 'block';
    }
});

watch(categoriesState, 'isLoading', () => {
    const loader = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.CATEGORIES}"] .loader`);
    if (categoriesState.isLoading) {
        loader.style.display = 'block';
    } else {
        loader.style.display = 'none';
    }
});

watch(categoriesState, 'data', () => {
    if (categoriesState.data !== null) {
        setCategoriesLoaderState(false);
        const categories = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.CATEGORIES}"] .modal-window__categories`);
        const categoriesMessage = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.CATEGORIES}"] .modal-window__message`);
        while (categories.firstChild) {
            categories.lastChild.remove();
        }
        categoriesMessage.style.display = 'block';
        categoriesState.data.forEach(item => {
            const category = `<li class="modal-window__category"><a>${item['strCategory']}</a></li>`;
            categories.insertAdjacentHTML('beforeend', category);
        })
    }
});

watch(categoriesCarouselState, 'isLoading', () => {
    const loader = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.CATEGORIES}"] .loader`);
    if (categoriesCarouselState.isLoading) {
        loader.style.display = 'block';
    } else {
        loader.style.display = 'none';
    }
});

watch(categoriesCarouselState, 'data', () => {
    if (categoriesCarouselState.data !== null) {
        setCategoriesCarouselLoaderState(false);
        const carousel = document.querySelector('#categories-carousel');
        const toCategoriesButton = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.CATEGORIES}"] .modal-window__return-button`);
        openCarousel(categoriesCarouselState.data, carousel);
        carousel.style.display = 'flex';
        toCategoriesButton.style.display = 'block';
    }
});

watch(ingredientModalState, 'isLoading', () => {
    const carousel = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.INGREDIENT}"] .carousel-container`);
    const searchContainers = document.querySelectorAll(`.modal-window[data-type="${MODALS_TYPES.INGREDIENT}"] .modal-window__search-container`);
    const loader = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.INGREDIENT}"] .loader`);
    const recipe = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.INGREDIENT}"] .modal-window__recipe-window`);
    const toIngredientsButton = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.INGREDIENT}"] .modal-window__return-button`);
    if (ingredientModalState.isLoading) {
        searchContainers.forEach(container => container.style.display = 'none');
        carousel.style.display = 'none';
        recipe.style.display = 'none';
        toIngredientsButton.style.display = 'none';
        loader.style.display = 'block';
    } else {
        loader.style.display = 'none';
    }
});

watch(ingredientModalState, 'data', () => {
    setIngredientLoaderState(false);
    switch (ingredientModalState.openedData) {

        case (MODAL_STATES.CHOICE):
            const searchContainers = document.querySelectorAll(`.modal-window[data-type="${MODALS_TYPES.INGREDIENT}"] .modal-window__search-container`);
            const ingredients = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.INGREDIENT}"] .modal-window__available-ingredients`);
            ingredientModalState.data.ingredients.forEach(item => {
                const ingredient = `<option class="modal-window__ingredient"><a>${item['strIngredient']}</a></option>`;
                ingredients.insertAdjacentHTML('beforeend', ingredient);
            })
            searchContainers.forEach(container => container.style.display = 'flex');
            break;

        case (MODAL_STATES.MEALS):
            const toIngredientsButton = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.INGREDIENT}"] .modal-window__return-button`);
            if (ingredientModalState.data.meals.length !== 0) {
                const carousel = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.INGREDIENT}"] .carousel-container`);
                carousel.style.display = 'flex';
                toIngredientsButton.style.display = 'block';
                openCarousel(ingredientModalState.data.meals, carousel);
            } else {
                const noSuchIngredientMessage = document.querySelector('.modal-window__message__no-such-ingredient');
                noSuchIngredientMessage.style.display = 'block';
                toIngredientsButton.style.display = 'block';
            }
            break;

        case (MODAL_STATES.RECIPE):
            const recipe = document.querySelector(`.modal-window[data-type="${MODALS_TYPES.INGREDIENT}"] .modal-window__recipe-window`);
            recipe.style.display = 'block';
            break;
    }
});
