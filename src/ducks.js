import { takeLatest, call } from 'redux-saga/effects';

import authService from './services/authService';
import historyService from './services/historyService';

const PREFIX = 'APPLICATION';

const SIGN_IN_SUCCESS = `${PREFIX}//SIGN_IN_SUCCESS`;

export const initialState = {
    authenticated: authService.getLoggedInUser() === null ? false : true,
};

const applicationReducer = (state = initialState, action = {}) => {
    const { type } = action;

    switch (type) {
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                authenticated: true,
            };
        default:
            return state;
    }
};

function* signIn({ payload }) {
    yield call([authService, 'setLoggedInUser'], payload);
    yield call([historyService, 'forwardTo'], '/article');
}

export const setSignInSuccess = (payload) => {
    return { type: SIGN_IN_SUCCESS, payload };
};
export const getIsAuthenticated = ({ application }) => application.authenticated;

export function* applicationSaga() {
    yield takeLatest(SIGN_IN_SUCCESS, signIn);
}

export const actions = {
    setSignInSuccess,
};

export const selectors = {
    getIsAuthenticated,
};

export default applicationReducer;
