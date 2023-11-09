import { ref, push, get, set, } from 'firebase/database';
import { auth, database } from '../config/firebase-config';
import moment from 'moment-timezone';

export const createPost = async (title, content) => {
    const userSnapshot = await get(ref(database, `/users/${auth.currentUser.uid}`));
    const username = userSnapshot.val().username;

    const newPostRef = push(ref(database, '/posts/'));
    const newPostKey = newPostRef.key
  
    await set(newPostRef, {
      title: title,
      content: content,
      author: username,
      uid: auth.currentUser.uid,
      postId: newPostKey,
      likedBy: '',
      repliedBy: '',
      createdAt: moment().tz('Europe/Sofia').format('lll'),
    });
  };

  export const likePost = async (postKey, likedBy) => {
    const userSnapshot = await get(ref(database, `/users/${auth.currentUser.uid}`));
    const username = userSnapshot.val().username;

    const likedPostRef = ref(database, '/posts/');
    const likedPostSnapshot = await get(likedPostRef);

    if (likedPostSnapshot.exists()) {
      return;
    }

    const newLikeRef = await push(ref(database, `/posts/${postKey}/${likedBy}/`));

    await set(newLikeRef, {
      uid: auth.currentUser.uid,
      username: username,
    })
  }

  export const replyPost = async (reply) => {
    try {
      const userSnapshot = await get(ref(database, `/users/${auth.currentUser.uid}`));
      const username = userSnapshot.val().username;
  
      const newReplyRef = push(ref(database, '/replies'));
      const newReplyKey = newReplyRef.key;
  
      const replyData = {
        replyId: newReplyKey,
        uid: auth.currentUser.uid,
        username: username,
        likedBy: {},
        repliedBy: {},
        reply: reply,
        repliedAt: moment().tz('Europe/Sofia').format('lll'),
      };
  
      // Use the newReplyRef to set the data
      await set(newReplyRef, replyData);
    } catch (error) {
      console.error('Error replying to post:', error);
    }
  };
  
