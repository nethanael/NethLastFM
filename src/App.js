//----------------------------------------------------------Imports

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route, Navigate
} from "react-router-dom";
import config from './config.json';
import { ToastContainer } from 'react-toastify';
import Header from "./components/header";
import NavBar from "./components/navBar";
import Login from "./components/login";
import Home from './components/home';
import Dashboard from './components/dashboard';
import Social from './components/social';
import TopTracks from './components/toptracks';
import Tracks from './components/tracks';
import About from "./components/about";
import Logout from "./components/logout";
import Footer from "./components/footer";
import 'react-toastify/dist/ReactToastify.css';
import http from './services/httpService';
import md5 from 'md5';
import ProtectedRoutes from './components/protectedRoutes';

class App extends Component {

  // Object State

  state = {
    siteCredentials: {
      apiKey: config[0].apiKey,
      mySecret: config[0].apiSharedSecret,
      connectionString: config[0].apiAuthURL + "?api_key=" + config[0].apiKey + "&cb=" + config[0].callbackURL,
      myToken: null,
      apiSig: ''
    },
    userWEBSession: {}, //the key is only require in some very specific methods
    userInfo: {},
    friends: [],
    lovedTracks: [],
    topTracks: []
  };

  handleCookies = (userWEBSession) => {
    localStorage.setItem("name", userWEBSession.name);                          // Setting the cookies in the local storage
    localStorage.setItem("key", userWEBSession.key);
  };

  handleUserInfo = async (user) => {

    const { apiKey } = this.state.siteCredentials;        //extract API credentials given by Last FM from the state

    let method = "user.getinfo";                          // Defining the API method (LAST FM API DOCS)
    let format = "json";                                  // Defining the data format to receive
    const getUserInfo = config[0].apiDataURL + "?method=" + method + "&user="       // Building the user get info string method
      + user + "&api_key=" + apiKey + "&format=" + format;
    console.log("Get User info string query", getUserInfo);   // Logging the string   

    let userInfo = this.state.userInfo;                   // Cloning the userInfo object from the state
    let result = await http.get(getUserInfo);             // HTTP get request with the string (previously build)
    userInfo = result.data.user;                          // Updating the userWEBSession Object with http get results
    console.log("User Info http result: ", result.data);  // Logging the result
    this.setState({ userInfo });                            // updating the state with the new userInfo

  };

  handleSession = async (token) => {

    //********************************************** Building the API Signature **************************************

    const { apiKey, mySecret } = this.state.siteCredentials;        //extract credentials given by Last FM

    const myString = "api_key" + apiKey + "methodauth.getSessiontoken" + token + mySecret;    // Building the api signature string
    const apiSig = md5(myString);                                                             // Applying md5 encription to string

    let { siteCredentials } = { ...this.state };                                 // Cloning Site Credentials object from the state
    siteCredentials.apiSig = apiSig;                                            // Updating site credentials clone with the apiSignature
    console.log("API Signature:", apiSig);                                      // Logging

    //************************************************** Building the Web Session*************************************

    let method = "auth.getSession";                                             // Defining the API method (LAST FM API DOCS)
    let format = "json";                                                        // Defining the data format to receive
    const getUserSession = config[0].apiDataURL + "?method=" + method + "&api_key=" + apiKey + "&api_sig="  // Building the WEB session 
      + apiSig + "&token=" + token + "&format=" + format;                             // string method

    let userWEBSession = this.state.userWEBSession;                             //Cloning the userWEBSession object from the state
    let result = await http.get(getUserSession);                                // HTTP get request with the string (previously build)
    console.log("Complete Result of WEBSESSION get method: ", result);                                                        // Logging the complete result
    userWEBSession = result.data.session;                                       // Updating the userWEBSession Object with http get results
    console.log("WEB Session object: ", result.data.session);                   // Logging

    this.handleCookies(userWEBSession);                                         // Calling the handleCookies method to set the local storage
    this.handleUserInfo(result.data.session.name);                              // Calling the handleUserInfo event to get user info
    this.setState({ userWEBSession, siteCredentials });                       // update the state with userWEBSession and siteCredentials
    
  };

