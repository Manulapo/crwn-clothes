import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const setCategories = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray)

// Redu Thunk actions
export const fetchCategoryStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
export const fetchCategorySuccess = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);
export const fetchCategoryFailed= (error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoryAsync = () => async (dispatch) => {
    dispatch(fetchCategoryStart())
    try {
        const categoriesArray = await getCategoriesAndDocuments('categories');
        dispatch(fetchCategorySuccess(categoriesArray))
    } catch (error) {
        dispatch(fetchCategoryFailed(error))
    }

}