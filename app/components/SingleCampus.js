import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCampus, unregisterStudent } from '../redux/singleCampus'
import { updateStudent, fetchStudent } from '../redux/singleStudent'
import EditCampus from './EditCampus'


class SingleCampus extends React.Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getCampus(this.props.match.params.campusId)
  }

  handleClick(student, e){
    e.preventDefault()
    this.props.unregisterStudent(student)
  }

  render() {
    const campus = this.props.campus;
    const students = campus.students || [];
    return (
      <div className='single-campus'>
          {!campus.name ? 'Campus not found': <div className='left'>
            <h3>{campus.name}</h3>
            <p>Description: {campus.description}</p>
            <p>Address: {campus.address}</p>
            <img src={campus.imageUrl} width='400' height='300'/>
            <h3>Students</h3>
            {students.length ?
            <div>{students.map(student =>(
              <div className='student-in-school' key={student.id}>
                <div className='leftStudent'>
                  <Link to={`/students/${student.id}`}><p>{student.firstName} {student.lastName}</p></Link>
                </div>
                <div className='rightStudent'>
                  <button type='button' id='unregister-button' onClick={(e)=>this.handleClick(student, e)} value={student.id}>Unregister</button>
                </div>
              </div>))}
            </div> : 'This school does not have any students yet'}
          </div>}
        <div className='right'>
          <EditCampus student={this.props.campus} />
        </div>
      </div>
      )
   }
}

const mapStateToProps = (state) => {
  return {
    campus: state.singleCampus,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCampus: (id) => dispatch(fetchCampus(id)),
    getStudent: (id) => dispatch(fetchStudent(id)),
    unregisterStudent: (id, student) => dispatch(unregisterStudent(id, student)),
    updateStudent: (id, student)=> dispatch(updateStudent(id, student))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus)
