import React, { Component } from 'react';

class Home extends Component {

    componentDidMount() {

        // This is where we catch the Auth TOKEN gave by lastFM after the authentication, cause this is our call back URL 
        // We will send this token to the main state in order to create a Last.fm web service session
        // also we build the signature for some specific API methods

        // Authentication tokens are user and API account specific. 
        // They are valid for 60 minutes from the moment they are granted.

        const  {siteCredentials, handleSession }  = this.props;    // Here we get the siteCredentials from the state via props, and 
                                                                    // the handleSession method
        //const cookie = localStorage.getItem('key')
        
        // Check if token already exists, if not then catch it from the URL callback
        if (siteCredentials.myToken === null){
            const queryParams = new URLSearchParams(window.location.search);
            const siteCredentials = this.props.siteCredentials;
            siteCredentials.myToken = queryParams.get("token");
    
            handleSession(siteCredentials.myToken);                 // Here we send the token to the handleSession method  
        }
    };

    render() { 
        const { name: userName } = this.props.userWEBSession;
        const { realname, playcount, country, image, url } = this.props.userInfo;
        return (
        <div className='row justify-content-md-center mi_row'>
            <div className="col mi_col"></div> 
            <div className='col mi_col'>
                <h1>Welcome {userName}</h1>

                <div className='col mi_col'>
                    <table className="table">
                        <tbody>
                        <tr>
                            <th scope="row">Real Name</th>
                            <td>{realname}</td>
                        </tr>
                        <tr>
                            <th scope="row">Country</th>
                            <td>{country}</td>
                        </tr>
                        <tr>
                            <th scope="row">Profile Pic</th>
                            <td><img src={image ? image[1]['#text'] : '../img/person-icon.png'}></img></td>
                        </tr>
                        <tr>
                            <th scope="row">Total Scrobbles</th>
                            <td>{playcount}</td>
                        </tr>
                        <tr>
                            <th scope="row">URL</th>
                            <td><a href={url}>{url}</a></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className='col mi_col'>
                    <button className="btn btn-success" onClick={() => this.props.handleEvent({realname})}>
                        Test Me
                    </button>
                </div>
            </div>
            <div className="col mi_col"></div> 
        </div>
            );
    }
}
 
export default Home;
