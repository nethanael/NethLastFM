import React, { Component } from 'react';

class Home extends Component {

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
