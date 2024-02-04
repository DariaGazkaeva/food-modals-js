import {setRecipeDataState} from "../controllers/controller";

export const openCarousel = (arrayOfMeal, carouselContainer) => {

    carouselContainer.innerHTML = '';

    const imageUrls = arrayOfMeal.map(meal => meal['strMealThumb']);
    const imageTitles = arrayOfMeal.map(meal => meal['strMeal']);
    const imageId = arrayOfMeal.map(meal => meal['idMeal']);

    const initializationDOM = () => {

        for (let i = 0; i < imageUrls.length; i++) {
            const carouselItem = document.createElement('div');
            carouselItem.className = 'carousel-item';
            carouselItem.id = imageId[i];

            const image = document.createElement('img');
            image.setAttribute('src', imageUrls[i]);

            const title = document.createElement('h1');
            title.className = 'modal-window__title';
            title.textContent = imageTitles[i];

            carouselItem.append(title);
            carouselItem.append(image);
            carouselContainer.append(carouselItem);
        }
    }

    const render = (state) => {
        state.previous.className = 'carousel-item';
        state.active.className = 'carousel-item active';
    };

    const watchState = () => {
        buttonPrev.addEventListener('click', () => {
            state.previous = state.active;
            if (state.active === firstImg) {
                state.active = lastImg;
            } else {
                state.active = state.active.previousSibling;
            }
            render(state);
        });

        buttonNext.addEventListener('click', () => {
            state.previous = state.active;
            if (state.active === lastImg) {
                state.active = firstImg;
            } else {
                state.active = state.active.nextSibling;
            }
            render(state);
        });

        buttonShowRecipe.addEventListener('click', () => {
            setRecipeDataState(state.active.id);
        })
    }

    initializationDOM();
    const buttonPrev = document.createElement('button');
    buttonPrev.textContent = '<';
    buttonPrev.className = 'carousel-control-prev';
    const buttonNext = document.createElement('button');
    buttonNext.textContent = '>';
    buttonNext.className = 'carousel-control-next';
    const buttonShowRecipe = document.createElement('button');
    buttonShowRecipe.textContent = 'Recipe';
    buttonShowRecipe.className = 'carousel-control-recipe';
    const firstImg = carouselContainer.firstChild;
    const lastImg = carouselContainer.lastChild;
    const state = {
        active: firstImg,
        previous: lastImg,
    }
    watchState();
    render(state);

    const buttons = document.createElement('div');
    buttons.className = 'carousel-buttons';
    buttons.append(buttonPrev);
    buttons.append(buttonShowRecipe);
    buttons.append(buttonNext);
    carouselContainer.append(buttons);
}
