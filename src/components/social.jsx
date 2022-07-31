import React, { Component } from 'react';

class Social extends Component {

    componentDidMount() {

        // aca debería de jalar el token que me mandó Last FM cuando auteticamos el usuario 
        // y mandarlo al estado para seguirlo usando en las consultas
        // También hacemos la firma para metodos que requieran authorization

        //console.log("component Mount!");

        const  { myData, handleSession }  = this.props;
        console.log("component mounted: ", myData);
        if (myData.myToken === null){
            const queryParams = new URLSearchParams(window.location.search);
            const myData = this.props.myData;
            myData.myToken = queryParams.get("token");
    
            handleSession(myData.myToken); 
        }
    };

    render() { 
        const { name: userName } = this.props.userSession;
        const { realname, playcount } = this.props.userInfo;
        return (
        <div className='row align-items-center mi_row'>
            <div className="col mi_col"></div> 
            <div className='col mi_col'>
                <h1>Bienvenido {userName}</h1>

                <div className='col mi_col'>
                    <table class="table">
                        <tbody>
                        <tr>
                            <th scope="row">Real Name</th>
                            <td>{realname}</td>
                        </tr>
                        <tr>
                            <th scope="row">Total Scrobbles</th>
                            <td>{playcount}</td>
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
 
export default Social;
