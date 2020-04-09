const initialState = {
  taskList: []
}

export const tasks = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TASK_LIST':
      return { ...state, taskList: action.payload.list }
    default:
      return { ...state }
      break;
  }
}

export default tasks