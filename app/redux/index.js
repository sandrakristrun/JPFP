import { combineReducers } from 'redux'
import campusesReducer from './campuses'
import singleCampusReducer from './singleCampus'
import studentsReducer from './students'
import singleStudentReducer from './singleStudent'

const appReducer = combineReducers({
  campuses: campusesReducer,
  students: studentsReducer,
  singleCampus: singleCampusReducer,
  singleStudent: singleStudentReducer
})

export default appReducer
