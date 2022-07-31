import React, { useEffect, useState } from 'react';
import http from '../services/httpService';
import config from '../config.json';

const connectionString = config.apiAuthURL + 'api_key=' + config.apiKey;
console.log(connectionString);

function Home(props) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getUsers(){
            //const result = await axios(connectionString);
            const result = await http.get(config.jasonPlaceHolderUsersURL);
            const users = result.data;
            //console.log(result.data);
            setUsers(users);
        };

        getUsers();
    });

    return (
        <div className='row align-items-center mi_row'>
            <div className="col mi_col"></div> 
            <div className='col mi_col'>
                <ul>
                {users.map(user => <li key={user.id}>{user.name}</li>)}  
                </ul>
            </div>
            <div className="col mi_col"></div> 
        </div>
    );
}

export default Home;