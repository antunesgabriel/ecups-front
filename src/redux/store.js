import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist";

import persitReducers from "./persistStore";
import reducers from "./ducks/reducers";
import sagas from "./sagas/sagas";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const composer =
  process.env.NODE_ENV === "development"
    ? compose(applyMiddleware(...middlewares), console.tron.createEnhancer())
    : applyMiddleware(...middlewares);

const store = createStore(persitReducers(reducers), composer);
const persistor = persistStore(store);

sagaMiddleware.run(sagas);

export { store, persistor };
