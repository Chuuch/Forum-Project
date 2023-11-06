import { ref, push,  } from 'firebase/database';
import { auth, database } from '../config/firebase-config';

// export const getPostById = (postId) => {
//     return get(ref(database, `posts/${postId}`))
// };

   export const createPost = async (title, postContent) => {

    // const newPostKey = ref(database).key;
    
        await push(ref(database, `/posts`), {
            title: title,
            postContent: postContent,
            author: { name: auth.currentUser, id: auth.currentUser.uid,}, 
            likedBy:'',
            repliedBy:'',
            createdAt: Date.now()
        })

    }

