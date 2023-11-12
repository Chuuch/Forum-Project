import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { get, ref, set } from 'firebase/database';
import { toast } from 'react-hot-toast';
import { auth, database } from '../config/firebase-config';

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

export const verifyUser = async (user) => {
    try {
        await sendEmailVerification(user);
        toast.success('Verification email sent!')
    } catch (error) {
        toast.error('Something went wrong. Please, try again.')
    }
}

export const registerUser = async (firstName, lastName, username, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        // Signed up 
        const user = userCredential.user;
        // Update user profile with displayName in firebase
        const displayName = `${firstName} ${lastName}`;
        await updateProfile(user, { displayName });
        // Register user in database
        set(ref(database, `users/${user?.uid}`), {
            uid: user?.uid, firstName, lastName, username, email, likedPosts: {}, isAdmin: false,
            avatar: '',
            createdOn: Date.now(),
        });
        await verifyUser(user)
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
export const updateUserPhoto = async (uid, avatar) => {
    try {
        const userRef = database.ref(`/users/${uid}`);
        await set(userRef, {
            uid, avatar
        });
        return true
    } catch (error) {
        return false
    }
}

export const updateUserEmail = async (uid, email) => {
    try {
        const userRef = database.ref(`/users/${uid}`);
        await set(userRef, {
            uid, email
        });
        return true
    } catch (error) {
        return false
    }
}

