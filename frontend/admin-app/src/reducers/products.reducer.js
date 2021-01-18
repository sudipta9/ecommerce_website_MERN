/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { productConstant } from "../actions/constant";

const initialState = {
  products: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case productConstant.ADD_PRODUCT_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
      };
      break;
  }
  return state;
};
