import { Component } from 'react';

// This component doesnt render nothing its just mounted to call the handle Logout method

class Logout extends Component {
    componentDidMount() {
        this.props.handleLogout();
    }
    render() { 
        return null;
    }
}
 
export default Logout;