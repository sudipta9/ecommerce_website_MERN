import axiosInstance from "../helper/axios";
import { categoryConstant, productConstant } from "./constant";

export const getInitialData = () => {
  return async (dispatch) => {
    // dispatch({type: initialDataConstant.GET_PRODUCT_DATA_REQUEST});
    const res = await axiosInstance.post("/initial-data");

    if (res.status === 200) {
      const { categories, products } = res.data;
      dispatch({
        type: categoryConstant.GET_CATEGORY_SUCCESS,
        payload: { categories },
      });
      dispatch({
        type: productConstant.ADD_PRODUCT_SUCCESS,
        payload: { products },
      });
    } else {
      dispatch({
        type: categoryConstant.GET_CATEGORY_FAILURE,
      });
      dispatch({
        type: productConstant.ADD_PRODUCT_FAILURE,
      });
    }
    console.log(res);
  };
};
