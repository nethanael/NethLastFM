// imports

import { Navigate, Outlet } from "react-router-dom";

// function that evaluates if user really did the log in

const handleUseAuth = (userInfo) => {
    //const user = {loggedIn: false};
    const user = userInfo;
    //console.log("mi user check: ", user.name);
    return user && user.name;
}

// Component that render the "Outlet component if criteria is met (being logged in)"
// If criteria is not met then only renders de login component.

const ProtectedRoutes = (props) => {
    //const isAuth = true;
    const isAuth = handleUseAuth(props.userInfo);
    //console.log("mi user check: ", user.name);
    return isAuth ? <Outlet /> : <Navigate to="/" />;
}
 
export default ProtectedRoutes;