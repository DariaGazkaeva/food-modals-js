export const MODALS_TYPES = {
    NONE: 'none',
    BREAKFAST: 'breakfast',
    CATEGORIES: 'categories',
    INGREDIENT: 'ingredient',
};

export const MODALS = [
    {
        type: MODALS_TYPES.BREAKFAST,
    },
    {
        type: MODALS_TYPES.CATEGORIES,
    },
    {
        type: MODALS_TYPES.INGREDIENT,
    },
];

export const BUTTONS = [
    {
        text: 'RANDOM BREAKFAST',
        type: MODALS_TYPES.BREAKFAST,
    },
    {
        text: 'ALL DISHES BY CATEGORY',
        type: MODALS_TYPES.CATEGORIES,
    },
    {
        text: 'FIND DISHES BY INGREDIENT',
        type: MODALS_TYPES.INGREDIENT,
    },
];

export const MODAL_STATES = {
    CHOICE: 'CHOICE',
    MEALS: 'MEALS',
    RECIPE: 'RECIPE',
};
