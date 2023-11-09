import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

export default function checkUser(user, loading, error) {
    if (loading) {
        return (
          toast.success('Initializing user..')       
        );
      }
      if (error) {
        return (
         toast.error('Something went wrong!')
        );
      }
    if (user) {
        return user.uid
    } else {
        return <Navigate to="/login" state={{ from: location }} />
    }
}