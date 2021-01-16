/* eslint-disable eqeqeq */
/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { categoryConstant } from "../actions/constant";

const initState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategory = (parentId, categories, category) => {
  let myCategories = [];
  for (let cat of categories) {
    if (cat._id == parentId) {
      myCategories.push({
        ...cat,
        children:
          cat.children && cat.children.length > 0
            ? buildNewCategory(
                parentId,
                [
                  ...cat.children,
                  {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children,
                  },
                ],
                category
              )
            : [],
      });
    } else
      myCategories.push({
        ...cat,
        children:
          cat.children && cat.children.length > 0
            ? buildNewCategory(parentId, cat.children, category)
            : [],
      });
  }
  return myCategories;
};

export default (state = initState, action) => {
  switch (action.type) {
    case categoryConstant.GET_CATEGORY_REQUEST:
      state = {
        ...initState,
        loading: true,
      };
      break;

    case categoryConstant.GET_CATEGORY_SUCCESS:
      state = {
        ...initState,
        categories: action.payload.categories,
        loading: false,
      };
      break;

    case categoryConstant.GET_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case categoryConstant.ADD_NEW_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstant.ADD_NEW_CATEGORY_SUCCESS:
      const category = action.payload.category;
      const updatedCategories = buildNewCategory(
        category.parentId,
        state.categories,
        category
      );
      state = {
        ...state,
        categories: updatedCategories,
        loading: false,
      };
      break;
    case categoryConstant.ADD_NEW_CATEGORY_FAILURE:
      state = {
        ...initState,
        loading: false,
      };
      break;
  }
  return state;
};
