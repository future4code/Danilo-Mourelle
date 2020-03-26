import axios from 'axios'
import { push } from 'connected-react-router'
import { routes } from "../Containers/Router"

const baseUrl = 'https://us-central1-missao-newton.cloudfunctions.net/futureX/'
const user = 'mourelle'

//***** ASSÍNCRONAS*****//
export const applyToTrip = (form) => async dispatch => {
  let dataToSend = { ...form }
  delete dataToSend.trip
  console.log(dataToSend)
  try {
    const response = await axios.post(`${baseUrl}${user}/trips/${form.trip}/apply`, dataToSend)

    console.log(`Status Requisição applyToTrip: ${response.status}`)
    console.log(`Mensagem Requisição applyToTrip: ${response.statusText}`)
  }
  catch (error) {
    console.error(error)
  }
}

export const logIn = (email, password) => async (dispatch) => {
  let dataToSend = {
    email: email,
    password: password
  }
  try {
    const response = await axios.post(`${baseUrl}${user}/login`, dataToSend)
    console.log(`Status Requisição logIn: ${response.status}`)
    console.log(`Mensagem Requisição logIn: ${response.statusText}`)

    localStorage.setItem('token', response.data.token)
    dispatch(push(routes.tripCreation))
  }
  catch (error) {
    window.alert("Login Faield!")
    console.error(error)
  }
}

export const getTripsList = () => async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}${user}/trips`)
    console.log(`Status Requisição getTripsList: ${response.status}`)
    console.log(`Mensagem Requisição getTripsList: ${response.statusText}`)

    dispatch(setTripsList(response.data.trips))
  }
  catch (error) {
    console.log('Erro ao obter a TripList')
  }
}

export const createTrip = (form) => async dispatch => {
  const dateArray = form.date.split('-')
  let date = new Date(Number(dateArray[0]), Number(dateArray[1]) - 1, Number(dateArray[2]))
  date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

  let dataToSend = { ...form }
  dataToSend.date = date

  const token = localStorage.getItem('token')

  try {
    const result = await axios.post(`${baseUrl}${user}/trips`, dataToSend, {
      headers: {
        "Content-Type": "application/json",
        auth: token
      }
    })
    console.log(`Status Requisição createTrip: ${result.status}`)
    console.log(`Mensagem Requisição createTrip ${result.statusText}`)
    window.alert('Trip cadastrada com sucesso!')

    dispatch(getTripsList())
  }
  catch (error) {
    console.error(error)
  }
}


//*****SÍNCRONAS*****//
export const setTripsList = (list) => ({
  type: 'SET_TRIPS_LIST',
  payload: {
    list,
  }
})

export const setTripIdToDetail = (id) => ({
  type: 'SET_TRIP_TO_DETAIL',
  payload:{
    id,
  }
})