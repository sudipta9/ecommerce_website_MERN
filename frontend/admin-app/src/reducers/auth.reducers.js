/* eslint-disable import/no-anonymous-default-export */
import { authConstant } from "../actions/constant";

const initState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: "",
  },
  authenticate: false,
  authenticating: false,
};

export default (state = initState, action) => {
  console.log(action);

  // eslint-disable-next-line default-case
  switch (action.type) {
    case authConstant.LOGIN_REQUEST:
      state = {
        ...state,
        authenticate: false,
        authenticating: true,
      };
      break;

    case authConstant.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;
  }
  return state;
};
