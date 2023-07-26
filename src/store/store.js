import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";

import { rootReducer } from "./root-reducer";

const loggerMiddleware = store => next => action => {
  if (!action.type) {
    return next(action);
  }

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState());

  // envia a ação para o próximo middleware e para os redutores
  next(action);

  // agora podemos ver o próximo estado porque ele já foi passado para frente
  console.log("next state: ", store.getState());
};

const middlewares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middlewares));

// createStore() foi preterido em favor de configureStore()
// no Redux Toolkit, que é uma versão melhorada e que evita bugs comuns.
// É recomendado que se evite usar createStore() exceto por razões de
// aprendizaado
export const store = createStore(rootReducer, undefined, composedEnhancers);
