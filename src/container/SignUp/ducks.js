import { takeLatest, put, call } from 'redux-saga/effects';

import AuthService from '../../services/authService';
import { setSignInSuccess } from '../../ducks';

const PREFIX = 'SIGN_UP';
const SIGN_UP_REQUESTED = `${PREFIX}//SIGN_UP_REQUESTED`;
const SIGN_UP_SUCCESS = `${PREFIX}//SIGN_UP_SUCCESS`;
const SIGN_UP_FAILED = `${PREFIX}//SIGN_UP_FAILED`;

const initialState = {
    isSubmitting: false,
    error: {},
};

const signUpReducer = (state = initialState, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case SIGN_UP_REQUESTED:
            return {
                ...state,
                isSubmitting: true,
                error: {},
            };
        case SIGN_UP_FAILED:
            return {
                ...state,
                isSubmitting: false,
                error: payload,
            };
        default:
            return state;
    }
};

export const signUpRequested = (values) => ({
    type: SIGN_UP_REQUESTED,
    payload: values,
});

function* signUp({ payload: { username, email, password } }) {
    try {
        const response = yield call([AuthService, 'signup'], { username, email, password });

        if (response.errors) {
            yield put({ type: SIGN_UP_FAILED, payload: response.errors });
        } else {
            yield put({ type: SIGN_UP_SUCCESS });
            yield put(setSignInSuccess(response.user));
        }
    } catch (error) {
        yield put({
            type: SIGN_UP_FAILED,
            payload: {
                Error: 'Something went wrong',
            },
        });
    }
}

export function* signUpSaga() {
    yield takeLatest(SIGN_UP_REQUESTED, signUp);
}

export const actions = {
    signUpRequested,
};

export default signUpReducer;
