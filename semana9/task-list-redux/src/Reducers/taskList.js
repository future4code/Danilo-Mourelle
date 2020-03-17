const initialState = {
  taskList: [
    {
      text: "Use Redux",
      id: 0,
      completed: false,
    }
  ]
}

const updateTaskList = (state = initialState, action) => {
  let taskListCopy
  switch (action.type) {
    case 'ADD_TASK':
      taskListCopy = [...state.taskList]
      const novaTask = {
        text: action.payload.text,
        id: Date.now(),
        completed: false
      }
      taskListCopy.push(novaTask)
      return {
        ...state,
        taskList: taskListCopy
      }

    case 'COMPLETE_TASK':
      taskListCopy = [...state.taskList]
      let novaLista = taskListCopy.map(task =>
        task.id === action.payload.id ? { ...task, completed: !task.completed } : task
      )
      return {
        ...state,
        taskList: novaLista
      }

    case 'DELETE_TASK':
      taskListCopy = state.taskList.filter(task =>
        task.id !== action.payload.id)
      return  {
        ...state,
        taskList: taskListCopy
      }

    case 'COMPLETE_ALL':
      return state.taskList.map(task => (
        { ...task, complete: true }
      ))

    case 'REMOVE_ALL_COMPLETE':
      return state.taskList.filter(task =>
        task !== task.complete)
    default:
      return state;
  }
}

export default updateTaskList