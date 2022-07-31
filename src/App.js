import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import config from './config.json'
import { ToastContainer } from 'react-toastify';
import Header from "./components/header";
import NavBar from "./components/navBar";
//import Home from "./components/home";
import Home2 from "./components/home2";
import Social from "./components/social";
//import Panel1 from "./components/panel1";
//import Panel12 from "./components/panel12";
import About from "./components/about";
import NotFound from "./components/notfound";
import Footer from "./components/footer";
import 'react-toastify/dist/ReactToastify.css';
import http from './services/httpService';
import md5 from 'md5';

class App extends Component {
  
  state = { 
    myData: {
        myToken: null,
        apiKey: config.apiKey,
        apiSig: '',
        mySecret: config.apiSharedSecret
    },
    friends: [],
    lovedTracks: [],
    userSession: {},
    userInfo: {}
  };

  handleEvent = (name) => {
    console.log("Event Handle Succesful:", name.realname);
  };

  handleSession = async (token) => {

    const { apiKey, mySecret } = this.state.myData;

    const myString = "api_key" + apiKey + "methodauth.getSessiontoken" + token + mySecret;
    const apiSig = md5(myString);

    //console.log("construcción de string:", apiSig);

    let { myData } = { ...this.state};
    myData.apiSig = apiSig; 

    let method = "auth.getSession";
    let format = "json";
    const getUserSession = config.apiDataURL + "?method=" + method + "&api_key=" + apiKey + "&api_sig=" 
                            + apiSig + "&token=" + token + "&format=" + format;

    let userSession = this.state.userSession;
    let result = await http.get(getUserSession);
    userSession = result.data.session; 
    console.log(result.data.session);

    method = "user.getinfo";
    const user = result.data.session.name;
    format = "json";
    const getUserInfo = config.apiDataURL + "?method=" + method + "&user=" + user + "&api_key=" + apiKey + "&format=" + format;
    console.log(getUserInfo);
    result = await http.get(getUserInfo);
    
    let userInfo = this.state.userInfo;
    userInfo = result.data.user;
    console.log(result.data);
    this.setState({userInfo});

    this.setState( { userSession, myData, userInfo } );

    };

  render() { 
    return (
      <div className="App">
        <div className="container-sm mi_cont">
          <ToastContainer />
          <Header />
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home2 connectionString={config.connectionString} />}/>
              <Route path="/social" element={
                <Social
                  myData={this.state.myData}
                  userSession={this.state.userSession} 
                  userInfo={this.state.userInfo}
                  handleSession={this.handleSession}
                  handleEvent={this.handleEvent} 
              />}/>
              <Route path="/about" element={<About apiKey={this.state.myData.apiKey} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <Footer />
        </div>
      </div>
    );
  };
};

export default App;
