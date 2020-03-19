const initialState = {
  filterCriterion: 'all'
}

const setVisibilityFilter = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER_TASK_LIST':
      return { ...state, filterCriterion: action.payload.filtro }
    default:
      return state
  }
}

export default setVisibilityFilter

