import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import AuthService from './services/authService';
import ArticleDetails from './component/ArticleDetails';
import SignUpContainer from './container/SignUp/SignUpContainer';
import SignIn from './component/SignIn';
import Articles from './component/Articles';

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

function Routes({ loggedInUser }) {
    return (
        <>
            <Switch>
                <ProtectedRoute path={['/', '/article']} exact component={Articles} loggedInUser={loggedInUser} />
                <PublicRoute path="/signin" component={SignIn} loggedInUser={loggedInUser} />
                <PublicRoute path="/signup" component={SignUpContainer} loggedInUser={loggedInUser} />
                <ProtectedRoute path="/article/{name}" component={ArticleDetails} loggedInUser={loggedInUser} />
                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
        </>
    );
}

Routes.propTypes = {
    loggedInUser: PropTypes.object,
};

export default Routes;
