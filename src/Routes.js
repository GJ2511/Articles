import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import ArticleDetails from "./component/ArticleDetails";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import Articles from "./component/Articles";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.loggedInUser !== null
      ? <Component {...props} />
      : <Redirect to='/signin' />
  )} />
)

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.loggedInUser === null
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

function Routes({loggedInUser}) {
  return (
      <>
        <Switch>
          <ProtectedRoute path={["/", "/article"]} exact component={Articles} loggedInUser={loggedInUser}/>
          <PublicRoute path="/signin" component={SignIn} loggedInUser={loggedInUser}/>
          <PublicRoute path="/signup" component={SignUp} loggedInUser={loggedInUser}/>
          <ProtectedRoute path="/article/{name}" component={ArticleDetails} loggedInUser={loggedInUser}/>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </>
  );
}

export default Routes;