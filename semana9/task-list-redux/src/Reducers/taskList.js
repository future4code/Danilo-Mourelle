const initialState = {
  taskList: [
    {
      text: "Carregando Lista",
      id: 0,
      done: false,
    }
  ]
}

const updateTaskList = (state = initialState, action) => {
  let taskListCopy
  switch (action.type) {
    case 'SET_TASK_LIST':
      return {
        ...state,
        taskList: action.payload.taskList
      }

    case 'COMPLETE_TASK':
      taskListCopy = state.taskList.map(task =>
        task.id === action.payload.id ? { ...task, done: !task.done } : task
      )
      return {
        ...state,
        taskList: taskListCopy
      }

    default:
      return state;
  }
}

export default updateTaskList