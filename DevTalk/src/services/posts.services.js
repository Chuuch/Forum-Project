import { ref, push, get, set } from 'firebase/database';
import { auth, database } from '../config/firebase-config';
import moment from 'moment-timezone';

export const createPost = async (title, content) => {
    const userSnapshot = await get(ref(database, `/users/${auth.currentUser.uid}`));
    const username = userSnapshot.val().username;

    const newPostRef = push(ref(database, '/posts'));
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

  export const likePost = async (postKey) => {
    const userSnapshot = await get(ref(database, `/users/${auth.currentUser.uid}`));
    const username = userSnapshot.val().username;

    const likedPostRef = ref(database, `/likes/${username}/${postKey}`);
    const likedPostSnapshot = await get(likedPostRef);

    if (likedPostSnapshot.exists()) {
      return;
    }

    const newLikeRef = await push(ref(database, `/likes/${username}`));

    await set(newLikeRef, {
      uid: auth.currentUser.uid,
    })
  }

  export const replyPost = async (reply) => {
    const userSnapshot = await get(ref(database, `/users/${auth.currentUser.uid}`));
    const username = userSnapshot.val().username;
  
    const repliesRef = ref(database, '/replies');
    const newReplyRef = push(repliesRef);
  
    const newReplyKey = newReplyRef.key;
  
    const replyData = {
      replyId: newReplyKey,
      uid: auth.currentUser.uid,
      username: username,
      reply: reply,
      repliedAt: moment().tz('Europe/Sofia').format('lll'),
    };
  
    await set(newReplyRef, replyData);
  };
  
