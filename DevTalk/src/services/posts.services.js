import { get, set, ref } from 'firebase/database';
import { db } from '../config/firebase-config';

export const getPostById = (postId) => {
    return get(ref(db, `posts/${postId}`))
};

export const createPost = (postId, title, author, content) => {
    return set(ref(db, `posts/${postId}`), {
        title: title,
        author: author,
        content: content,
        createdAt: Date.now()
    })
}

