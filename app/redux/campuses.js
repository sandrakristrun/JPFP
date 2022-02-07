import axios from 'axios'

const initialState = []

//ACTION TYPES
const SET_CAMPUSES = 'SET_CAMPUSES'
const ADD_CAMPUS = 'ADD_CAMPUS'
const DELETE_CAMPUS = 'DELETE_CAMPUS'
const UPDATE_CAMPUS = 'UPDATE_CAMPUS'


//ACTION CREATERS
export const setCampuses = (campuses) => {
  return {
    type: SET_CAMPUSES,
    campuses
  }
};

export const createCampus = (campus) => {
  return {
    type: ADD_CAMPUS,
    campus
  }
}

export const _deleteCampus = (campus) => {
  return {
    type: DELETE_CAMPUS,
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
export const addCampus = (newCampus) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post('/api/campuses/addCampus', newCampus)
      dispatch(createCampus(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchCampuses = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/campuses')
      dispatch(setCampuses(data))
    } catch (err) {
      console.log(err)
    }
  }
};

export const deleteCampus = (campusId) => {
  return async (dispatch) => {
    const {data: deleted} = await axios.delete(`/api/campuses/${campusId}`);
    dispatch(_deleteCampus(deleted));
  };
};

//REDUCER
export default function campusesReducer(state = initialState, action) {
  switch (action.type){
    case SET_CAMPUSES:
      return action.campuses
    case ADD_CAMPUS:
      return [...state, action.campus]
    case DELETE_CAMPUS:
      return state.filter(campus => campus.id !== action.campus.id)
  default:
    return state;
  }
}
