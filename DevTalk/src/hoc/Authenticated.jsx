
import { Navigate, useLocation } from "react-router-dom"
import { auth } from "../config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

// eslint-disable-next-line react/prop-types
export default function Authenticated({ children }) {
    const location = useLocation();
    const [user] =  useAuthState(auth)

    if (user) {
        return children
    } else {
        return <Navigate to="/login" state={{ from: location }} />
    }
}