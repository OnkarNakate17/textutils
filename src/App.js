
// App.js
import React, { Component } from 'react';
import { NavBar } from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';


export default class App extends Component {

  apiKey = process.env.REACT_APP_NEWS_API
  render() {


    return (
      <Router>

        <NavLink to="/" onClick={() => window.location.reload()}><NavBar /></NavLink>
        <Switch>
          <Route exact path="/"><News apiKey={this.apiKey} key="general" pageSize={5} country="in" category="general" /></Route>
          <Route exact path="/business"><News apiKey={this.apiKey} key="business" pageSize={5} country="in" category="business" /></Route>
          <Route exact path="/entertainment"><News apiKey={this.apiKey} key="entertainment" pageSize={5} country="in" category="entertainment" /></Route>
          <Route exact path="/general"><News apiKey={this.apiKey} key="general" pageSize={5} country="in" category="general" /></Route>
          <Route exact path="/health"><News apiKey={this.apiKey} key="health" pageSize={5} country="in" category="health" /></Route>
          <Route exact path="/science"><News apiKey={this.apiKey} key="science" pageSize={5} country="in" category="science" /></Route>
          <Route exact path="/sports"><News apiKey={this.apiKey} key="sports" pageSize={5} country="in" category="sports" /></Route>
          <Route exact path="/technology"><News apiKey={this.apiKey} key="technology" pageSize={5} country="in" category="technology" /></Route>
        </Switch>
        <div className="container d-flex justify-content-between">
          <NavLink to="/" onClick={() => window.location.reload()}></NavLink>
          <NavLink to="/business" onClick={() => window.location.reload()}></NavLink>
          <NavLink to="/entertainment" onClick={() => window.location.reload()}></NavLink>
          <NavLink to="/health" onClick={() => window.location.reload()}></NavLink>
          <NavLink to="/science" onClick={() => window.location.reload()}></NavLink>
          <NavLink to="/sports" onClick={() => window.location.reload()}></NavLink>
          <NavLink to="/technology" onClick={() => window.location.reload()}></NavLink>
        </div>
      </Router>
    )
  }
}


