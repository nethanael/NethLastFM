import React, { Component } from 'react';
import http from '../services/httpService';
import config from '../config.json';
import md5 from 'md5';
import { toast } from 'react-toastify';


class Panel1 extends Component {
    state = { 
        myData: {
            myToken: null,
            apiKey: config.apiKey,
            apiSig: '',
            mySecret: config.apiSharedSecret,
            userKey: ''
        },
        friends: [],
        lovedTracks: [],
        userInfo: {},
        userSession: {}
    };

        handleSession = async (token) => {

        const { apiKey, mySecret } = this.state.myData;

        const myString = "api_key" + apiKey + "methodauth.getSessiontoken" + token + mySecret;
        const apiSig = md5(myString);

        let mydata = this.state.myData;
        mydata.apiSig = apiSig; 

        const method = "auth.getSession";
        const format = "json";
        const getUserSession = config.apiDataURL + "?method=" + method + "&api_key=" + apiKey + "&api_sig=" 
                                + apiSig + "&token=" + token + "&format=" + format;

        let userSession = this.state.userSession;
        const result = await http.get(getUserSession);
        userSession = result.data.session; 
        //console.log(result.data.session);

        mydata.userKey = userSession.key;

        this.setState( {userSession, mydata} );

    };

    componentDidMount() {

        // aca debería de jalar el token que me mandó Last FM cuando auteticamos el usuario 
        // y mandarlo al estado para seguirlo usando en las consultas
        // También hacemos la firma para metodos que requieran authorization

        //console.log("component Mount!");

        if (this.state.myData.myToken === null){
            const queryParams = new URLSearchParams(window.location.search);
            const myData = this.state.myData;
            myData.myToken = queryParams.get("token");
    
            this.handleSession(myData.myToken); 
            this.setState( {myData});
        }
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
        const { myToken, apiSig } = this.state.myData;
        const { friends, lovedTracks: tracks, userSession } = this.state;
        return (
        <div className='row align-items-center mi_row'>
            <div className="col mi_col"></div> 
            <div className='col mi_col'>
                <h1>Bienvenido {userSession.name}</h1>
                <div className='col mi_col'>
                    <button className="btn btn-warning" onClick={this.handleFriends}>
                        Friends
                    </button>
                    <table className="table">
                        {friends.map(friend => 
                            <tr key={friend.registered.unixtime}>
                                <td>{friend.name}</td>
                                <td><img src={friend.image[1]['#text']}></img></td>
                                <td>{friend.registered['#text']}</td>    
                            </tr>
                        )}  
                    </table>
                </div>
                <div className='col mi_col'>
                    <button className="btn btn-success" onClick={this.handleLovedTracks}>
                        Loved Tracks
                    </button>
                    <table className="table">
                        {tracks.map(track => 
                            <tr key={track.date.uts}>
                                <td>{track.artist.name}</td>
                                <td>{track.name}</td>  
                            </tr>
                        )}  
                    </table> 
                </div>
                <div className='col mi_col'>
                    <button className="btn btn-success" onClick={this.handleUser}>
                        Get User
                    </button>
                    <h3>
                        {userSession.name}  
                    </h3> 
                </div>
                <div className='col mi_col'>
                    <button className="btn btn-success" onClick={() => this.props.handleEvent(userSession.name)}>
                        Test Me
                    </button>
                    <h3>
                        {}  
                    </h3> 
                </div>
            </div>
            <div className="col mi_col"></div> 
        </div>
            );
    }
}
 
export default Panel1;
