import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import FeedPage from "../FeedPage";
import RegisterPage from "../RegisterPage";
import PostPage from "../PostPage";

export const routes = {
  login: "/",
  feed: "/feed",
  register: "/register",
  post: "/post"
};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route exact path={routes.login} component={LoginPage} />
        <Route exact path={routes.feed} component={FeedPage} />
        <Route exact path={routes.register} component={RegisterPage} />
        <Route exact path={routes.post} component={PostPage} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
