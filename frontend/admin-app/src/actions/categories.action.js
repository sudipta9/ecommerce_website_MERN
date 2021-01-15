import axiosInstance from "../helper/axios";
import { categoryConstant } from "./constant";

export const getCategory = () => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstant.GET_CATEGORY_REQUEST,
    });
    const res = await axiosInstance.get("category/get-category");
    console.log(res);

    if (res.status === 200) {
      dispatch({
        type: categoryConstant.GET_CATEGORY_SUCCESS,
        payload: { categories: res.data },
      });
    } else {
      dispatch({
        type: categoryConstant.GET_CATEGORY_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
