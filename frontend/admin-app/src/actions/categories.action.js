import axiosInstance from "../helper/axios";
import { categoryConstant } from "./constant";

export const getCategory = () => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstant.GET_CATEGORY_REQUEST,
    });
    const res = await axiosInstance.get("category/get-category");
    console.log(res);

    const { categoryList } = res.data;
    if (res.status === 200) {
      dispatch({
        type: categoryConstant.GET_CATEGORY_SUCCESS,
        payload: { categories: categoryList },
      });
    } else {
      dispatch({
        type: categoryConstant.GET_CATEGORY_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstant.ADD_NEW_CATEGORY_REQUEST });
    const res = await axiosInstance.post("/category/create", form);

    if (res.status === 200) {
      dispatch({
        type: categoryConstant.ADD_NEW_CATEGORY_SUCCESS,
        payload: { category: res.data.category },
      });
    } else {
      dispatch({
        type: categoryConstant.ADD_NEW_CATEGORY_FAILURE,
        payload: res.data.error,
      });
    }
  };
};
