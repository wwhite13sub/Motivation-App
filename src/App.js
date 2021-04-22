import './App.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/Navbar/NavBar';
import Motivational from './Components/Motivational/Motivational';


class App extends Component {
  render(){
    return (
     <>
        <div className="">
          <NavBar />
          <Motivational />
        </div>
      </>
    );
  }
}

export default App;
