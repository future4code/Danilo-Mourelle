const initialState = {
  tripList: [],
  detaieldTripId: ''
}

const tripsInfo = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TRIPS_LIST':
      return { ...state, tripList: action.payload.list };
    case 'SET_TRIP_TO_DETAIL':
      return { ...state, detaieldTripId: action.payload.id}
    default:
      return state;
  }
}

export default tripsInfo