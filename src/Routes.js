import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import AuthService from './services/authService';
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
                <Route path="/" exact>
                    <ArticleListContainer />
                </Route>
                <ProtectedRoute path="/new/article" exact component={CreateArticleContainer} />
                <ProtectedRoute path="/edit/article/:slug" component={EditArticleContainer} />
                <ProtectedRoute path="/article/:slug" component={ArticleContainer} />
                <PublicRoute path="/signin" component={SignInContainer} />
                <PublicRoute path="/signup" component={SignUpContainer} />
                <Route exact path="/article/{slug}">
                    <div> ARTICLE DETAIL </div>
                </Route>
                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
        </>
    );
}

export default Routes;
