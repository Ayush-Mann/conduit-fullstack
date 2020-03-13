import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import './App.css';

import Headercm from "./components/common/Headercm"
import Header from "./components/header/index"
import Login from "./components/signing/Login"
import Signup from "./components/signing/Signup.jsx"


class App extends React.Component{
  constructor(){
    super();
    this.state={
      articles:null,
      tags:null,
      users:null
    }
  }
 

  render(){
    return(
      <Router>
        {
          localStorage.token ? <Headercm/>:<Header />
        }
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Signup />
        </Route>
        
      </Router>
    )
  }
}

export default App;
