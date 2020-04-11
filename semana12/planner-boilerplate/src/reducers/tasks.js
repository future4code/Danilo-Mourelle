const initialState = {
  tasksList: []
}

export const tasks = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TASK_LIST':
      return { ...state, tasksList: action.payload.list }
    default:
      return { ...state }
  }
}
export default tasks