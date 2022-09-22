import React, { Component } from 'react';

class Home extends Component {

    render() { 
        const { name: userName } = this.props.userWEBSession;
        const { realname, playcount, country, image, url, album_count, artist_count, track_count } = this.props.userInfo;
        return (
        <div className='row justify-content-md-center mi_row'>
            <div className="col mi_col"></div> 
            <div className='col mi_col'>
                <div className='col mi_col'>
                    <div className="card">
                        <img src={image ? image[3]['#text'] : '../img/person-icon.png'} className="card-img-top" alt="profile pic" />
                        <div className="card-body">
                            <h5 className="card-title">{realname}</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Total Scrobbles: {playcount}</li>
                            <li className="list-group-item">Albums: {album_count}</li>
                            <li className="list-group-item">Artist: {artist_count}</li>
                            <li className="list-group-item">Tracks: {track_count}</li>
                        </ul>
                        <div className="card-body">
                            <a href={url} className="card-link">{url}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col mi_col"></div> 
        </div>
            );
    }
}
 
export default Home;
