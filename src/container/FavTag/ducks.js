import { takeLatest, call, put } from 'redux-saga/effects';

import TagService from '../../services/tagService';

const initialState = {
    loading: true,
    tags: [],
    selectedTag: '',
};

const PREFIX = 'FAV_TAG';
const FAV_TAG_REQUESTED = `${PREFIX}//FAV_TAG_REQUESTED`;
const FAV_TAG_SUCCESS = `${PREFIX}//FAV_TAG_SUCCESS`;
const FAV_TAG_ERROR = `${PREFIX}//FAV_TAG_ERROR`;
const SET_SELECTED_TAG = `${PREFIX}//SET_SELECTED_TAG`;

const favTagReducer = (state = initialState, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case FAV_TAG_SUCCESS:
            return {
                ...state,
                loading: false,
                tags: payload,
            };
        case FAV_TAG_ERROR:
            return {
                ...state,
                loading: false,
                tags: [],
            };
        case SET_SELECTED_TAG:
            return {
                ...state,
                selectedTag: payload,
            };
        default:
            return state;
    }
};

export const favTagRequested = () => ({ type: FAV_TAG_REQUESTED });
export const setSeletedTag = (isSelected, val) => ({ type: SET_SELECTED_TAG, payload: !isSelected ? val : '' });
export const getSeletedTag = (state) => state.favTagReducer.selectedTag;

function* favTag() {
    try {
        const response = yield call([TagService, 'getTags']);

        if (response.errors) {
            yield put({ type: FAV_TAG_ERROR });
        } else {
            yield put({ type: FAV_TAG_SUCCESS, payload: response.tags });
        }
    } catch (error) {
        yield put({ type: FAV_TAG_ERROR });
    }
}

export function* favTagSaga() {
    yield takeLatest(FAV_TAG_REQUESTED, favTag);
}

export const actions = {
    favTagRequested,
    setSeletedTag,
};

export default favTagReducer;
