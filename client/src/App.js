import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect } from 'react-router';

import Welcome from './components/Welcome';
import Register from './components/Register';
import Login from './components/Login';

import Main from './components/Main';
import UserProfile from './components/UserProfile';
import CreateCard from './components/CreateCard';
import PickQuizType from './components/PickQuizType';
import QuizScreen from './components/QuizScreen';
import CuratedQuizScreen from './components/CuratedQuizScreen';
import EditCards from './components/EditCards';
import AboutApp from './components/AboutApp';
import Header from './components/Header';

import axios from 'axios';

class App extends Component {

  constructor(){
    super();
    this.state = {
      redirect: false,
      redirecting: '',
      user: {
        firstname: undefined
      }
    }
  }

  handleLoginSubmit = (e, username, password) => {
    e.preventDefault();
    axios.post('/auth/login', {
      username,
      password,
    }).then(res => {
      console.log("from auth",res.data.user)

      this.setState({
        auth: res.data.auth,
        user: res.data.user,
      });
      this.handleRedirect('/main')
    }).catch(err => console.log(err));
  }

  handleRegisterSubmit = (e, options) => {
    e.preventDefault();
    axios.post('/auth/register', {
      options
    })
    .then(res => {
      console.log("Options:")
      console.log(options)
      console.log('Res Data:')
      console.log(res.data)
      this.setState({
        auth: res.data.auth,
        user: res.data.user,
      })
      // handleLoginSubmit = (e, res.username, password)
      window.location.href = '/'
    })
    .catch(err => console.log(err));
  }

  handleRedirect = (path) => {
    this.setState({
      redirect: true,
      redirecting: path,
    })
    console.log(`The path is: ` + path)

  }

  logOut() {
    axios.get('/auth/logout')
      .then(res => {
        this.setState({
          auth: false,
          currentPage: 'welcome',
        })
      }).catch(err => console.log(err));
  }

  // for rendering the path
  redirectTo = () => {
    if(this.state.redirect){
      console.log('redirect')
      this.setState({
        redirect: false,
      })
      return(<Redirect to={this.state.redirecting}/>)
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={() => <Welcome />} />
          <Route exact path="/register" render={() => <Register handleRegisterSubmit={this.handleRegisterSubmit} />} />
          <Route exact path="/login" render={() => <Login handleLoginSubmit={this.handleLoginSubmit} />} />
          <div className="main">
          <Header firstname={this.state.user.firstname}/>
            <Route exact path="/aboutapp" render={() => <AboutApp />}/>
            <Route exact path="/main" render={() => <Main handleRedirect={this.handleRedirect} firstname={this.state.user.firstname}/>} />
            <Route exact path="/userprofile" render={() => <UserProfile handleRedirect={this.handleRedirect} id={this.state.user.id} username={this.state.user.username} firstname={this.state.user.firstname} lastname={this.state.user.lastname} email={this.state.user.email}/>} />
            <Route exact path="/createcard"  render={() => <CreateCard handleRedirect={this.handleRedirect} state={this.state} />} />
            <Route exact path="/pickquiztype" component={PickQuizType} />
            <Route exact path="/quizscreen" render={() => <QuizScreen handleRedirect={this.handleRedirect} state={this.state} />} />
            <Route exact path="/curatedquizscreen" render={() => <CuratedQuizScreen handleRedirect={this.handleRedirect} state={this.state} />} />
            <Route exact path="/editcards" render={() => <EditCards handleRedirect={this.handleRedirect} state={this.state} />} />
            {this.redirectTo()}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
