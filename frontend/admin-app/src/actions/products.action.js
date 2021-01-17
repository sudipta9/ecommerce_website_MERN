import axiosInstance from "../helper/axios";
import { productConstant } from "./constant";

export const addProduct = (form) => {
  return async (dispatch) => {
    dispatch({
      type: productConstant.ADD_PRODUCT_REQUEST,
    });
    const res = await axiosInstance.post("/product/create", form);
    if (res.status === 200) {
      dispatch({
        type: productConstant.ADD_PRODUCT_SUCCESS,
        payload: { product: res.data.product },
      });
    } else {
      dispatch({
        type: productConstant.ADD_PRODUCT_FAILURE,
        payload: res.data.error,
      });
    }
    console.log(res);
  };
};
