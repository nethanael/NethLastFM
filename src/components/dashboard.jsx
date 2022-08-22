import React, { Component } from 'react';
import http from '../services/httpService';
import config from '../config.json';
class Dashboard extends Component {
    state = { 
    };

    componentDidMount() {

    };

    handleFriends = async () => {
        const { apiKey } = this.state.myData;
        const method = "user.getfriends";
        const user = this.state.userSession.name;
        const format = "json";
        const getFriendsString = config.apiDataURL + "?method=" + method + "&user=" + user + "&api_key=" + apiKey + "&format=" + format;
        //console.log(getFriendsString);
        const result = await http.get(getFriendsString);

        let friends = this.state.friends;
        friends = result.data.friends.user;
        console.log(result.data.friends.user);
        this.setState({friends});
    };

    handleLovedTracks = async () => {
        const { apiKey } = this.state.myData;
        const method = "user.getlovedtracks";
        const user = this.state.userSession.name;
        const format = "json";
        const getLovedTracksString = config.apiDataURL + "?method=" + method + "&user=" + user + "&api_key=" + apiKey + "&format=" + format;
        //console.log(getFriendsString);
        const result = await http.get(getLovedTracksString);
        
        let lovedTracks = this.state.lovedTracks;
        lovedTracks = result.data.lovedtracks.track;
        //console.log(result.data.lovedtracks.track);
        this.setState({lovedTracks});
    };

    handleUser = async () => {
        const { apiKey } = this.state.myData;
        const method = "user.getinfo";
        const user = "nethanael";
        const format = "json";
        const getUserInfo = config.apiDataURL + "?method=" + method + "&user=" + user + "&api_key=" + apiKey + "&format=" + format;
        console.log(getUserInfo);
        const result = await http.get(getUserInfo);
        
        let userInfo = this.state.userInfo;
        userInfo = result.data.user;
        console.log(result.data);
        this.setState({userInfo});
    };

    render() { 
        return <h1>Dashboard</h1>;
        
    }
}
 
export default Dashboard;
