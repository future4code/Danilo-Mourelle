import { combineReducers } from 'redux'
import updateTaskList from './taskList'
import setVisibilityFilter from './filterVisibility'


const rootReducer = combineReducers({
  allTasks: updateTaskList,
  filterCriterion: setVisibilityFilter
})

export default rootReducer