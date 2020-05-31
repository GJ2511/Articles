import { takeLatest, call, put } from 'redux-saga/effects';

import ArticleService from '../../services/articleService';

const initialState = {
    loading: false,
    error: {},
    successMsg: '',
};

const PREFIX = 'ARTICLE';
const GET_ARTICLE_REQUESTED = `${PREFIX}//GET_ARTICLE_REQUESTED`;
const GET_ARTICLE_SUCCESS = `${PREFIX}//GET_ARTICLE_SUCCESS`;
const GET_ARTICLE_ERROR = `${PREFIX}//GET_ARTICLE_ERROR`;
const CREATE_ARTICLE_REQUESTED = `${PREFIX}//CREATE_ARTICLE_REQUESTED`;
const CREATE_ARTICLE_SUCCESS = `${PREFIX}//CREATE_ARTICLE_SUCCESS`;
const CREATE_ARTICLE_ERROR = `${PREFIX}//CREATE_ARTICLE_ERROR`;

const articleReducer = (state = initialState, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ARTICLE_REQUESTED:
            return {
                ...state,
                loading: true,
            };
        case GET_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                ...payload,
            };
        case GET_ARTICLE_ERROR:
            return {
                ...state,
                ...initialState,
                error: true,
            };
        case CREATE_ARTICLE_REQUESTED:
            return {
                ...state,
                loading: true,
            };
        case CREATE_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload,
            };
        case CREATE_ARTICLE_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
};

export const getState = (state) => state;
export const createArticle = (values) => ({ type: CREATE_ARTICLE_REQUESTED, payload: values });

function* postArticle({ payload }) {
    try {
        const response = yield call([ArticleService, 'createArticle'], payload);

        if (response.errors) {
            yield put({ type: CREATE_ARTICLE_ERROR, payload: response.errors });
        } else {
            yield put({
                type: CREATE_ARTICLE_SUCCESS,
                payload: 'Article Created Successfully. Redirecting to Article Detail page',
            });
        }
    } catch (error) {
        yield put({
            type: CREATE_ARTICLE_ERROR,
            payload: {
                Error: ['Something went wrong'],
            },
        });
    }
}

export function* articleSaga() {
    yield takeLatest(CREATE_ARTICLE_REQUESTED, postArticle);
}

export default articleReducer;
