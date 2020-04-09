import tasksReducer from './tasks'
import { setTaskList } from '../actions/tasks'

const mockInitialState = {
  taskList: [
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
}

describe('Reducer que controla as tasks', () => {
  test('SET_TASK_LIST', () => {
    const mockNewTaskList = [
      {
        "id": "hbvobfioqpfqwehfiowfib",
        "day": "Domingo",
        "text": "Lavar a louça"
      },
      {
        "id": "ibpugepigbvpirefgeoppuf",
        "day": "Sábado",
        "text": "Lavar a roupa"
      },
      {
        "id": "bipboguebgpieburgerfbu",
        "day": "Quarta",
        "text": "Comprar comida"
      }
    ]
    const newSetListAction = setTaskList(mockNewTaskList)
    const newStore = tasksReducer(mockInitialState,newSetListAction)

    expect(newStore.taskList).toEqual(mockNewTaskList)
    expect(newStore.taskList).toEqual(expect.not.arrayContaining(mockInitialState.taskList))
    expect(newStore.taskList).toHaveLength(3)
  })

  test('DEFAULT', () => {
    const newStore = tasksReducer(mockInitialState,{type:'Vai cair no default'})

    expect(newStore.taskList).toEqual(expect.arrayContaining(mockInitialState.taskList))
    expect(newStore.taskList).toEqual(mockInitialState.taskList)
    expect(newStore.taskList).toHaveLength(2)
  })
})

