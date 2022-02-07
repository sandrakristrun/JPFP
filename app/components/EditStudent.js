import React from "react";
import { connect } from "react-redux";
import { fetchStudent, updateStudent, setStudent } from "../redux/singleStudent";


class EditStudent extends React.Component {
  constructor(){
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      imageUrl: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate(prevProps){
    if (prevProps.student.id !== this.props.student.id){
      this.setState({
        firstName: this.props.student.firstName || '',
        lastName: this.props.student.lastName || '',
        email: this.props.student.email || '',
        imageUrl: this.props.student.imageUrl || ''
      })
    }
  }

  componentWillUnmount() {
    this.props.clearStudent();
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.updateStudent(this.props.student.id, this.state);
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    const {firstName, lastName, email, imageUrl} = this.state;
    return (
      <div className='editStudent'>
        <h3>Edit Student:</h3>
        <form id='update-student-form' onSubmit={this.handleSubmit}>
          <div>
            <label>First name:</label>
            <input type='text' name='firstName' value={firstName} onChange={this.handleChange} />
          </div>
          <div>
            <label>Last name:</label>
            <input type='text'name='lastName' value={lastName} onChange={this.handleChange} />
          </div>
          <div>
            <label>Email:</label>
            <input type='text' name='email' value={email} onChange={this.handleChange} />
          </div>
          <div>
            <label>ImageUrl:</label>
            <input type='text' name='imageUrl' value={imageUrl} onChange={this.handleChange} />
            </div>
        <button type='submit'>Submit</button>
       </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    student: state.singleStudent
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStudent: (studentId, editedStudent) => dispatch(updateStudent(studentId, editedStudent)),
    setStudent: (studentId) => dispatch(fetchStudent(studentId)),
    clearStudent: () => dispatch(setStudent({}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStudent)
