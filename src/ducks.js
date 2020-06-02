import { takeLatest, call } from 'redux-saga/effects';

import authService from './services/authService';
import historyService from './services/historyService';

const PREFIX = 'APPLICATION';

const SIGN_IN_SUCCESS = `${PREFIX}//SIGN_IN_SUCCESS`;
const SIGN_OUT_REQUESTED = `${PREFIX}//SIGN_OUT_REQUESTED`;

export const initialState = {
    authenticated: authService.getLoggedInUser() === null ? false : true,
    currentUser: authService.getLoggedInUser() === null ? {} : authService.getLoggedInUser(),
};

const applicationReducer = (state = initialState, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                authenticated: true,
                currentUser: payload,
            };
        case SIGN_OUT_REQUESTED:
            return {
                ...state,
                authenticated: false,
                currentUser: {},
            };
        default:
            return state;
    }
};

function* signIn({ payload }) {
    yield call([authService, 'setLoggedInUser'], payload);
    yield call([historyService, 'forwardTo'], '/');
}

function* signOut() {
    yield call([authService, 'signout']);
    yield call([historyService, 'forwardTo'], '/signin');
}

export const signOutRequested = () => ({ type: SIGN_OUT_REQUESTED });
export const setSignInSuccess = (payload) => ({ type: SIGN_IN_SUCCESS, payload });
export const getIsAuthenticated = ({ application }) => application.authenticated;

export function* applicationSaga() {
    yield takeLatest(SIGN_IN_SUCCESS, signIn);
    yield takeLatest(SIGN_OUT_REQUESTED, signOut);
}

export const actions = {
    setSignInSuccess,
};

export const selectors = {
    getIsAuthenticated,
};

export default applicationReducer;
