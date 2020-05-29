import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import signUpReducer from '../container/SignUp/ducks';

const rootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        signUpReducer,
    });

export default rootReducer;
