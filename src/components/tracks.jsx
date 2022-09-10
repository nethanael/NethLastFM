import React, { Component } from 'react';
import { toast } from 'react-toastify';


class Tracks extends Component {

    componentDidMount() {
        this.props.getTracks();
    };

    render() { 
        const { lovedTracks: tracks } = this.props;
        return (
        <div className='row align-items-center mi_row'>
            <div className="col mi_col"></div> 
            <div className='col mi_col'>
                <div className='col mi_col'>
                    <table className="table">
                        {tracks.map(track => 
                            <tr key={track.date.uts}>
                                <td>{track.artist.name}</td>
                                <td>{track.name}</td>
                                <td><img src={track.image[1]['#text']}></img></td>  
                            </tr>
                        )}  
                    </table> 
                </div>
            </div>
            <div className="col mi_col"></div> 
        </div>
            );
    }
}
 
export default Tracks;
