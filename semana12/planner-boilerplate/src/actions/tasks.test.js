import axios from 'axios'
import { setTaskList, getTasksList, createTask, baseUrl } from './tasks'

const mockTasksList = [
  {
    "id": "jGH9xnVXQMeU3tZOQ2Gy",
    "day": "Segunda",
    "text": "Lavar a louça"
  },
  {
    "id": "jbnpwbfpqwfbowuwufbo",
    "day": "Terça",
    "text": "Lavar a roupa"
  }
]
const mockForm = {
  text: 'Comprar comida',
  day: 'Quinta'
}

let mockDispatch
beforeEach(() => {
  mockDispatch = jest.fn()
  console.log = jest.fn()
  console.error = jest.fn()
})

describe('Actions síncronas que manipulam as tasks', () => {
  test('setTaskList', () => {
    const mockedAction = setTaskList(mockTasksList)

    expect(mockedAction.type).toEqual('SET_TASK_LIST')
    expect(mockedAction.payload.list).toEqual(mockTasksList)
    expect(mockedAction.payload.list).toHaveLength(2)
  })
})

describe('Actions assíncronas que manipulam as tasks', () => {
  test('getTasksList success', async () => {
    axios.get = jest.fn(() => ({
      data: mockTasksList
    }))

    await getTasksList()(mockDispatch)

    expect(console.log).toHaveBeenCalledTimes(2)
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_TASK_LIST',
      payload: {
        list: mockTasksList
      }
    })
  })
  test('getTasksList fail', async () => {
    // Mock do axios
    axios.get = jest.fn(() => {
      throw new Error('Deu erro!')
    })

    await getTasksList()(mockDispatch)
    expect(axios.get).toThrowError()
    expect(console.error).toHaveBeenCalledTimes(1)
  })
  test('createTask success', async () => {
    axios.post = jest.fn(() => ({
      status: 200
    }))

    await createTask(mockForm)(mockDispatch)

    expect(axios.post).toHaveBeenCalledWith(baseUrl, mockForm)
    expect(console.log).toHaveBeenCalledTimes(2)
    expect(console.log).toHaveBeenCalledWith(`Status da Requisição getTasksList: 200`)
    expect(mockDispatch).toHaveBeenCalledTimes(1)
  })
  test('createTask fail', async () => {
    // Mock do axios
    axios.post = jest.fn(() => {
      throw new Error('Deu erro!')
    })

    await createTask(mockForm)(mockDispatch)
    expect(axios.get).toThrowError()
    expect(console.error).toHaveBeenCalledTimes(1)
  })
})