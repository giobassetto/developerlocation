import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import reducers from './ducks';

const middlewares = [];
const sagaMonitor = process.env.NODE_ENV === 'development' ? console.tron.createSagaMonitor() : null;
const sagaMiddlewares = createSagaMiddleware({ sagaMonitor });
middlewares.push(sagaMiddlewares);
const tron = process.env.NODE_ENV === 'development' ? console.tron.createEnhancer : () => {};

const store = createStore(
  reducers,
  compose(
    applyMiddleware(...middlewares),
    tron(),
  ),
);

sagaMiddlewares.run(sagas);

export default store;
