import axios from 'axios'

export const clearSwipes = () => async (dispatch) => {
  await axios.put('https://us-central1-missao-newton.cloudfunctions.net/astroMatch/mourelle/clear')
}

export const getNewProfile = () => async (dispatch) => {
  const result = await axios.get('https://us-central1-missao-newton.cloudfunctions.net/astroMatch/mourelle/person')
  dispatch(setActualProfile(result.data.profile))
}

export const getMatches = () => async (dispatch) => {
  const result = await axios.get('https://us-central1-missao-newton.cloudfunctions.net/astroMatch/mourelle/matches')
  dispatch(setMatchesList(result.data.matches))
}

export const choosePerson = (id, choice) => async (dispatch) => {
  const dataToSend = {
    id,
    choice,
  }
  console.log(dataToSend)
  try {
    await axios.post(
      'https://us-central1-missao-newton.cloudfunctions.net/astroMatch/mourelle/choose-person',
     dataToSend 
    )
    dispatch(getNewProfile())
  } catch (error) {
    console.log('Opa, deu ruim aqui')
  }
}

//*****ACTIONS SINCRONAS *****//

export const setMatchesList = matchesList => {
  return {
    type: 'SET_MATCHES_LIST',
    payload: {
      matchesList,
    }
  }
}

export const setActualProfile = profile => {
  return {
    type: 'ACTUAL_PROFILE',
    payload: {
      profile,
    }
  }
}