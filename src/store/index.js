import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import historyService from '../services/historyService';
import rootSaga from '../sagas';
import rootReducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();
const enhancer = [applyMiddleware(routerMiddleware(historyService.history), sagaMiddleware)];

export const configureStore = (initialState = {}) => {
    const store = createStore(rootReducer(historyService.history), initialState, compose(...enhancer));

    sagaMiddleware.run(rootSaga);
    return store;
};

const store = configureStore();

export { store };
