/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { userConstant } from "../actions/constant";

const initState = {
  error: "",
  message: "",
  loading: "",
};
export default (state = initState, action) => {
  switch (action.type) {
    case userConstant.SIGNUP_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstant.SIGNUP_SUCCESS:
      state = {
        loading: false,
        message: action.payload.message,
      };
      break;
    case userConstant.SIGNUP_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }

  return state;
};
