import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import AuthService from './services/authService';
import ArticleDetails from './component/ArticleDetails';
import SignUpContainer from './container/SignUp/SignUpContainer';
import SignInContainer from './container/SignIn/SignInContainer';
import ArticleListContainer from './container/ArticleList/ArticleListContainer';
import CreateArticle from './container/Article/CreateArticle';
import EditArticle from './container/Article/EditArticle';

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
                <ProtectedRoute path={['/', '/article']} exact component={ArticleListContainer} />
                <ProtectedRoute path={'/new/article'} exact component={CreateArticle} />
                <ProtectedRoute path={'/edit/article'} exact component={EditArticle} />
                <PublicRoute path="/signin" component={SignInContainer} />
                <PublicRoute path="/signup" component={SignUpContainer} />
                <ProtectedRoute path="/article/{name}" component={ArticleDetails} />
                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
        </>
    );
}

export default Routes;
