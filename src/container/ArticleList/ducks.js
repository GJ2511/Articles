import { takeLatest, call, put, select } from 'redux-saga/effects';
import map from 'lodash/map';

import ArticleService from '../../services/articleService';
import AuthService from '../../services/authService';

const initialState = {
    loading: true,
    articles: [],
    currentPage: 1,
    totalCount: 0,
    error: false,
    myFavArticle: false,
    myArticle: false,
};

const limit = 20;

const PREFIX = 'ARTICLES_LIST';
const GET_ARTICLES_LIST_REQUESTED = `${PREFIX}//GET_ARTICLES_LIST_REQUESTED`;
const GET_ARTICLES_LIST_SUCCESS = `${PREFIX}//GET_ARTICLES_LIST_SUCCESS`;
const GET_ARTICLES_LIST_ERROR = `${PREFIX}//GET_ARTICLES_LIST_ERROR`;
const TOGGLE_FAVORITE = `${PREFIX}//TOGGLE_FAVORITE`;
const MARK_FAVORITE = `${PREFIX}//MARK_FAVORITE`;
const UNMARK_FAVORITE = `${PREFIX}//UNMARK_FAVORITE`;
const SET_CURRENT_PAGE = `${PREFIX}//SET_CURRENT_PAGE`;
const TOGGLE_MY_FAV_ARTICLE = `${PREFIX}//TOGGLE_MY_FAV_ARTICLE`;
const TOGGLE_MY_ARTICLE = `${PREFIX}//TOGGLE_MY_ARTICLE`;

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
                totalCount: Math.floor(payload.articlesCount / limit),
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
        case UNMARK_FAVORITE: {
            const { articles } = state;

            return {
                ...state,
                articles: map(articles, (article) =>
                    article.slug === payload
                        ? { ...article, favorited: false, favoritesCount: article.favoritesCount - 1 }
                        : article
                ),
            };
        }
        case MARK_FAVORITE: {
            const { articles } = state;

            return {
                ...state,
                articles: map(articles, (article) =>
                    article.slug === payload
                        ? { ...article, favorited: true, favoritesCount: article.favoritesCount + 1 }
                        : article
                ),
            };
        }
        case TOGGLE_MY_FAV_ARTICLE: {
            return {
                ...state,
                myFavArticle: payload,
            };
        }
        case TOGGLE_MY_ARTICLE: {
            return {
                ...state,
                myArticle: payload,
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
export const toggleFavoriteRequested = (payload) => ({
    type: TOGGLE_FAVORITE,
    payload,
});
export const toggleMyFavArticle = (payload) => ({
    type: TOGGLE_MY_FAV_ARTICLE,
    payload,
});
export const toggleMyArticle = (payload) => ({
    type: TOGGLE_MY_ARTICLE,
    payload,
});

export const getState = (state) => state;

function* getArticles({ payload }) {
    try {
        const loggedInUser = AuthService.getLoggedInUser();
        const { articleListReducer, favTagReducer } = yield select();
        const resetPage = payload && payload.resetPage ? true : false;

        const params = {
            limit,
            offset: resetPage ? 0 : (articleListReducer.currentPage - 1) * limit,
            ...(favTagReducer.selectedTag && { tag: favTagReducer.selectedTag }),
            ...(articleListReducer.myArticle && loggedInUser !== null && { author: loggedInUser.username }),
            ...(articleListReducer.myFavArticle && loggedInUser !== null && { favorited: loggedInUser.username }),
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
        yield put({ type: GET_ARTICLES_LIST_ERROR });
    }
}

function* toggleFavorite({ payload: { slug, favorited } }) {
    const service = favorited ? 'unmarkArticleFav' : 'markArticleFav';

    try {
        yield call([ArticleService, service], slug);

        if (favorited) {
            yield put({
                type: UNMARK_FAVORITE,
                payload: slug,
            });
        } else {
            yield put({
                type: MARK_FAVORITE,
                payload: slug,
            });
        }
    } catch (error) {
        yield put({ type: GET_ARTICLES_LIST_ERROR });
    }
}

export function* articleListSaga() {
    yield takeLatest(GET_ARTICLES_LIST_REQUESTED, getArticles);
    yield takeLatest(TOGGLE_FAVORITE, toggleFavorite);
}

export default articleListReducer;
