import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import ApplyTripPage from "../ApplyTripPage";
import CreateTripPage from "../CreateTripPage";
import ListTripPages from "../ListTripsPage"
import LoginPage from "../LoginPage";
import tripsDetailsPage from "../TripDetailsPage"

export const routes = {
  root: '/',
  application: '/application-form',
  tripCreation: '/trips/create',
  tripsList: '/trips/list',
  tripsDetails: '/trips/details'
  
};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route exact path={routes.root} component={LoginPage} />
        <Route exact path={routes.application} component={ApplyTripPage} />
        <Route exact path={routes.tripCreation} component={CreateTripPage} />
        <Route exact path={routes.tripsList} component={ListTripPages} />
        <Route exact path={routes.tripsDetails} component={tripsDetailsPage} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
