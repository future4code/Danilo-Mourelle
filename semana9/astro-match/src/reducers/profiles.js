const initialState = {
  matches: [],
  actualProfile: undefined,

}

const profiles = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MATCHES_LIST':
      return {
        ...state,
        matches: action.payload.matchesList
      }
      case 'ACTUAL_PROFILE':
        return{
          ...state,
          actualProfile: action.payload.profile
        }
    default:
      return state
  }
}

export default profiles
