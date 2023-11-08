import { motion } from 'framer-motion';
import { SinglePost } from '../SinglePost/SinglePost';
import { useState, useEffect } from 'react';
import {   get, limitToLast,  orderByChild,  query,  ref } from 'firebase/database';
import { database } from '../../config/firebase-config';

const Trending = () => {
	const [postLists, setPostsLists] = useState([]);

	useEffect(() => {
		const getPosts = async () => {
			try {
				const postQuery=query(ref(database, 'posts'), orderByChild('timestamp'), limitToLast(10));
				const postsSnapshot = await get(postQuery);
				const postsData = [];
				postsSnapshot.forEach((post) => {
				postsData.unshift(post.val());
				});
				setPostsLists(postsData);
				console.log(setPostsLists(postsData));
			} catch (error) {
				console.log(error.message);
			}
		};
		getPosts();
	}, []);

	return (
		
		<div className=" h-screen bg-[rgb(36,36,36)] dark:bg-white flex flex-col items-center justify-start space-y-2">
			<h1 className="fixed flex justify-start text-[#F7AB0A] dark:text-[#001440] z-10 text-4xl mt-10 ">
				Trending
			</h1>
			<div className='inline-flex space-x-6'>
			<div className="flex flex-col z-10 space-y-4 mt-32 pb-10">
				<motion.div
					className='flex flex-col z-10 space-y-4 mt-32 pb-10'
					initial={{ y: -300, opacity: 0 }}
					transition={{ duration: 1.5 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
				>
					<h1 className='text-3xl flex justify-center text-[#F7AB0A] dark:text-[#001440]'>
						Latest posts
					</h1>
					{postLists.map((post, index) => (
						<SinglePost key={index} post={post} />
					))}
				</motion.div>
			</div>
			<div className="flex flex-col z-10 space-y-4 mt-32 pb-10">
				<motion.div
					className='flex flex-col z-10 space-y-4 mt-32 pb-10'
					initial={{ y: -300, opacity: 0 }}
					transition={{ duration: 1.5 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
				>
					<h1 className='text-3xl flex justify-center text-[#F7AB0A] dark:text-[#001440]'>
						Most liked posts
					</h1>
					{postLists.map((post, index) => (
						<SinglePost key={index} post={post} />
					))}
				</motion.div>
			</div>
			</div>
			<div className="w-full fixed -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 dark:bg-teal-600/70 z-1"></div>
		</div>
	);
};

export default Trending;
