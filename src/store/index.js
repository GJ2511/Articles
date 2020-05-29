import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import rootReducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();
const enhancer = [applyMiddleware(sagaMiddleware)];

export const configureStore = (initialState = {}) => {
    const store = createStore(rootReducer, initialState, compose(...enhancer));

    sagaMiddleware.run(rootSaga);
    return store;
};

const store = configureStore();

export { store };
