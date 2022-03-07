import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStudent } from "../redux/singleStudent";
import EditStudent from "./EditStudent";

class SingleStudent extends React.Component {
  componentDidMount() {
    this.props.getStudent(this.props.match.params.studentId);
  }

  render() {
    let student = this.props.student || {};
    let campus = student.campus || {};
    let campusName = campus.name;
    return (
      <div className="single-student">
        {!student.firstName ? (
          "Student Not Found"
        ) : (
          <div className="left">
            <h3>
              {student.firstName} {student.lastName}
            </h3>
            <p>Email: {student.email}</p>
            <p>GPA: {student.gpa}</p>
            <img src={student.imageUrl} width="300" height="300" />
            <p>
              School:{" "}
              {campusName ? (
                <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
              ) : (
                "This student is not registered in school yet"
              )}
            </p>
          </div>
        )}
        <div className="right">
          <EditStudent student={this.props.student} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    student: state.singleStudent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStudent: (id) => dispatch(fetchStudent(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
