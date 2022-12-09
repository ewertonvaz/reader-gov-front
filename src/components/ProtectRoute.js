import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

function ProtectRoute({ Component }) {
    const { loggedInUser } = useContext(AuthContext);

    console.log(loggedInUser);

    if (loggedInUser) {

        return <Component />;

    } else {
        
        return <Navigate to="/login" />;
    }
}

export default ProtectRoute;