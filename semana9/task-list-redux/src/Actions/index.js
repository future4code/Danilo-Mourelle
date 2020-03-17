export const addTaskToList = text => {
  return {
    type: 'ADD_TASK',
    payload: {
      text: text,
    }
  }
}

export const completeTask = id => {
  return {
    type: 'COMPLETE_TASK',
    payload: {
      id:id 
    }
  }
}

export const deleteTaks = id => {
  return{
    type: 'DELETE_TASK',
    payload:{
      id:id
    }
  }
}

export const completeAll = () => {
  return {
    type: 'COMPLETE_ALL'
  }
}

export const removeComplete = () => {
  return {
    type: 'REMOVE_ALL_COMPLETE'
  }
}

export const setVisibility = (filtro) => {
  return {
    type: 'FILTER_TASK_LIST',
    payload: {
      filtro:filtro
    }
  }
}