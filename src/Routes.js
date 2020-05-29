import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import ArticleDetails from './component/ArticleDetails';
import SignIn from './component/SignIn';
import SignUp from './component/SignUp';
import Articles from './component/Articles';

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (rest.loggedInUser !== null ? <Component {...props} /> : <Redirect to="/signin" />)}
    />
);

ProtectedRoute.propTypes = {
    component: PropTypes.objectOf(PropTypes.element),
};

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (rest.loggedInUser === null ? <Component {...props} /> : <Redirect to="/" />)}
    />
);

PublicRoute.propTypes = {
    component: PropTypes.objectOf(PropTypes.element),
};

function Routes({ loggedInUser }) {
    return (
        <>
            <Switch>
                <ProtectedRoute path={['/', '/article']} exact component={Articles} loggedInUser={loggedInUser} />
                <PublicRoute path="/signin" component={SignIn} loggedInUser={loggedInUser} />
                <PublicRoute path="/signup" component={SignUp} loggedInUser={loggedInUser} />
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
