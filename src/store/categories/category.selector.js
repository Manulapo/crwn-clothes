import { createSelector } from "reselect";

// memoization is the concept around the fact that if the input is the same the process won't give you the same output again which instead would be stored upfront at the first time.

// inputSelector
const selectCategoryReducer = (state) => {
  return state.categories;
};

// the createselector method, takes in one or more input through an array and gives back datas that are stored in memory and keep their value up until something new comes in the input
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => {
    return categoriesSlice.categories;
  }
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title] = items;
      return acc;
    }, {});
  }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)
