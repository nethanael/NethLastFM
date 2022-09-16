import React, { Component } from 'react';
import { toast } from 'react-toastify';


class TopTracks extends Component {

    componentDidMount() {
        this.props.getTracks();
    };

    render() { 
        const { topTracks: tracks } = this.props;
        return (
        <div className='row align-items-center mi_row'>
            <div className="col mi_col"></div> 
            <div className='col mi_col'>
                <div className='col mi_col'>
                    <table className="table">
                        <tbody>
                        {tracks.map(track => 
                            <tr key={track.artist.mbid}>
                                <td>{track.artist.name}</td>
                                <td>{track.name}</td>
                                <td>Played: {track.playcount}</td>  
                            </tr>
                        )}
                        </tbody>  
                    </table> 
                </div>
            </div>
            <div className="col mi_col"></div> 
        </div>
            );
    }
}
 
export default TopTracks;
