import state from "../state/index";
import {BUTTONS, MODALS, MODALS_TYPES} from "../const";
import {setBreakfastDataState, setBreakfastLoaderState} from "../controllers/controller";

export const closeModal = () => {
    const app = document.querySelector('.app');
    app.classList.remove('darkened');
    state.openedModal = MODALS_TYPES.NONE;
    document.removeEventListener('click', clickOnBackgroundListener);
}

export const findOpenedModalIndex = () => {
    return MODALS.findIndex((item) => item.type === state.openedModal);
}

export const findPreviousButtonIndex = (currentIndex) => {
    if (currentIndex === 0) return BUTTONS.length - 1;
    return currentIndex - 1;
}

export const findNextButtonIndex = (currentIndex) => {
    if (currentIndex === BUTTONS.length - 1) return 0;
    return currentIndex + 1;
}

export const findButtonIndex = (type) => {
    return BUTTONS.findIndex((item) => item.type === type);
}

export const clickOnBackgroundListener = (event) => {
    const openedModalWindow = document.querySelector(`.modal-window[data-type="${state.openedModal}"]`);
    const withinBoundaries = event.composedPath().includes(openedModalWindow);
    if (!withinBoundaries) {
        closeModal();
        event.stopPropagation();
    }
}

export const loadData = (loaderFunc, setDataFunc, argument) => {
    loaderFunc(true);
    setDataFunc(argument);
}

export const generateNewBreakfast = (img) => {
    setBreakfastLoaderState(true);
    setBreakfastDataState();
    img.onload = () => setBreakfastLoaderState(false);
}
