import axios from "axios";
import { toast } from 'react-toastify';

    // here´s where we put or delete the custom request headers, it could be a valid token.

    //axios.defaults.headers.common['prueba-token'] = "token_de_prueba";
    //axios.defaults.headers.common['crossdomain'] = true;

    //delete axios.defaults.headers.common["Access-Control-Request-Headers"];
    //delete axios.defaults.headers.common["Origin"];


    // here´s is where we catch unexpected errorers with interceptors

    axios.interceptors.response.use(null, error =>{
        const expectedError = 
            error.response && 
            error.response.status >= 400 && 
            error.response.status < 500;

        if (!expectedError){
            console.log('Logging the error', error);
            toast('there´s an unexpected error!');
        }
        
        return Promise.reject(error);       
    });

    // here we export the important methods of axios

    export default {
        get: axios.get,
        post: axios.post,
        put: axios.put,
        delete: axios.delete
    };