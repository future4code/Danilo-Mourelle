const initialState = {
  taksList: []
}

const updateTaskList = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state,
      {
        text: action.payload.text,
        id: Date.now(),
        complete: false
      }]

    case 'COMPLETE_TASK':
      return state.map(task => {
        if (task.id === action.payload.id) {
          return { ...task, complete: !task.complete }
        } else {
          return task
        }
      })

    case 'DELETE_TASK':
      return state.filter(task =>
        task.id !== action.payload.id)

    case 'COMPLETE_ALL':
      return state.map(task => (
        { ...task, complete: true }
      ))

      case 'REMOVE_ALL_COMPLETE':
        return state.filter(task =>
          task !== task.complete)
  }
}

export default updateTaskList