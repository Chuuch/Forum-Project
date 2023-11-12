import { ref, get, update, push, child, onValue } from 'firebase/database';
import { auth, database } from '../config/firebase-config';
import moment from 'moment-timezone';
import { toast } from 'react-hot-toast';

export const createPost = async (title, content, category) => {
	const userSnapshot = await get(
		ref(database, `/users/${auth.currentUser.uid}`)
	);
	const username = userSnapshot.val().username;

	const post = {
		title,
		content,
		category: category,
		id: '',
		author: username,
		userID: auth.currentUser.uid,
		likedBy: '',
		createdAt: moment().tz('Europe/Sofia').format('lll'),
		timestamp: Date.now(),
	};

	const { key } = push(ref(database, 'posts'), post);

	update(ref(database), {
		[`posts/${key}/id`]: key,
		[`posts/${key}/${category}`]: category,
		[`users/${username}/posts/${key}`]: true,
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

export const getPostByCategory = async (postId, category) => {
	const snapshot = await get(ref(database, `posts/${postId}/${category}`));
	return snapshot.val();
};

export const getPostsByIds = async (ids) => {
	const posts = await getAllPosts();

	return posts.filter((p) => ids.includes(p.id));
};

export const deletePost = async (postId, categoryId) => {
	const postRef = ref(database, `posts/${postId}`);
	try {
		const postSnapshot = await get(postRef);
		const post = postSnapshot.val();
		const currentUserID = auth.currentUser.uid;
		if (post && post.userID === currentUserID) {
			return update(ref(database), {
				[`posts/${postId}`]: null,
				[`category/${categoryId}/posts/${postId}`]: null,
			});
		} else {
			toast.error('You are not authorized to delete this post.');
		}
	} catch (error) {
		console.error('Error getting post:', error);
	}
};

export const editPost = async (postId, title, content) => {
	const postRef = ref(database, `posts/${postId}`);
	const postSnapshot = await get(postRef);
	const post = postSnapshot.val();
	const currentUserID = auth.currentUser.uid;

	if (post && post.userID === currentUserID) {
		return update(postRef, {
			title: title,
			content: content,
			editedOn: moment().tz('Europe/Sofia').format('lll'),
		});
	} else {
		toast.error('You are not authorized to edit this post.');
	}
};

export const likePost = async (postId) => {
	const username = await getUsername();
	const like = {
		author: username,
	};

	const likesRef = ref(database, `posts/${postId}/likes`);
	const { key } = await push(likesRef, like);

	const postSnapshot = await get(ref(database, `posts/${postId}`));
	const authorId = postSnapshot.val().userID;

	const notification = {
		type: 'like',
		postId: postId,
		author: username,
		likedAt: moment().tz('Europe/Sofia').format('lll'),
	};

	update(ref(database), {
		[`users/${auth.currentUser.uid}/likes/${postId}/${key}`]: true,
		[`notifications/${authorId}/${key}`]: notification,
	});
};

export const dislikePost = (postId, username) => {
	const updateLikes = {};
	updateLikes[`posts/${postId}/likedBy/${username}`] = null;
	updateLikes[`users/${username}/likedPosts/${postId}`] = null;

	return update(ref(database), updateLikes);
};

export const getLikes = async (postId) => {
	const snapshot = await get(ref(database, `posts/${postId}/likes`));

	if (!snapshot.exists()) {
		return [];
	}

	return Object.keys(snapshot.val()).map((key) => ({
		...snapshot.val()[key],
		id: key,
	}));
};

export const getLikesCount = async (postId) => {
	const likes = await getLikes(postId);
	return likes.length;
};

export const replyPost = async (postId, replyContent) => {
	const username = await getUsername();
	const reply = {
		content: replyContent,
		author: username,
		userID: auth.currentUser.uid,
		repliedAt: moment().tz('Europe/Sofia').format('lll'),
	};

	const postRepliesRef = ref(database, `posts/${postId}/replies`);
	const { key } = await push(postRepliesRef, reply);

	const postSnapshot = await get(ref(database, `posts/${postId}`));
	const authorId = postSnapshot.val().userID;

	const notification = {
		type: 'reply',
		postId: postId,
		author: username,
		replyContent: replyContent,
		repliedAt: moment().tz('Europe/Sofia').format('lll'),
	};

	update(ref(database), {
		[`notifications/${authorId}/${key}`]: notification,
		[`users/${auth.currentUser.uid}/replies/${postId}/${key}`]: true,
		[`posts/${postId}/replies/${key}/id`]: key,
	});
};

export const getReplies = async (postId) => {
	try {
		const postRepliesRef = ref(database, `posts/${postId}/replies`);
		const snapshot = await get(child(postRepliesRef, '/'));

		if (snapshot.exists()) {
			const replies = [];
			snapshot.forEach((childSnapshot) => {
				const reply = childSnapshot.val();
				replies.push(reply);
			});
			return replies;
		} else {
			return [];
		}
	} catch (error) {
		console.error('Error fetching replies:', error);
		throw error;
	}
};

export const getRepliesCount = async (postId) => {
	const replies = await getReplies(postId);
	return replies.length;
};

export const getNotifications = (userId, authorId) => {
	const notificationsRef = ref(database, `notifications/${authorId}`);

	return onValue(notificationsRef, (snapshot) => {
		const notifications = [];
		snapshot.forEach((childSnapshot) => {
			notifications.push({ ...childSnapshot.val(), id: childSnapshot.key });
		});
		return notifications;
	});
};

export const deleteReply = async (postId, replyId) => {
	const replyRef = ref(database, `posts/${postId}/replies/${replyId}`);
	try {
		const replySnapshot = await get(replyRef);
		const reply = replySnapshot.val();
		const currentUserID = auth.currentUser.uid;
		if (reply && reply.userID === currentUserID) {
			return update(ref(database), {
				[`posts/${postId}/replies/${replyId}`]: null,
			});
		} else {
			console.log('You are not authorized to delete this post.');
		}
	} catch (error) {
		console.error('Error getting post:', error);
	}
};
