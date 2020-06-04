import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import AuthService from './services/authService';

import NotFound from './component/NotFound';
import SignUpContainer from './container/SignUp/SignUpContainer';
import SignInContainer from './container/SignIn/SignInContainer';
import ArticleListContainer from './container/ArticleList/ArticleListContainer';
import CreateArticleContainer from './container/Article/CreateArticleContainer';
import EditArticleContainer from './container/Article/EditArticleContainer';
import ArticleContainer from './container/Article/ArticleContainer';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                AuthService.getLoggedInUser() !== null ? <Component {...props} /> : <Redirect to="/signin" />
            }
        />
    );
};

ProtectedRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (AuthService.getLoggedInUser() === null ? <Component {...props} /> : <Redirect to="/" />)}
    />
);

PublicRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

function Routes() {
    return (
        <>
            <Switch>
                <Route path={['/', '/articles', '/Articles/']} exact>
                    <ArticleListContainer />
                </Route>
                <ProtectedRoute path="/new/article" exact component={CreateArticleContainer} />
                <ProtectedRoute path="/edit/article/:slug" component={EditArticleContainer} />
                <Route path="/article/:slug">
                    <ArticleContainer />
                </Route>
                <PublicRoute path="/signin" component={SignInContainer} />
                <PublicRoute path="/signup" component={SignUpContainer} />
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </>
    );
}

export default Routes;
