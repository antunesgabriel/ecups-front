import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

export default (reducers) => {
  const persistedReducers = persistReducer(
    {
      key: process.env.REACT_APP_PERSIST_KEY,
      storage,
      whitelist: ["auth", "user"],
    },
    reducers
  );

  return persistedReducers;
};
