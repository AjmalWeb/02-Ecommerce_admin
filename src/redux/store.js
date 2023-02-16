import { createStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import loginReducer from "./reducers/login_slice";
import userDetailsReducer from "./reducers/userDetails";
const reducers = combineReducers({
  loginActions: loginReducer,
  userDetailsReducer: userDetailsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  // whitelist:['loginActions','userDetailsReducer']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer);

export default store;

// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }
