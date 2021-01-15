import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import userReducers from "./user.reducers";
import categoryReducer from "./categories.reducer";
import orderReducer from "./orders.reducer";
import productReducer from "./products.reducer";

const rootReducer = combineReducers({
  auth: authReducers,
  user: userReducers,
  category: categoryReducer,
  order: orderReducer,
  product: productReducer,
});

export default rootReducer;
