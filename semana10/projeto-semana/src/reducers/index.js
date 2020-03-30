import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import tripsInfo from "./trips"
import tripDetails from './tripDetails'


export const generateReducers = history =>
  combineReducers({
    router: connectRouter(history),
    trips: tripsInfo,
    details: tripDetails

    // Outros reducers aqui
  });
