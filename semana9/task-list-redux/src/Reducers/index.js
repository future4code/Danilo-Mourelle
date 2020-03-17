import { combineReducers } from 'redux'
import updateTaskList from './taskList'
import setVisibilityFilter from './filterVisibility'


const rootReducer = combineReducers({
  taskList: updateTaskList,
  filterCriterion: setVisibilityFilter
})

export default rootReducer