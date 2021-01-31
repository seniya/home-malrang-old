import { History } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware, { Task } from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import modules from './modules';

export interface SagaStore extends Store {
  sagaTask?: Task;
}

export type RootState = ReturnType<ReturnType<typeof modules.rootReducer>>;

export default function configureStore(initialState: any, history: History) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware, routerMiddleware(history), createLogger()];
  // const store = createStore(modules.rootReducer, applyMiddleware(sagaMiddleware));

  // const store_ = createStore(
  //   modules.rootReducer(history),
  //   initialState,
  //   compose(applyMiddleware(sagaMiddleware)),
  // );

  const store = createStore(
    modules.rootReducer(history),
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
  );

  (store as SagaStore).sagaTask = sagaMiddleware.run(modules.rootSaga);

  // sagaMiddleware.run(modules.rootSaga);
  // export type RootState = ReturnType<ReturnType<typeof modules.rootReducer>>;

  return store;
}
