import axios from 'axios'

const initialState = {}

const SET_STUDENT = 'SET_STUDENT'
const UPDATE_STUDENT = 'UPDATE_STUDENT'


export const setStudent = (student) => {
  return {
    type: SET_STUDENT,
    student
  }
}

export const _updateStudent = (student) => {
  return {
    type: UPDATE_STUDENT,
    student
  }
}

export const fetchStudent = (studentId) => {
  return async (dispatch) => {
    try {
      const {data: student} = await axios.get(`/api/students/${studentId}`)
      dispatch(setStudent(student))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateStudent = (studentId, updated) => {
  return async (dispatch) => {
    try {
      const {data: student} = await axios.put(`/api/students/editStudent/${studentId}`, updated)
      dispatch(_updateStudent(student))
    } catch (err) {
      console.log(err)
    }
  }
}

//REDUCER
const singleStudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STUDENT:
      return action.student
    case UPDATE_STUDENT:
      return {...state, firstName: action.student.firstName, lastName: action.student.lastName, email: action.student.email, imageUrl: action.student.imageUrl, campusId: action.student.campusId}
    default:
      return state
  }
}

export default singleStudentReducer
