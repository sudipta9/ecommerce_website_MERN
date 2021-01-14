import axiosInstance from "../helper/axios";
import { authConstant } from "./constant";

export const login = (user) => {
  console.log(user);

  return async (dispatch) => {
    dispatch({ type: authConstant.LOGIN_REQUEST });

    const res = await axiosInstance.post("/admin/signin", {
      ...user,
    });

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstant.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstant.LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

// check user already logged in or not
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstant.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstant.LOGIN_FAILURE,
        payload: { error: "failed to log in" },
      });
    }
  };
};
