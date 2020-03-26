const initialState = {
  detaieldTripId: '',
  tripDetails: [],
  candidates:[]
}

const tripDetails = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TRIP_TO_DETAIL':
      return { ...state, detaieldTripId: action.payload.id}
    default:
      return state;
  }
}

export default tripDetails