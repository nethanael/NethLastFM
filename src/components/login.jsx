import React, { Component } from 'react';
class Login extends Component {

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
            console.log("Component Did Mount!");
    
            handleSession(siteCredentials.myToken);                 // Here we send the token to the handleSession method 

        }
    };  

    render() { 
        const { userWEBSession: user } = this.props;
        const { connectionString }  = this.props;
        return (
        <div className='row justify-content-md-center mi_row'>
            <div className="col mi_col"></div> 
            {!user.name &&  
                <div className='col-2 mi_col'>
                    <a className="btn btn-primary" href={connectionString} role="button">Connect to your account</a>
                </div>
            }
            <div className="col mi_col"></div> 
        </div>
        );
    };
};
 
export default Login;