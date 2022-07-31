import React, { useEffect, useState } from 'react';
import http from '../services/httpService';
import config from '../config.json';
import { useSearchParams } from 'react-router-dom';


function Panel12(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const param = searchParams.get("token");
    console.log(param);

    useEffect(() => {
            console.log("componente Mounted!");
    });

    return (
        <div className='row align-items-center mi_row'>
            <div className="col mi_col"></div> 
            <div className='col mi_col'>
                <h1>Panel 1</h1>
                <a class="btn btn-primary" onClick={this.handleMethod1} role="button">Method 1</a>
            </div>
            <div className="col mi_col"></div> 
        </div>
    );
}

export default Panel12;
