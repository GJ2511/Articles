import { takeLatest, call, put, select } from 'redux-saga/effects';

import ArticleService from '../../services/articleService';

const initialState = {
    loading: true,
    articles: [],
    currentPage: 1,
    totalCount: 0,
    error: false,
};

const limit = 20;

const PREFIX = 'ARTICLES_LIST';
const GET_ARTICLES_LIST_REQUESTED = `${PREFIX}//GET_ARTICLES_LIST_REQUESTED`;
const GET_ARTICLES_LIST_SUCCESS = `${PREFIX}//GET_ARTICLES_LIST_SUCCESS`;
const GET_ARTICLES_LIST_ERROR = `${PREFIX}//GET_ARTICLES_LIST_ERROR`;
const SET_CURRENT_PAGE = `${PREFIX}//SET_CURRENT_PAGE`;

const articleListReducer = (state = initialState, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ARTICLES_LIST_REQUESTED:
            return {
                ...state,
                loading: true,
            };
        case GET_ARTICLES_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                articles: payload.articles,
                totalCount: payload.articlesCount / limit,
                ...(payload.resetPagination && { currentPage: 1 }),
            };
        case GET_ARTICLES_LIST_ERROR:
            return {
                ...state,
                ...initialState,
                error: true,
            };
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: payload,
            };
        }
        default:
            return state;
    }
};

export const getArticlesRequested = (resetPagination) => ({
    type: GET_ARTICLES_LIST_REQUESTED,
    payload: resetPagination,
});
export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page,
});
export const getState = (state) => state;

function* getArticles({ payload }) {
    try {
        const { articleListReducer, favTagReducer } = yield select();
        const resetPage = payload && payload.resetPage ? true : false;

        const params = {
            limit,
            offset: resetPage ? 0 : (articleListReducer.currentPage - 1) * limit,
            ...(favTagReducer.selectedTag && { tag: favTagReducer.selectedTag }),
        };

        const response = yield call([ArticleService, 'getArticles'], params);

        if (response.errors) {
            yield put({ type: GET_ARTICLES_LIST_ERROR });
        } else {
            yield put({
                type: GET_ARTICLES_LIST_SUCCESS,
                payload: { ...response, ...(resetPage && { resetPagination: true }) },
            });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: GET_ARTICLES_LIST_ERROR });
    }
}

export function* articleListSaga() {
    yield takeLatest(GET_ARTICLES_LIST_REQUESTED, getArticles);
}

export default articleListReducer;
