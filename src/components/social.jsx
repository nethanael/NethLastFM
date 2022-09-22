import React, { Component } from 'react';
import { toast } from 'react-toastify';


class Social extends Component {

    componentDidMount() {
        this.props.getFriends();
    };



    render() { 
        const { friends } = this.props;
        return (
        <div className='row align-items-center mi_row'>
            <div className="col mi_col"></div> 
            <div className='col mi_col'>
                <div className='col mi_col'>
                    <table className="table">
                        <tbody>
                        {friends.map(friend => 
                            <tr key={friend.registered.unixtime}>
                                <td><a href={friend.url}>{friend.name}</a></td>
                                <td><img src={friend.image[1]['#text']}></img></td>
                                <td>{friend.registered['#text']}</td>    
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
 
export default Social;
