import { takeLatest, call, put } from 'redux-saga/effects';

import CommentService from '../../services/commentService';

const initialState = {
    comments: [],
    loading: false,
    requesting: false,
};

const PREFIX = 'COMMENT';
const GET_COMMENTS_REQUESTED = `${PREFIX}//GET_COMMENTS_REQUESTED`;
const GET_COMMENTS_SUCCESS = `${PREFIX}//GET_COMMENTS_SUCCESS`;
const GET_COMMENTS_ERROR = `${PREFIX}//GET_COMMENTS_ERROR`;
const ADD_COMMENT_REQUESTED = `${PREFIX}//ADD_COMMENT_REQUESTED`;
const ADD_COMMENT_SUCCESS = `${PREFIX}//ADD_COMMENT_SUCCESS`;
const RESET = `${PREFIX}//RESET`;

const commentReducer = (state = initialState, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case GET_COMMENTS_REQUESTED:
            return {
                ...state,
                loading: true,
            };
        case GET_COMMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: [...payload],
            };
        case GET_COMMENTS_ERROR:
            return {
                ...state,
                loading: false,
                comments: [],
            };
        case ADD_COMMENT_REQUESTED:
            return {
                ...state,
                requesting: true,
            };
        case ADD_COMMENT_SUCCESS: {
            const { comments } = state;

            return {
                ...state,
                requesting: false,
                comments: [payload, ...comments],
            };
        }
        case RESET:
            return {
                ...state,
                ...initialState,
            };
        default:
            return state;
    }
};

export const getCommentsRequested = (slug) => ({ type: GET_COMMENTS_REQUESTED, payload: slug });
export const addNewComment = () => ({ type: ADD_COMMENT_REQUESTED });
export const reset = () => ({ type: RESET });

function* getComments({ payload }) {
    try {
        const response = yield call([CommentService, 'getComments'], payload);

        if (response.errors) {
            yield put({ type: GET_COMMENTS_ERROR });
        } else {
            yield put({
                type: GET_COMMENTS_SUCCESS,
                payload: response.comments,
            });
        }
    } catch (error) {
        yield put({ type: GET_COMMENTS_ERROR });
    }
}

function* addComment() {
    console.log('addComment');
    yield call();
    //dummy for now
}

export function* commentSaga() {
    yield takeLatest(GET_COMMENTS_REQUESTED, getComments);
    yield takeLatest(ADD_COMMENT_REQUESTED, addComment);
}

export default commentReducer;
