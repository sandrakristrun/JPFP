import axios from 'axios'

const initialState = {}

const SET_CAMPUS = 'SET_CAMPUS'
const UPDATE_CAMPUS = 'UPDATE_CAMPUS'


//ACTION CREATERS
export const setCampus = (campus) => {
  return {
    type: SET_CAMPUS,
    campus
  }
}

export const _updateCampus = (campus) => {
  return {
    type: UPDATE_CAMPUS,
    campus
  }
}


//THUNKS
export const fetchCampus = (campusId) => {
  return async (dispatch) => {
    try {
      const {data: campus} = await axios.get(`/api/campuses/${campusId}`)
      dispatch(setCampus(campus))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateCampus = (campusId, updatedCampus) => {
  return async (dispatch) => {
    try {
      const {data: updated} = await axios.put(`/api/campuses/editCampus/${campusId}`, updatedCampus)
      dispatch(_updateCampus(updated))
    } catch (err) {
      console.log(err)
    }
  }
}

export const unregisterStudent = (student) => {
  return async (dispatch, getState) => {
    try {
      const campusState = getState();
      const singleCampus = campusState.singleCampus;
      const students = singleCampus.students;

      for (let i = 0; i < students.length; i++){
        if (students[i].id === student.id) students.splice(i, 1)
      }
      const {data: updatedCampus} = await axios.put(`/api/campuses/editCampus/${singleCampus.id}`, singleCampus)
      dispatch(_updateCampus(updatedCampus))

      student.campusId = null;
      await axios.put(`/api/students/editStudent/${student.id}`, student)
    } catch (err) {
      console.log(err)
    }
  }
}

//REDUCER
const singleCampusReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CAMPUS:
      return action.campus
    case UPDATE_CAMPUS:
      return {...state, name: action.campus.name, address: action.campus.address, imageUrl: action.campus.imageUrl, description: action.campus.description}
    default:
      return state
  }
}

export default singleCampusReducer
