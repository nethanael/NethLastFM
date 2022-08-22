import React, { Component } from 'react';

class Login extends Component {

    render() { 
        const { connectionString }  = this.props;
        return (
        <div className='row justify-content-md-center mi_row'>
            <div className="col mi_col"></div> 
            <div className='col-2 mi_col'>
                <a className="btn btn-primary" href={connectionString} role="button">Connect to your account</a>
            </div>
            <div className="col mi_col"></div> 
        </div>
        );
    };
};
 
export default Login;