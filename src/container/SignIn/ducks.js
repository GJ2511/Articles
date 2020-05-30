import { takeLatest, put, call } from 'redux-saga/effects';

import AuthService from '../../services/authService';
import { setSignInSuccess } from '../../ducks';

const PREFIX = 'SIGN_IN';
const SIGN_IN_REQUESTED = `${PREFIX}//SIGN_IN_REQUESTED`;
const SIGN_IN_SUCCESS = `${PREFIX}//SIGN_IN_SUCCESS`;
const SIGN_IN_FAILED = `${PREFIX}//SIGN_IN_FAILED`;

const initialState = {
    isSubmitting: false,
    error: {},
};

const signInReducer = (state = initialState, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case SIGN_IN_REQUESTED:
            return {
                ...state,
                isSubmitting: true,
                error: {},
            };
        case SIGN_IN_FAILED:
            return {
                ...state,
                isSubmitting: false,
                error: payload,
            };
        default:
            return state;
    }
};

export const signInRequested = (values) => ({
    type: SIGN_IN_REQUESTED,
    payload: values,
});

function* signIn({ payload: { email, password } }) {
    try {
        const response = yield call([AuthService, 'signin'], { email, password });

        if (response.errors) {
            yield put({ type: SIGN_IN_FAILED, payload: response.errors });
        } else {
            yield put({ type: SIGN_IN_SUCCESS });
            yield put(setSignInSuccess(response.user));
        }
    } catch (error) {
        yield put({
            type: SIGN_IN_FAILED,
            payload: {
                Error: ['Something went wrong'],
            },
        });
    }
}

export function* signInSaga() {
    yield takeLatest(SIGN_IN_REQUESTED, signIn);
}

export const actions = {
    signInRequested,
};

export default signInReducer;
