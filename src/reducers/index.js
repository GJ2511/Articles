import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import applicationReducer from '../ducks';
import signUpReducer from '../container/SignUp/ducks';

const rootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        applicationReducer,
        signUpReducer,
    });

export default rootReducer;
