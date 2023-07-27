import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

import { loggerMiddleware } from "./middleware/logger";
import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
  // process.env.NODE_ENV === 'development' garante que o logger só funcionará
  // em ambiente de desenvolvimento, e não em produção
  // o filter() retornará o middleware apenas se a expressão resultar em `true`
  // caso contrário, retornará uma array vazia.
  process.env.NODE_ENV === "development" && loggerMiddleware,
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

export const persistor = persistStore(store);
