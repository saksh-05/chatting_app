import { combineReducers } from "redux";

import updateUserItem from "./slices/updateItem";

const rootReducer = combineReducers({
  updateUserItem,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
