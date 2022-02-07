import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { fetchStudents, deleteStudent } from "../redux/students";
import AddStudent from "./AddStudent";



// Notice that we're exporting the AllStudents component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllStudents extends React.Component {
  constructor(){
    super()
    this.state = {
      filtered: 'All'
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    this.props.getStudents();
  }

  handleClick(e){
    e.preventDefault()
    this.props.deleteStudent(e.target.value)
  }

  handleChange(e){
    this.setState({
      filtered: e.target.value
    })
  }
  render() {
    const {filtered} = this.state;
    const students = this.props.students.filter(student=> {
      if (filtered === 'All') return student
      if (filtered === 'Registered')  return student.campusId
      if (filtered === 'Unregistered') return !student.campusId
    })
    return (
    <div className='studentsList'>
      <div className='left'>
        <div className='studentFilter'>
        <label htmlFor='studentFilter'>Students:</label>
        <select name='studentFilter' value={filtered} onChange={this.handleChange}>
          <option>All</option>
          <option>Registered</option>
          <option >Unregistered</option>
        </select>
        </div>
      {students.map(student => {
         return  (<div className='student' key={student.id}>
           <Link to={`/students/${student.id}`}>
           <h2>{student.firstName} {student.lastName}</h2>
           </Link>
           <img src={student.imageUrl} width='250' height='250'/>
           <div>
             <button type='submit' id='remove-button'onClick={this.handleClick}value={student.id}>Remove</button>
           </div>
       </div>)
      })}
      </div>
      <div className='right'>
        <div id='addStudent'><h3>Add New Student</h3></div>
        <AddStudent />
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStudents: () => dispatch(fetchStudents()),
    deleteStudent: (id) => dispatch(deleteStudent(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllStudents);
