import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

function ProtectRoute({ Component, hideContainer }) {

    const { loggedInUser } = useContext(AuthContext);

    if (loggedInUser) {

        if (hideContainer) {
            return <Component />;
        }
        else {
            return (
                <div className="container">
                    <Component />
                </div>
            );
        }

    } else {

        return <Navigate to="/login" />;
    }
}

export default ProtectRoute;