  handleLogout = () => {
    let userWEBSession = this.state.userWEBSession;
    userWEBSession = null;
    this.setState({ userWEBSession })

    localStorage.removeItem("name");                          // Removing the cookies from the local storage
    localStorage.removeItem("key");

    window.location = '/';
  };

  handleFriends = async () => {
    const { apiKey } = this.state.siteCredentials;        //extract API credentials given by Last FM from the state

    const method = "user.getfriends";
    const format = "json";
    const user = this.state.userWEBSession.name;
    const getFriendsString = config[0].apiDataURL + "?method=" + method + "&user=" + user + "&api_key=" + apiKey + "&format=" + format;
    //console.log(getFriendsString);
    const result = await http.get(getFriendsString);

    let friends = this.state.friends;
    friends = result.data.friends.user;
    console.log(result.data.friends.user);
    this.setState({friends});
  };

  handleLovedTracks = async () => {
  const { apiKey } = this.state.siteCredentials;        //extract API credentials given by Last FM from the state

  const method = "user.getlovedtracks";
  const format = "json";
  const user = this.state.userWEBSession.name;
  
  const getLovedTracksString = config[0].apiDataURL  + "?method=" + method + "&user=" + user + "&api_key=" + apiKey + "&format=" + format;
  //console.log(getFriendsString);
  const result = await http.get(getLovedTracksString);
  
  let lovedTracks = this.state.lovedTracks;
  lovedTracks = result.data.lovedtracks.track;
  //console.log(result.data.lovedtracks.track);
  this.setState({lovedTracks});
  };

  handleTopTracks = async () => {
  const { apiKey } = this.state.siteCredentials;        //extract API credentials given by Last FM from the state

  const method = "user.gettoptracks";
  const format = "json";
  const user = this.state.userWEBSession.name;
  
  const getTopTracksString = config[0].apiDataURL  + "?method=" + method + "&user=" + user + "&api_key=" + apiKey + "&format=" + format;
  
  const result = await http.get(getTopTracksString);
  
  let topTracks = this.state.topTracks;
  topTracks = result.data.toptracks.track;
  //console.log(result.data.lovedtracks.track);
  this.setState({topTracks});
  };

  render() {
    const { connectionString } = this.state.siteCredentials;
    const { siteCredentials, userWEBSession, userInfo } = this.state;
    return (
      <div className="App">
        <div className="container-sm mi_cont">
          <ToastContainer />
          <Header />
          <Router>
            <NavBar
              userWEBSession={this.state.userWEBSession}
            />
            <Routes>
              <Route path="/" element={
                <Login 
                  connectionString={connectionString}
                  siteCredentials={siteCredentials}
                  handleSession={this.handleSession} 
                  userWEBSession={this.state.userWEBSession}
                />} 
              />
              <Route element={ <ProtectedRoutes userInfo={this.state.userInfo} /> }>
                    <Route path="/home" element={
                        <Home
                          userWEBSession={userWEBSession}
                          userInfo={userInfo}
                        />} 
                      />
                      <Route path="/social" element={
                        <Social
                          getFriends={this.handleFriends} 
                          friends={this.state.friends}
                        />} 
                      />
                      <Route path="/tracks" element={
                        <Tracks
                          getTracks={this.handleLovedTracks} 
                          lovedTracks={this.state.lovedTracks}
                        />} 
                      />
                      <Route path="/toptracks" element={
                        <TopTracks
                          getTracks={this.handleTopTracks} 
                          topTracks={this.state.topTracks}
                        />} 
                      />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/about" element={<About apiKey={this.state.siteCredentials.apiKey} />} />
                      <Route path="/logout" element={
                      <Logout handleLogout={this.handleLogout}/>} />
              </Route>
              <Route path="*" element={<Navigate to ="/" />} />
            </Routes>
          </Router>
          <Footer />
        </div>
      </div>
    );
  };
};

export default App;
