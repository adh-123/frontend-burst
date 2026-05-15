import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../features/chatSlice";
import storage from "redux-persist/lib/storage";
import {persistReducer,persistStore} from "redux-persist";
const persistConfig = {
  key: "root",

  storage,
};
const persistedReducer = persistReducer(
  persistConfig,
  chatReducer
);
export const store = configureStore({
  reducer: {
    chat: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(
  store
);