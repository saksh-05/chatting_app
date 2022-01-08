import { combineReducers } from "redux";

import itemCounter from "./slices/sliceName";

const rootReducer = combineReducers({
  itemCounter,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
