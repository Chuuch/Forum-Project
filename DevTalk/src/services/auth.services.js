import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ref, set } from 'firebase/database';
import { auth, database } from '../config/firebase-config';

export const registerUser = async (firstName, lastName, username, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        // Signed up 
        const user = userCredential.user;
        set(ref(database, `users/${user?.uid}`), {
            uid: user?.uid, firstName, lastName, username, email, likedPosts: {},
            createdOn: Date.now(),
        });
        // Admins will be handled in the DB for now
        // set(ref(database, `admins/${user?.uid}`), {
        //     'isAdmin': false,
        // });
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
        await signOut(auth);
        return true
    } catch (error) {
        return false
    }
}

