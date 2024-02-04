import {BUTTONS, MODALS, MODALS_TYPES, MODAL_STATES} from "../const";
import state, {categoriesState, breakfastState, ingredientModalState} from "../state";
import {
    closeModal,
    findButtonIndex,
    findNextButtonIndex,
    findOpenedModalIndex,
    findPreviousButtonIndex, generateNewBreakfast, loadData
} from "../helpers";
import {
    setIngredientsDataState,
    setIngredientLoaderState,
    setCategoriesLoaderState,
    setCategoriesDataState,
    setBreakfastLoaderState,
    setRecipeDataState,
    setCategoriesCarouselLoaderState,
    setCategoriesCarouselDataState,
    setIngredientDataState, setIngredientsOpenedData, setEmptyArrayOnMealsByIngredient
} from "../controllers/controller";

export const renderButtons = () => {
    const buttonsContainer = document.querySelector('.buttons-container');

    BUTTONS.forEach((item) => {
        const button = document.createElement('button');

        button.className = 'modal-button';
        button.textContent = item.text;
        button.dataset.type = item.type;

        button.addEventListener('click', (event) => {
            state.openedModal = item.type;
            doFirstRequest(item.type);
            event.stopPropagation();
        });

        buttonsContainer.append(button);
    })
};

export const renderModalWindows = () => {
    const app = document.querySelector('.app');

    MODALS.forEach((item) => {

        const controlButtons = document.createElement('div');
        const prevButton = document.createElement('button');
        const nextButton = document.createElement('button');
        const closeButton = document.createElement('button');
        const loader = document.createElement('div');
        const recipeWindow = document.createElement('div');
        const ingredients = document.createElement('ul');
        const recipe = document.createElement('p');
        const backButton = document.createElement('button');

        const modalWindow = document.createElement('div');

        controlButtons.append(prevButton);
        controlButtons.append(closeButton);
        controlButtons.append(nextButton);

        modalWindow.append(controlButtons);
        modalWindow.append(loader);

        app.append(modalWindow);

        recipeWindow.className = 'modal-window__recipe-window';
        recipeWindow.style.display = 'none';

        ingredients.className = 'modal-window__ingredients';

        recipe.className = 'modal-window__recipe';

        backButton.className = 'modal-window__back-button';
        backButton.style.display = 'none';
        backButton.textContent = 'Back';

        backButton.addEventListener('click', () => {
            recipeWindow.style.display = 'none';
        });

        recipeWindow.append(backButton);
        recipeWindow.append(ingredients);
        recipeWindow.append(recipe);

        loader.className = 'loader';

        controlButtons.className = 'control-buttons';

        modalWindow.className = 'modal-window';
        modalWindow.dataset.type = item.type;

        const currentButtonIndex = findButtonIndex(item.type);

        prevButton.className = 'prev';
        prevButton.textContent = BUTTONS[findPreviousButtonIndex(currentButtonIndex)].text;

        nextButton.className = 'next';
        nextButton.textContent = BUTTONS[findNextButtonIndex(currentButtonIndex)].text;

        closeButton.className = 'close';
        closeButton.textContent = '+';

        closeButton.addEventListener('click', (event) => {
            closeModal();
            event.stopPropagation();
        });

        prevButton.addEventListener('click', (event) => {
            const currentOpenedModalIndex = findOpenedModalIndex();
            if (currentOpenedModalIndex === 0) {
                state.openedModal = MODALS[MODALS.length - 1].type;
            } else {
                state.openedModal = MODALS[currentOpenedModalIndex - 1].type;
            }
            doFirstRequest(state.openedModal);
            event.stopPropagation();
        });

        nextButton.addEventListener('click', (event) => {
            const currentOpenedModalIndex = findOpenedModalIndex();
            if (currentOpenedModalIndex === MODALS.length - 1) {
                state.openedModal = MODALS[0].type;
            } else {
                state.openedModal = MODALS[currentOpenedModalIndex + 1].type;
            }
            doFirstRequest(state.openedModal);
            event.stopPropagation();
        });

        switch (item.type) {
            case MODALS_TYPES.BREAKFAST:
                const dishContainer = document.createElement('div');
                const dishContainerInner = document.createElement('div');
                const dishName = document.createElement('h1');
                const dishImage = document.createElement('img');
                const dishButtonContainer = document.createElement('div');
                const showRecipeButton = document.createElement('button');
                const nextDishButton = document.createElement('button');

                dishContainer.className = 'modal-window__inner';
                dishContainer.style.display = 'flex';
                dishName.className = 'modal-window__title';
                dishContainerInner.className = 'dish-container';
                dishImage.className = 'modal-window__img';
                dishImage.id = 'breakfast-img';
                dishImage.alt = 'Dish';
                dishButtonContainer.className = 'modal-window__buttons'
                nextDishButton.className = 'modal-window__next-button';
                nextDishButton.textContent = 'NEXT';
                showRecipeButton.className = 'modal-window__show-button';
                showRecipeButton.textContent = 'SHOW RECIPE';

                nextDishButton.addEventListener('click', () => {
                        generateNewBreakfast(dishImage);
                });

                showRecipeButton.addEventListener('click', () => {
                    setBreakfastLoaderState(true);
                    setRecipeDataState(breakfastState.data['idMeal']);
                    setBreakfastLoaderState(false);
                });

                dishContainer.append(dishName);
                dishContainerInner.append(dishImage);
                dishButtonContainer.append(showRecipeButton);
                dishButtonContainer.append(nextDishButton);
                dishContainerInner.append(dishButtonContainer);
                dishContainerInner.append(recipeWindow);
                dishContainer.append(dishContainerInner);
                modalWindow.append(dishContainer);
                break;

            case MODALS_TYPES.CATEGORIES:
                const categoriesContainer = document.createElement('div');
                const categoriesMessage = document.createElement('p');
                const categories = document.createElement('ul');
                const carousel = document.createElement('div');
                const toCategoriesButton = document.createElement('button');

                categoriesContainer.className = 'modal-window__categories-container';
                categoriesMessage.textContent = 'Select the desired category and we will show you which dishes we have for you:';
                categoriesMessage.className = 'modal-window__message';
                categoriesMessage.style.display = 'none';
                categories.className = 'modal-window__categories';
                carousel.className = 'carousel-container';
                carousel.id = 'categories-carousel';
                carousel.style.display = 'none';
                toCategoriesButton.className = 'modal-window__return-button';
                toCategoriesButton.textContent = 'Categories';
                toCategoriesButton.style.display = 'none';

                categories.addEventListener('click', (event) => {
                    categoriesContainer.style.display = 'none';
                    loadData(setCategoriesCarouselLoaderState, setCategoriesCarouselDataState, event.target.textContent);
                })

                toCategoriesButton.addEventListener('click', () => {
                    carousel.style.display = 'none';
                    categoriesContainer.style.display = 'block';
                    toCategoriesButton.style.display = 'none';
                })

                modalWindow.append(recipeWindow);
                categoriesContainer.append(categoriesMessage);
                categoriesContainer.append(categories);
                modalWindow.append(categoriesContainer);
                modalWindow.append(carousel);
                modalWindow.append(toCategoriesButton);
                break;

            case MODALS_TYPES.INGREDIENT:
                const inner = document.createElement('div');
                const messageForList = document.createElement('p');
                const messageForField = document.createElement('p');
                const searchForList = document.createElement('div');
                const searchForField = document.createElement('div');
                const searchField = document.createElement('input');
                const searchButton = document.createElement('button');
                const ingredientButton = document.createElement('button');
                const ingredients = document.createElement('select');
                const carouselIngredients = document.createElement('div');
                const toIngredientsButton = document.createElement('button');
                const noSuchIngredientMessage = document.createElement('p');

                inner.className = 'modal-window__inner-container';
                searchForField.className = 'modal-window__search-container';
                searchForList.className = 'modal-window__search-container';
                messageForList.className = 'modal-window__message';
                messageForList.textContent = 'You can select your ingredient from the list';
                messageForField.className = 'modal-window__message';
                messageForField.textContent = 'or write it in the search field!';
                searchField.className = 'modal-window__search-field';
                searchButton.className = 'modal-window__search-button';
                searchButton.textContent = 'Find';
                ingredientButton.className = 'modal-window__ingredient-button';
                ingredientButton.textContent = 'Find';
                ingredients.className = 'modal-window__available-ingredients';
                carouselIngredients.className = 'carousel-container';
                carouselIngredients.id = 'ingredients-carousel';
                carouselIngredients.style.display = 'none';
                toIngredientsButton.className = 'modal-window__return-button';
                toIngredientsButton.textContent = 'Ingredients';
                toIngredientsButton.style.display = 'none';
                noSuchIngredientMessage.textContent = 'No such ingredient in our database :(';
                noSuchIngredientMessage.className = 'modal-window__message__no-such-ingredient';
                noSuchIngredientMessage.style.display = 'none';

                searchButton.addEventListener('click', () => {
                    const ingredient = searchField.value.trim();
                    if (ingredient === '') {
                        setIngredientLoaderState(true);
                        setEmptyArrayOnMealsByIngredient();
                    } else {
                        loadData(setIngredientLoaderState, setIngredientDataState, ingredient);
                    }
                    setIngredientsOpenedData(MODAL_STATES.MEALS);
                })

                ingredientButton.addEventListener('click', () => {
                    const ingredient = ingredientModalState.data.ingredients[ingredients.selectedIndex]['strIngredient'];
                    loadData(setIngredientLoaderState, setIngredientDataState, ingredient);
                    setIngredientsOpenedData(MODAL_STATES.MEALS);
                })

                toIngredientsButton.addEventListener('click', () => {
                    carouselIngredients.style.display = 'none';
                    searchForField.style.display = 'flex';
                    searchForList.style.display = 'flex';
                    toIngredientsButton.style.display = 'none';
                    noSuchIngredientMessage.style.display = 'none';
                })

                inner.append(recipeWindow);
                searchForList.append(messageForList);
                searchForList.append(ingredients);
                searchForList.append(ingredientButton);
                inner.append(searchForList)
                searchForField.append(messageForField);
                searchForField.append(searchField);
                searchForField.append(searchButton);
                inner.append(searchForField);
                inner.append(noSuchIngredientMessage);
                inner.append(carouselIngredients);
                inner.append(toIngredientsButton);
                modalWindow.append(inner);
                break;
        }
    });
}

const doFirstRequest = (type) => {
    if (type === MODALS_TYPES.BREAKFAST) generateNewBreakfast(document.querySelector('#breakfast-img'));
    if (type === MODALS_TYPES.CATEGORIES && categoriesState.data === null) loadData(setCategoriesLoaderState, setCategoriesDataState);
    if (type === MODALS_TYPES.INGREDIENT) {
        loadData(setIngredientLoaderState, setIngredientsDataState);
        ingredientModalState.openedData = MODAL_STATES.CHOICE;
    }
}
