import { all } from 'redux-saga/effects';

import { applicationSaga } from '../ducks';
import { signUpSaga } from '../container/SignUp/ducks';

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([applicationSaga(), signUpSaga()]);
}
