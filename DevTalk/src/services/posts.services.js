import { ref, get, update, push, child } from 'firebase/database';
import { auth, database } from '../config/firebase-config';
import moment from 'moment-timezone';

export const createPost = async (title, content) => {
	const userSnapshot = await get(
		ref(database, `/users/${auth.currentUser.uid}`)
	);
	const username = userSnapshot.val().username;

	const post = {
		title,
		content,
		categoryId: '',
		id: '',
		author: username,
		likedBy: '',
		createdAt: moment().tz('Europe/Sofia').format('lll'),
    timestamp: Date.now(),
	};

	const { key } = push(ref(database, 'posts'), post);

	update(ref(database), {
		[`posts/${key}/id`]: key,
		[`users/${username}/posts/${key}`]: true,
		// [`posts/${key}/${categoryId}`]: true,
	});
	return key;
};

export const getUsername = async () => {
	const userSnapshot = await get(
		ref(database, `/users/${auth.currentUser.uid}`)
	);
	const username = userSnapshot.val().username;
	return username;
};

export const getAllPosts = async () => {
	const snapshot = await get(ref(database, 'posts'));

	if (!snapshot.exists()) {
		return [];
	}

	return Object.keys(snapshot.val()).map((key) => ({
		...snapshot.val()[key],
		id: key,
	}));
};

export const getPostById = async (postId) => {
	const snapshot = await get(ref(database, `posts/${postId}`));

	return snapshot.val();
};

export const getPostsByIds = async (ids) => {
	const posts = await getAllPosts();

	return posts.filter((p) => ids.includes(p.id));
};

export const deletePost = async (postId, username, categoryId) => {
	return update(ref(database), {
		[`posts/${postId}`]: null,
		[`users/${username}/posts/${postId}`]: null,
		[`category/${categoryId}/posts/${postId}`]: null,
	});
};

export const editPost = async (postId, content) => {
	return update(ref(database), {
		[`posts/${postId}/content`]: content,
		[`posts/${postId}/editedOn`]: moment().tz('Europe/Sofia').format('lll'),
	});
};

export const likePost = async (postId, username, author, like = true) => {
	const snapshot = await get(ref(database, `users/${author}/likesReceived`));
	const likesReceived = snapshot.val() || 0;

	return update(ref(database), {
		[`posts/${postId}/likedBy/${username}`]: like || null,
		[`users/${username}/likesGiven/${postId}`]: like || null,
		[`users/${author}/likesReceived`]:
			like === true ? likesReceived + 1 : likesReceived - 1,
	});
};

export const replyPost = async (postId, replyContent) => {
	const username = await getUsername();
	const reply = {
		content: replyContent,
		author: username,
		repliedAt: moment().tz('Europe/Sofia').format('lll'),
	};


	const postRepliesRef = ref(database, `posts/${postId}/replies`);

	const { key } = await push(postRepliesRef, reply);

	update(ref(database), {
		[`users/${auth.currentUser.uid}/replies/${postId}/${key}`]: true,
	});
};

export const getReplies = async (postId) => {
	try {
		const postRepliesRef = ref(database, `posts/${postId}/replies`);
		const snapshot = await get(child(postRepliesRef, '/'));

		if (snapshot.exists()) {
			// Convert the snapshot to an array of replies
			const replies = [];
			snapshot.forEach((childSnapshot) => {
				const reply = childSnapshot.val();
				replies.push(reply);
			});
			return replies;
		} else {
			// No replies found
			return [];
		}
	} catch (error) {
		console.error('Error fetching replies:', error);
		throw error;
	}
};
