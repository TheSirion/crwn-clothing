export const loggerMiddleware = store => next => action => {
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
