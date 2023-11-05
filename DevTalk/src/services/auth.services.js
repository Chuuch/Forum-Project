import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {  auth, database } from '../config/firebase-config';
import { get, ref, set } from 'firebase/database';

export const registerUser = async (handle, firstName, lastName, username, email, password) => {
    console.log(auth)
    
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            console.log(userCredential)
            const user = userCredential.user;
            set(ref(database, `users/${handle}`), {
            uid: user?.uid, firstName, lastName, username, email, likedPosts: {},
            createdOn: Date.now(),
            });
            // TODO: To be removed later
            console.log('User created: ', get(ref(database, `users/${handle}`)))
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // TODO: To be removed later or replaced with notification
            alert(errorCode)
            console.log(errorCode, errorMessage)
        });
};

export const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const logoutUser = () => {
    return signOut(auth);
}

