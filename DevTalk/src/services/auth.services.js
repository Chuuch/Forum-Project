import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { get, ref, set } from 'firebase/database';
import { auth, database } from '../config/firebase-config';
import { toast } from 'react-hot-toast';

export const getUserByID = (uid, setCurrentProfile) => {
    try {
      const userRef = database.ref(`/users/${uid}`);
  
      userRef.on('value', (snapshot) => {
        const userData = snapshot.val();
        setCurrentProfile(userData);
      });
  
    } catch (err) {
      toast.error(err, "error");
    }
  };

export const registerUser = async (firstName, lastName, username, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        // Signed up 
        const user = userCredential.user;
        set(ref(database, `users/${user?.uid}`), {
            uid: user?.uid, firstName, lastName, username, email, likedPosts: {}, isAdmin: false,
            avatar: 'https://firebasestorage.googleapis.com/v0/b/devtalk-1d6f5.appspot.com/o/default-avatar.png?alt=media&token=0a7d2e0e-4a8c-4f9f-8d3c-5a7d1e5d5c8e',
            createdOn: Date.now(),
        });
        
        return { user: user?.uid }
    } catch (error) {
        const errorMessage = error.message;
        let errMsg = ''
        if (errorMessage.includes('email-already-in-use')) {
            errMsg = 'Please, choose another email address. This one is already in use.'
        } else {
            errMsg = 'Something went wrong. Please, try again.'
        }
        return { error: errMsg }
    }
};

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        // Signed in
        const user = userCredential.user;
        return { user: user?.uid }
    } catch (error) {
        const errorMessage = error.message;
        let errMsg = ''
        if (errorMessage.includes('auth/invalid-login-credentials')) {
            errMsg = 'Please check your credentials.'
        } else {
            errMsg = 'Something went wrong. Please, try again.'
        }
        return { error: errMsg }
    }
}

export const logoutUser = async () => {
    try {
        localStorage.removeItem('email')
        await signOut(auth);
        toast.success('Logout successful!')
        return true
    } catch (error) {
        toast.error('Something went wrong. Please, try again.')
        return false
    }
}

export const allUsers = async () => {
    try {
        const usersSnapshot = await get(ref(database, 'users'));
        const usersData = usersSnapshot.val();

        if (usersData) {
            const usersArray = Object.values(usersData);
            return usersArray;
        } else {
            return [];
        }
    } catch (error) {
        toast.error('Something went wrong. Please, try again.');
        return false;
    }
};