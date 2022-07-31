import React, { Component } from 'react';

class Home extends Component {

    render() { 
        const { connectionString }  = this.props;
        return (
        <div className='row align-items-center mi_row'>
            <div className="col mi_col"></div> 
            <div className='col mi_col'>
                <a className="btn btn-primary" href={connectionString} role="button">Login Session</a>
            </div>
            <div className="col mi_col"></div> 
        </div>
        );
    };
};
 
export default Home;