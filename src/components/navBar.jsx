import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ userWEBSession: user }) => {
    return ( 
        <div className="row align-items-center mi_row">
            <div className="col mi_col"></div> 
            <div className="col mi_col">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">                                           
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">      
                        <div className="navbar-nav">
                            {!user.name &&                                          
                                                                                           
                                <NavLink to="/" className="navbar-brand nav-link">          
                                    Login
                                </NavLink>
                            }
                            {user.name &&
                                <React.Fragment>
                                    <NavLink to="/home" className="nav-link">
                                        Home {user.name}
                                    </NavLink>
                                    <NavLink to="/social" className="nav-link">
                                        Social
                                    </NavLink>
                                    <NavLink to="/dashboard" className="nav-link">
                                        Dashboard
                                    </NavLink>
                                    <NavLink to="/about" className="nav-link">
                                        About
                                    </NavLink>
                                    <NavLink to="/logout" className="nav-link">
                                        Log out
                                    </NavLink>
                                </React.Fragment>
                            }
                        </div>
                    </div>
                </div>
            </nav>
            </div>
            <div className="col mi_col"></div> 
        </div>
     );
}
 
export default NavBar;



//<NavLink to="/about" className="navbar-item">
//About
//</NavLink>