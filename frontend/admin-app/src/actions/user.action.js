import axiosInstance from "../helper/axios";
import { userConstant } from "./constant";

export const signup = (user) => {
  console.log(user);

  return async (dispatch) => {
    dispatch({ type: userConstant.SIGNUP_REQUEST });

    const res = await axiosInstance.post("/admin/signup", {
      ...user,
    });

    if (res.status === 201) {
      dispatch({
        type: userConstant.SIGNUP_SUCCESS,
        payload: { massage: res.data.massage },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstant.SIGNUP_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
