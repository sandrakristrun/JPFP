import React from "react";
import { connect } from "react-redux";
import { addStudent } from "../redux/students";

class AddStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      gpa: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addStudent(this.state);
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      gpa: "",
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    const { firstName, lastName, email, gpa } = this.state;
    return (
      <div>
        <form id="student-form" onSubmit={this.handleSubmit}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>GPA:</label>
            <input
              type="text"
              name="gpa"
              value={gpa}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addStudent: (student) => dispatch(addStudent(student)),
});

export default connect(null, mapDispatchToProps)(AddStudent);
