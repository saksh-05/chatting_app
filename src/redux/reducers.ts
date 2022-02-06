import { combineReducers } from "redux";

import updateUserItem from "./slices/updateItem";
import addChannel from "./slices/addChannel";

const rootReducer = combineReducers({
  updateUserItem,
  addChannel,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
