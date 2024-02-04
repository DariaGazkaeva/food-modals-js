const url = 'https://www.themealdb.com/api/json/v1/1/';

export const getBreakfastPromise = async () => {
    try {
        const response = await fetch(url + 'filter.php?c=Breakfast');
        return (await response.json())['meals'];
    } catch (error) {
        alert('SERVER ERROR');
        console.log(error);
    }
}

export const getCategoriesPromise = async () => {
    try {
        const response = await fetch(url + 'categories.php');
        return (await response.json())['categories'];
    } catch (error) {
        alert('SERVER ERROR');
        console.log(error);
    }
}

export const getDishesByCategoryPromise = async (category) => {
    try {
        const response = await fetch(url + 'filter.php?c=' + category);
        return (await response.json())['meals'];
    } catch (error) {
        alert('SERVER ERROR');
        console.log(error);
    }
}

export const getRecipePromise = async (id) => {
    try {
        const response = await fetch(url + 'lookup.php?i=' + id);
        return (await response.json())['meals'][0];
    } catch (error) {
        alert('SERVER ERROR');
        console.log(error);
    }
}

export const getIngredientPromise = async (ingredient) => {
    try {
        const response = await fetch(url + 'filter.php?i=' + ingredient);
        return (await response.json())['meals'];
    } catch (error) {
        alert('SERVER ERROR');
        console.log(error);
    }
}

export const getIngredientsPromise = async () => {
    try {
        const response = await fetch(url + 'list.php?i=list');
        return (await response.json())['meals'];
    } catch (error) {
        alert('SERVER ERROR');
        console.log(error);
    }
}
