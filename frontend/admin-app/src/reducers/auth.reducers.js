import { authConstant } from "../actions/constant";

const initState = {
  name: "Sudipta",
};

export default (state = initState, action) => {
  console.log(action);

  switch (action.type) {
    case authConstant.LOGIN_REQUEST:
      state = {
        ...state,
        ...action.payload,
      };
      break;
  }
  return state;
};
