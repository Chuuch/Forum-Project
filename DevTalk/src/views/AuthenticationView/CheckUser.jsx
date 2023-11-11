import toast from "react-hot-toast";

export default function checkUser(user, loading, error) {
    if (loading) {
        toast.success('Initializing user..')  
        return undefined
      }

    if (error) {
        toast.error('Something went wrong!')
        return undefined
      }
      
    if (user) {
        return user.uid
    } 
}