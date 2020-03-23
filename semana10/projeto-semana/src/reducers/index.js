import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import tripList from "./trips"

export const generateReducers = history =>
  combineReducers({
    router: connectRouter(history),
    trips:tripList
    // Outros reducers aqui
  });
