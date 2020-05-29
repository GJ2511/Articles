import { combineReducers } from 'redux';

const dummyReducer = (state = {}, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case 'DUMMY':
            return { ...state, ...payload };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    dummyReducer,
});

export default rootReducer;
