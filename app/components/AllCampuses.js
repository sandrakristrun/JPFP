import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCampuses, deleteCampus } from "../redux/campuses";
import AddCampus from "./AddCampus";

export class AllCampuses extends React.Component {
  constructor() {
    super();
    this.state = {
      filtered: "All",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.getCampuses();
  }

  handleClick(e) {
    e.preventDefault();
    this.props.deleteCampus(e.target.value);
  }

  handleChange(e) {
    this.setState({
      filtered: e.target.value,
    });
  }

  render() {
    const { filtered } = this.state;
    const campuses = this.props.campuses.filter((campus) => {
      if (filtered === "All") return campus;
      if (filtered === "Has students") return campus.students.length;
      if (filtered === "No students") return !campus.students.length;
    });
    return (
      <div className="campusesList">
        <div className="left">
          <label htmlFor="campusFilter">Campuses:</label>
          <select
            name="campusFilter"
            value={filtered}
            onChange={this.handleChange}
          >
            <option>All</option>
            <option>Has students</option>
            <option>No students</option>
          </select>
          {campuses.map((campus) => (
            <div className="campus" key={campus.id}>
              <Link to={`/campuses/${campus.id}`}>
                <h2>{campus.name}</h2>
              </Link>
              <p>{campus.description}</p>
              <img src={campus.imageUrl} width="400" height="300" />
              <div>
                <button
                  type="submit"
                  id="remove-button"
                  onClick={this.handleClick}
                  value={campus.id}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="right">
          <div id="addCampus">
            <h3>Add New Campus</h3>
          </div>
          <AddCampus />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCampuses: () => dispatch(fetchCampuses()),
    deleteCampus: (id) => dispatch(deleteCampus(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCampuses);
