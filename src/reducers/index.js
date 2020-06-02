import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import applicationReducer from '../ducks';
import signUpReducer from '../container/SignUp/ducks';
import signInReducer from '../container/SignIn/ducks';
import favTagReducer from '../container/FavTag/ducks';
import articleListReducer from '../container/ArticleList/ducks';
import articleReducer from '../container/Article/ducks';
import commentReducer from '../container/Comment/ducks';

const rootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        applicationReducer,
        signUpReducer,
        signInReducer,
        favTagReducer,
        articleListReducer,
        articleReducer,
        commentReducer,
    });

export default rootReducer;
