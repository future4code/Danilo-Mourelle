import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import tripsInfo from "./trips"

export const generateReducers = history =>
  combineReducers({
    router: connectRouter(history),
    trips:tripsInfo
    // Outros reducers aqui
  });
