import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";
import logger from "redux-logger";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
  // process.env.NODE_ENV === 'development' garante que o logger só funcionará
  // em ambiente de desenvolvimento, e não em produção
  // o filter() retornará o middleware apenas se a expressão resultar em `true`
  // caso contrário, retornará uma array vazia.
  process.env.NODE_ENV === "development" && logger,
  // thunk,
  sagaMiddleware,
].filter(Boolean);

const composeEnhancer =
  (process.env.NODE_ENV === "development" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

// createStore() foi preterido em favor de configureStore()
// no Redux Toolkit, que é uma versão melhorada e que evita bugs comuns.
// É recomendado que se evite usar createStore() exceto por razões de
// aprendizaado
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

// Saga Middleware tem uma forma de executar sagas que é diferente da forma
// como o Redux Thunk faz. Enquanto o Redux Thunk usa o método
// `store.dispatch()`, o Redux Saga usa o método `sagaMiddleware.run()`.
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
