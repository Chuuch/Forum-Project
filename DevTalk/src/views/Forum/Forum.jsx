import { useEffect, useState } from 'react';
import { get, ref } from 'firebase/database';
import { database } from '../../config/firebase-config';
import { motion } from 'framer-motion';

const Forum = () => {
	const [postLists, setPostsLists] = useState([]);

	useEffect(() => {
		const getPosts = async () => {
			try {
				const postsSnapshot = await get(ref(database, '/posts'));
				const postsData = [];
				postsSnapshot.forEach((post) => {
					postsData.push(post.val());
				});
				setPostsLists(postsData);
			} catch (error) {
				console.log(error.message);
			}
		};
		getPosts();
	}, []);

	return (
		<div className="h-screen bg-[rgb(36,36,36)] dark:bg-white flex flex-col items-center justify-center">
			<h1 className="relative top-44 flex justify-center text-[#F7AB0A] dark:text-[#001440] z-1 text-4xl ">
				Forum
			</h1>
			<div
			className="flex flex-col z-10 space-y-4 mt-60">
				{postLists.map((post, index) => (
					<motion.div
					initial={{ y: -300, opacity: 0 }}
					transition={{ duration: 1.5 }}
					whileInView={{ opacity: 1, y: 0}}
					viewport={{ once: true }}
						key={index}
						className="bg-[rgb(30,30,30)] dark:bg-gray-800 p-4 rounded-lg shadow-md w-[800px] dark:w-[800px]"
					>
						<h3 className="text-2xl font-semibold text-gray-400 dark:text-[#eee] pb-12">
							{post.title}
						</h3>
						<p className="text-lg text-[#ddd] dark:text-[#ccc] pb-2">
							{post.content}
						</p>
						<p className="text-gray-600 dark:text-gray-400">
							Posted by {post.author}
						</p>
					</motion.div>
				))}
			</div>

			<div className="w-full fixed -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 dark:bg-teal-600/70 z-1"></div>
		</div>
	);
};

export default Forum;
