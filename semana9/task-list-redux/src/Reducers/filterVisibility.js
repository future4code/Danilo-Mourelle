const initialState = {
  filterCriterion: 'todos'
}

const setVisibilityFilter = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER_TASK_LIST':
      return { ...state, filterCriterion: action.payloat.filtro }
    default:
      return state
  }
}

export default setVisibilityFilter

