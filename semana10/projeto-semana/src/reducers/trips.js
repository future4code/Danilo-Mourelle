const initialState = {
  tripList: [],
}

const tripsInfo = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TRIPS_LIST':
      return { ...state, tripList: action.payload.list };
    default:
      return state;
  }
}

export default tripsInfo