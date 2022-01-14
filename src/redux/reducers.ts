import { combineReducers } from "redux";

import itemCounter from "./slices/sliceName";
import updateUserItem from './slices/updateItem';

const rootReducer = combineReducers({
  itemCounter,
  updateUserItem,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
