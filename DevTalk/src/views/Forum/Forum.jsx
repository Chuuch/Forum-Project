import { motion } from 'framer-motion';
import { SinglePost } from '../SinglePost/SinglePost';
import { useEffect, useState } from 'react';
import { getAllPosts } from '../../services/posts.services';
import { replyPost, getUsername } from '../../services/posts.services';

export const Forum = () => {
	const [postLists, setPostsLists] = useState([]);

	const handleReply = async (id, replyContent) => {

		await replyPost(id, replyContent);



		const username = getUsername();


		const newReply = {
			content: replyContent,
			author: username,
		};


		const updatedPosts = postLists.map((post) => {
			if (post.id === id) {
				return {
					...post,
					replies: [...post.replies, newReply],
				};
			}
			return post;
		});

		setPostsLists(updatedPosts);
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const posts = await getAllPosts();
			setPostsLists(posts);
		};
		fetchPosts();
	}, []);

	return (
		<div className="h-screen bg-[rgb(36,36,36)] dark:bg-white flex flex-col items-center justify-start space-y-2">
			<h1 className="fixed flex justify-start text-[#F7AB0A] dark:text-[#001440] z-10 text-4xl mt-10">
				Forum
			</h1>
			<motion.div
				className="flex flex-col space-y-4 mt-32 pb-10 z-20"
				initial={{ y: -300, opacity: 0 }}
				transition={{ duration: 1.5 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
			>
				<div className="flex flex-col z-20 space-y-4 mt-32 pb-10">
					{postLists.map((postId, index) => (
						<SinglePost key={index} post={postId} handleReply={handleReply} />
					))}
				</div>
			</motion.div>
			<div className="w-full fixed -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 dark:bg-teal-600/70 z-1"></div>
		</div>
	);
};

export default Forum;
