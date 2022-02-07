import React from "react";
import { connect } from "react-redux";
import { addCampus } from "../redux/campuses";

class AddCampus extends React.Component {
  constructor(){
    super()
    this.state = {
      name: '',
      address: '',
      description: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.addCampus(this.state);
    this.setState({
      name: '',
      address: '',
      description: ''
    })
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const {name, address, description} = this.state;
    return (
      <div>
        <form id='campus-form' onSubmit={this.handleSubmit}>
          <div>
            <label>Campus Name:</label>
            <input type='text' name='name' value={name} onChange={this.handleChange} />
          </div>
          <div>
            <label>Address:</label>
            <input type='text' name='address' value={address} onChange={this.handleChange} />
          </div>
          <div>
            <label>Description:</label>
            <input type='text' name='description' value={description} onChange={this.handleChange} />
          </div>
        <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addCampus: (campus) => dispatch(addCampus(campus))
});

export default connect(null, mapDispatchToProps)(AddCampus)
