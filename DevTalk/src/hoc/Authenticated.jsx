
import { Navigate, useLocation } from "react-router-dom"
import { auth } from "../config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

// eslint-disable-next-line react/prop-types
export default function Authenticated({ children }) {
    const location = useLocation();
    const [user, loading, error] =  useAuthState(auth)
    if (loading) {
        return (
          <div>
            <p>Initialising User...</p>
          </div>
        );
      }
      if (error) {
        return (
          <div>
            <p>Error: {error}</p>
          </div>
        );
      }
    if (user) {
        return children
    } else {
        return <Navigate to="/login" state={{ from: location }} />
    }
}