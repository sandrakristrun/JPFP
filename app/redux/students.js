import axios from 'axios'

const initialState = []

const SET_STUDENTS = 'SET_STUDENTS'
const ADD_STUDENT = 'ADD_STUDENT'
const DELETE_STUDENT = 'DELETE_STUDENT'

//ACTION CREATERS
export const setStudents = (students) => {
  return {
    type: SET_STUDENTS,
    students
  }
};
export const createStudent = (student) => {
  return {
    type: ADD_STUDENT,
    student
  }
};

export const _deleteStudent = (student) => {
  return {
    type: DELETE_STUDENT,
    student
  }
}

//THUNKS
export const addStudent = (newStudent) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post('/api/students/addStudent', newStudent)
      dispatch(createStudent(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchStudents = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/students')
      dispatch(setStudents(data))
    } catch (err) {
      console.log(err)
    }
  }
};

export const deleteStudent = (studentId) => {
  return async (dispatch) => {
    const {data: deleted} = await axios.delete(`/api/students/${studentId}`);
    dispatch(_deleteStudent(deleted));
  };
};

//REDUCER
export default function studentsReducer(state = initialState, action) {
  switch (action.type){
    case SET_STUDENTS:
      return action.students
    case ADD_STUDENT:
      return [...state, action.student]
    case DELETE_STUDENT:
      return state.filter(student => student.id !== action.student.id)
  default:
    return state;
  }
}
