import { ref, push, get } from 'firebase/database';
import { auth, database } from '../config/firebase-config';


export const createPost = async (title, content) => {
    const userSnapshot = await get(ref(database, `/users/${auth.currentUser.uid}`));
    const username = userSnapshot.val().username;
  
    await push(ref(database, '/posts'), {
      title: title,
      content: content,
      author: username,
      uid: auth.currentUser.uid,
      likedBy: '',
      repliedBy: '',
      createdAt: Date.now(),
    });
  };

