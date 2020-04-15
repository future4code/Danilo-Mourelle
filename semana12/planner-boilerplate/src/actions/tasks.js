import axios from 'axios'

export const baseUrl = 'https://us-central1-missao-newton.cloudfunctions.net/generic/planner-sagan-danilo'

//*****ASSÍNCRONAS*****//
export const getTasksList = () => async (dispatch) => {
  try {
    const response = await axios.get(baseUrl)
    console.log(`Status da Requisição getTasksList: ${response.status}`)
    console.log(`Mensagem da Requisição getTasksList: ${response.statusText}`)

    dispatch(setTaskList(response.data))
  }
  catch (error) {
    console.error(error)
  }
}

export const createTask = (form) => async (dispatch) => {
  try {
    const response = await axios.post(baseUrl, form)
    console.log(`Status da Requisição getTasksList: ${response.status}`)
    console.log(`Mensagem da Requisição getTasksList: ${response.statusText}`)

    dispatch(getTasksList(response.data))
  }
  catch (error) {
    console.error(error)
  }
}

//*****SÍNCRONAS*****//
export const setTaskList = (list) => (
  {
  type: 'SET_TASK_LIST',
  payload: {list} 
})