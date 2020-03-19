import axios from 'axios'

export const setTasksList = taskList => {
  return {
    type: 'SET_TASK_LIST',
    payload: {
      taskList: taskList,
    }
  }
}

export const completeTask = id => {
  return {
    type: 'COMPLETE_TASK',
    payload: {
      id: id
    }
  }
}

export const setVisibility = (filtro) => {
  return {
    type: 'FILTER_TASK_LIST',
    payload: {
      filtro: filtro
    }
  }
}

//******ASSINCRONAS*********//
export const createNewTask = text => async (dispatch, getState) => {
  try {
    await axios.post(
      'https://us-central1-missao-newton.cloudfunctions.net/reduxTodo/mourelle/todos',
      { text }
    )
    dispatch(fetchTasksList())
  } catch (error) {
    console.log('III, deu ruim')
  }
}

export const fetchTasksList = () => async (dispatch, getState) => {
  try {
    const result = await axios.get(
      'https://us-central1-missao-newton.cloudfunctions.net/reduxTodo/mourelle/todos'
    )
    dispatch(setTasksList(result.data.todos))
  } catch (error) {
    console.log('Opa, deu ruim aqui')
  }
}

export const toogleTaskDone = (id) => (dispatch, getState) => {
  const request = axios.put(
    `https://us-central1-missao-newton.cloudfunctions.net/reduxTodo/mourelle/todos/${id}/toggle`
  )
  request
    .then(response => {
      console.log(response.status)
      dispatch(completeTask(id))
    }).catch(error => {
      console.log("Não alterou estado do check")
    })
}

export const deleteTask = (id) => async (dispatch, getState) => {
  try {
    await axios.delete(
      `https://us-central1-missao-newton.cloudfunctions.net/reduxTodo/mourelle/todos/${id}`
    )
    dispatch(fetchTasksList())
  } catch (error) {
    console.log('Erro ao excluir uma task específica')
  }
}

export const deleteTasksDone = () => async (dispatch, getState) => {
  try {
    await axios.delete(
      `https://us-central1-missao-newton.cloudfunctions.net/reduxTodo/mourelle/todos/delete-done`
    )
    dispatch(fetchTasksList())
  } catch (error) {
    console.log('Erro ao excluir tasks done')
  }
}