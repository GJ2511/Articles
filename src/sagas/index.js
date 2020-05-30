import { all } from 'redux-saga/effects';

import { applicationSaga } from '../ducks';
import { signUpSaga } from '../container/SignUp/ducks';
import { signInSaga } from '../container/SignIn/ducks';
import { favTagSaga } from '../container/FavTag/ducks';

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([applicationSaga(), signUpSaga(), signInSaga(), favTagSaga()]);
}
