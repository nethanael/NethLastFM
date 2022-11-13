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
    userWEBSession: {},   //the key is only require in some very specific methods
    userInfo: {},         // Obj with general profile info
    friends: [],          // Array with list of friends
    lovedTracks: [],      // Array with list of loved tracks
    topTracks: [],        // Array with list of most listened tracks
    scrobbles: [],        // 0-> Last Year Scrobbles
                          // 1-> 
                          // 2->
    topTags: [],          // Array with top tags, not working right now
    topArtist: [],        // Array with list of last year´s top ten artists
    range: 0              // Range for last year´s scrobbles graph
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
    //console.log("Get User info string query", getUserInfo);   // Logging the string   

    let userInfo = this.state.userInfo;                   // Cloning the userInfo object from the state
    let result = await http.get(getUserInfo);             // HTTP get request with the string (previously build) await and async are very important here
    userInfo = result.data.user;                          // Updating the userWEBSession local Object with http get results
    //console.log("User Info http result: ", result.data);  // Logging the result
    this.setState({ userInfo });                            // updating the state with the new userInfo obj

  };

  handleSession = async (token) => {

    //********************************************** Building the API Signature **************************************

    const { apiKey, mySecret } = this.state.siteCredentials;        //extract credentials given by Last FM

    const myString = "api_key" + apiKey + "methodauth.getSessiontoken" + token + mySecret;    // Building the api signature string
    const apiSig = md5(myString);                                                             // Applying md5 encription to string

    let { siteCredentials } = { ...this.state };                                 // Cloning Site Credentials object from the state
    siteCredentials.apiSig = apiSig;                                            // Updating site credentials clone with the apiSignature
    //console.log("API Signature:", apiSig);                                      // Logging

    //************************************************** Building the Web Session*************************************

    let method = "auth.getSession";                                             // Defining the API method (LAST FM API DOCS)
    let format = "json";                                                        // Defining the data format to receive
    const getUserSession = config[0].apiDataURL + "?method=" + method + "&api_key=" + apiKey + "&api_sig="  // Building the WEB session 
      + apiSig + "&token=" + token + "&format=" + format;                             // string method

    let userWEBSession = this.state.userWEBSession;                             //Cloning the userWEBSession object from the state
    let result = await http.get(getUserSession);                                // HTTP get request with the string (previously build)
    //console.log("Complete Result of WEBSESSION get method: ", result);                                                        // Logging the complete result
    userWEBSession = result.data.session;                                       // Updating the userWEBSession Object with http get results
    //console.log("WEB Session object: ", result.data.session);                   // Logging

    this.handleCookies(userWEBSession);                                         // Calling the handleCookies method to set the local storage
    this.handleUserInfo(result.data.session.name);                              // Calling the handleUserInfo event to get user info
    this.setState({ userWEBSession, siteCredentials });                       // update the state with userWEBSession and siteCredentials
    
  };

  handleLogout = () => {

    // emptying the state objs and arrays

    let userWEBSession = this.state.userWEBSession;
    userWEBSession = {};

    let userInfo = this.state.userInfo;
    userInfo = [];
    
    let friends = this.state.friends;
    friends = [];

    let lovedTracks = this.state.lovedTracks;
    lovedTracks = [];

    let topTracks = this.state.topTracks;
    topTracks = [];

    let scrobbles = this.state.scrobbles;
    scrobbles = [];

    let topTags = this.state.topTags;
    topTags = [];

    let topArtist = this.state.topArtist;
    topArtist = [];

    let range = 0;

    this.setState({ userWEBSession, userInfo, friends, lovedTracks, topTracks, scrobbles, topTags, topArtist, range })

    localStorage.removeItem("name");                          // Removing the cookies from the local storage
    localStorage.removeItem("key");

    window.location = '/';                                    //Redirecting the route
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
    //console.log(result.data.friends.user);
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

  handleMaxFromArray = (obj) => {                 //This method returns the maximun value of scrobbles
    let maxArray = [];                            //This array will contain only the total scrobbles per month
    for (let count = 0 ; count < obj.length; count++){
          maxArray.push(obj[count].Scrobbles);     // Pushing scrobbles one by one
    }

    return Math.max.apply(null, maxArray);          //Returning the max value from the array
    //return 1000;
  };

  handleLastYearScrobbles = async (months) => {

    // months is an array we build earlier with all the first
    //  and last day of each month in unix time
    // We will use this array to iterate and make the api calls for every month

    const { apiKey } = this.state.siteCredentials;        //extract API credentials given by Last FM from the state

    const method = "user.getRecentTracks";                // this api method will get the tracks of a given period
                                                          // of time, in this case one year
    const format = "json";
    const user = this.state.userWEBSession.name;

    let lastYear = [];                                    // Creation of the array of objs that will contain the results
    let a = 0;                                            // of the api calls, a will be the lastyear[] obj index
    const strMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Set", "Oct", "Nov", "Dic"];

    for (let count = 0; count < 24; count += 2){       // 12 iterations (count + 2) to make the api calls for
                                                          // Every month
      const timeStampStart = months[count]; //1/1/XX
      const timeStampEnd = months[count + 1]; //31/12/XX

      // Api call:
      const getScrobblesString = config[0].apiDataURL + "?method=" + method + "&user=" + user + "&api_key=" + apiKey + "&format=" + format + "&from=" + timeStampStart + "&to=" + timeStampEnd;
      //console.log(getScrobblesString);                  // Logging the string
      const result = await http.get(getScrobblesString);
      //console.log(result.data.recenttracks['@attr'].total);   //Loging the result: Total Scrobbles

      // insertion of the objects inside the lastYear array using the results and the strMonths array created earlier
      // will end like {Month: "Jan", Scrobbles: 324}, {Month: Feb, Scrobbles: 433} and recharts.js loves this format 
      lastYear[a] = {"Month": strMonths[a], "Scrobbles": parseInt(result.data.recenttracks['@attr'].total)};
      a++;
    };
    //console.log(lastYear); //Logging the succesful creation of the array of objects

    const range = this.handleMaxFromArray(lastYear);  //Calling a method to get the max value of those scrobbles
    let scrobbles = this.state.scrobbles;             //Cloning the state
    scrobbles[0] = lastYear;                          //Updating the local array

    this.setState({scrobbles, range});                //Updating the state             
  };

  handleTopTags = async () => {
    const { apiKey } = this.state.siteCredentials;        //extract API credentials given by Last FM from the state

    const method = "user.gettoptags";                     // this method is not working. DK why????
    const format = "json";
    const user = this.state.userWEBSession.name;

    const getTopTags = config[0].apiDataURL + "?method=" + method + "&user=" + user + "&api_key=" + apiKey + "&limit=" + 5 + "&format=" + format;
    //console.log(getTopTags);
    const result = await http.get(getTopTags);
    //console.log(result.data.topTags.tag);

    let topTags = this.state.topTags;
    topTags = result.data;

    this.setState({topTags});
  };

  handleTopArtist = async (dates) => {
    const { apiKey } = this.state.siteCredentials;        //extract API credentials given by Last FM from the state
    //console.log("aca dates: ", dates)
    const method = "user.getweeklyartistchart";
    const format = "json";
    const topNumber = 5;
    const user = this.state.userWEBSession.name;

    const getTopArtist = config[0].apiDataURL + "?method=" + method + "&user=" + user + "&api_key=" + apiKey + "&from=" + dates[0] + "&to=" + dates[23] + "&limit=" + topNumber + "&format=" + format;
    //console.log(getTopArtist);
    const result = await http.get(getTopArtist);
    //console.log(result.data.weeklyartistchart.artist);

    let newData = [];

    for (let count = 0; count < result.data.weeklyartistchart.artist.length; count++){       
        newData[count] = {"name": result.data.weeklyartistchart.artist[count].name, "playcount": parseInt(result.data.weeklyartistchart.artist[count].playcount)};
      };

    let topArtist = this.state.topArtist;
    topArtist = newData;;

    this.setState({topArtist});
  };

  render() {
    const { connectionString } = this.state.siteCredentials;
    const { siteCredentials, userWEBSession, userInfo } = this.state;
    return (
      <div className="App">
        <div className="container-fluid mi_cont">
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
                  userInfo={this.state.userInfo}
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
                      <Route path="/dashboard" element={
                        <Dashboard
                          getLastYearScrobbles={this.handleLastYearScrobbles} 
                          getTopTags={this.handleTopTags}
                          getTopArtist={this.handleTopArtist}
                          lastYearScrobbles={this.state.scrobbles[0]}
                          topTags={this.state.topTags}
                          topArtist={this.state.topArtist}
                          range={this.state.range}
                        />} 
                      />
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
