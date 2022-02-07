import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AllStudents from "./AllStudents";
import AllCampuses from "./AllCampuses";
import SingleCampus from "./SingleCampus";
import SingleStudent from "./SingleStudent";
import Home from "./Home";


const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to='/'><h1>HOME</h1></Link>
          <Link to='/students'><h1>STUDENTS</h1></Link>
          <Link to='/campuses'><h1>CAMPUSES</h1></Link>
        </nav>
        <main>
          <Route exact path ='/' component={Home} />
          <Route exact path ='/students' component={AllStudents} />
          <Route exact path ='/campuses' component={AllCampuses} />
          <Route path ='/campuses/:campusId' component={SingleCampus} />
          <Route path ='/students/:studentId' component={SingleStudent} />
        </main>
      </div>
    </Router>
  );
};

export default Routes;
