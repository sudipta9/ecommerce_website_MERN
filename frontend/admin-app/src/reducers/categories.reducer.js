/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { categoryConstant } from "../actions/constant";

const initState = {
  categories: [],
  loading: false,
  error: null,
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
  }
  return state;
};
