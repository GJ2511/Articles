import { takeLatest, call, put, delay, select } from 'redux-saga/effects';

import ArticleService from '../../services/articleService';
import historyService from '../../services/historyService';

const initialState = {
    article: {},
    error: {},
    loading: false,
    successMsg: '',
};

const PREFIX = 'ARTICLE';
const GET_ARTICLE_REQUESTED = `${PREFIX}//GET_ARTICLE_REQUESTED`;
const GET_ARTICLE_SUCCESS = `${PREFIX}//GET_ARTICLE_SUCCESS`;
const GET_ARTICLE_ERROR = `${PREFIX}//GET_ARTICLE_ERROR`;
const UPDATE_ARTICLE_REQUESTED = `${PREFIX}//UPDATE_ARTICLE_REQUESTED`;
const CREATE_ARTICLE_REQUESTED = `${PREFIX}//CREATE_ARTICLE_REQUESTED`;
const CREATE_ARTICLE_SUCCESS = `${PREFIX}//CREATE_ARTICLE_SUCCESS`;
const CREATE_ARTICLE_ERROR = `${PREFIX}//CREATE_ARTICLE_ERROR`;
const RESET = `${PREFIX}//RESET`;

const articleReducer = (state = initialState, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ARTICLE_REQUESTED:
        case CREATE_ARTICLE_REQUESTED:
        case UPDATE_ARTICLE_REQUESTED:
            return {
                ...state,
                loading: true,
            };
        case GET_ARTICLE_SUCCESS:
        case CREATE_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {},
                ...payload,
            };
        case GET_ARTICLE_ERROR:
        case CREATE_ARTICLE_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case RESET:
            return {
                ...state,
                ...initialState,
            };
        default:
            return state;
    }
};

export const getState = (state) => state && state.articleReducer;
export const getArticleRequest = (slug) => ({ type: GET_ARTICLE_REQUESTED, payload: slug });
export const createArticle = (values) => ({ type: CREATE_ARTICLE_REQUESTED, payload: values });
export const updateArticleRequest = (values, slug) => ({ type: UPDATE_ARTICLE_REQUESTED, payload: { values, slug } });
export const reset = () => ({ type: RESET });

function* makeRequest(service, payload, update = false) {
    const text = update ? 'Updated' : 'Created';

    try {
        const response = yield call([ArticleService, service], payload);

        if (response.errors) {
            yield put({ type: CREATE_ARTICLE_ERROR, payload: response.errors });
        } else {
            yield put({
                type: CREATE_ARTICLE_SUCCESS,
                payload: { successMsg: `Article ${text} Successfully. Redirecting to Article Detail page` },
            });
            yield delay(800);
            yield call([historyService, 'forwardTo'], `/article/${response.article.slug}`);
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

function* postArticle({ payload }) {
    yield call([this, makeRequest], 'createArticle', payload);
}

function* updateArticle({ payload: { values, slug } }) {
    const state = yield select(getState);

    if (state.article.title === values.title) {
        delete values.title;
    }

    yield call([this, makeRequest], 'updateArticle', { values, slug }, true);
}

function* getArticle({ payload: slug }) {
    try {
        const response = yield call([ArticleService, 'getArticle'], slug);

        if (response.errors) {
            yield put({ type: GET_ARTICLE_ERROR, payload: response.errors });
        } else {
            yield put({
                type: GET_ARTICLE_SUCCESS,
                payload: response,
            });
        }
    } catch (error) {
        yield put({
            type: GET_ARTICLE_ERROR,
            payload: {
                Error: ['Something went wrong'],
            },
        });
    }
}

export function* articleSaga() {
    yield takeLatest(CREATE_ARTICLE_REQUESTED, postArticle);
    yield takeLatest(UPDATE_ARTICLE_REQUESTED, updateArticle);
    yield takeLatest(GET_ARTICLE_REQUESTED, getArticle);
}

export default articleReducer;
