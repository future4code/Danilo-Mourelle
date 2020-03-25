import axios from 'axios'

const baseUrl = 'https://us-central1-missao-newton.cloudfunctions.net/futureX/'
const user = 'mourelle'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijl6V0hhYnp6Uk9sZllBWXRZczlhIiwiZW1haWwiOiJtb3VyZWxsZUBmYWtlLmNvbSIsImlhdCI6MTU4NTE1OTMxNX0.nZLAM1XFshWxkPZEQ3EUoKfWD7xvdnbK8s8OvtGjY2w'

//***** ASSÍNCRONAS*****//
export const getTripsList = () => async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}${user}/trips`)
    console.log(result.status)
    console.log(result.statusText)

    dispatch(setTripsList(response.data.trips))
  } 
  catch (error) {
    console.log('passei aqui no erro')
  }
}

export const createTrip = (form) => async dispatch => {
  let dataToSend = { ...form }
  const dateArray = form.date.split('-')
  let date = new Date(Number(dateArray[0]), Number(dateArray[1]) - 1, Number(dateArray[2]))
  date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  dataToSend.date= date
  console.log(dataToSend )
  try {
    const result = await axios.post(`${baseUrl}${user}/trips`, dataToSend, {
      headers: {
        "Content-Type": "application/json",
        auth: token
      }
    })
    console.log(result.status)
    console.log(result.statusText)
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