import { NavLink } from "react-router-dom";

const NavBar = () => {
    return ( 
        <div className="row align-items-center mi_row">
            <div className="col mi_col"></div> 
            <div className="col mi_col">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink to="/" className="navbar-brand nav-link">
                                Home
                            </NavLink>
                            <NavLink to="/social" className="nav-link">
                                Social
                            </NavLink>
                            <NavLink to="/panel2" className="nav-link">
                                Panel 2
                            </NavLink>
                            <NavLink to="/panel3" className="nav-link">
                                Panel 3
                            </NavLink>
                            <NavLink to="/about" className="nav-link">
                                About
                            </NavLink>
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