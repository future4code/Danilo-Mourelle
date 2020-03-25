import axios from 'axios'

const baseUrl = 'https://us-central1-missao-newton.cloudfunctions.net/futureX/'
const user = 'mourelle'

//***** ASSÍNCRONAS*****//
export const getTripsList = () => async (dispatch) => {
  try{
    const response = await axios.get(`${baseUrl}${user}/trips`)
    console.log('passei aqui')
    dispatch(setTripsList(response.data.trips))
  } catch (error) {
    console.log('passei aqui no erro')
  }
}

//*****SÍNCRONAS*****//
export const setTripsList = (list) => ({
  type: 'SET_TRIPS_LIST',
  payload: {
    list,
  }
})