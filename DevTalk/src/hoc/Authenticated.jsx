
import { Navigate, useLocation } from "react-router-dom"
import { auth } from "../config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from 'react-hot-toast';

// eslint-disable-next-line react/prop-types
export default function Authenticated({ children }) {
    const location = useLocation();
    const [user, loading, error] =  useAuthState(auth)
    if (loading) {
        return (
          toast.success('Initialising user..')       
        );
      }
      if (error) {
        return (
         toast.error('Something went wrong!')
        );
      }
    if (user) {
        return children
    } else {
        return <Navigate to="/login" state={{ from: location }} />
    }
}
