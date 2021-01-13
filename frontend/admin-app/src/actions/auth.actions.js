import { authConstant } from "./constant";

export const login = (user) => {
  console.log(user);

  return async (dispatch) => {
    dispatch({
      type: authConstant.LOGIN_REQUEST,
      payload: {
        ...user,
      },
    });
  };
};
