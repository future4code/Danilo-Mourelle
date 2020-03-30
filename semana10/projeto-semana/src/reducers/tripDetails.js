const initialState = {
  detaieldTripId: '',
  tripDetails: undefined,
}

const tripDetails = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TRIP_ID_TO_DETAIL':
      return { ...state, detaieldTripId: action.payload.id }
    case 'SET_TRIP_DETAILS':
      return { ...state, tripDetails: action.payload.details}
    default:
      return state;
  }
}

export default tripDetails