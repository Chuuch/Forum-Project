import { motion } from 'framer-motion';
import { SinglePost } from '../SinglePost/SinglePost';
import { useState, useEffect } from 'react';
import {   get, limitToLast,  orderByChild,  query,  ref } from 'firebase/database';
import { database } from '../../config/firebase-config'
import Footer from '../../components/Footer/Footer'

const Trending = () => {
	const [postListTime, setPostListTime] = useState([]);
	const [sortedPostsReplies, setSortedPostsReplies] = useState([]);

	useEffect(() => {
		const getPosts = async () => {
			try {
				const postQueryTime=query(ref(database, 'posts'), orderByChild('timestamp'), limitToLast(10));
				const postsSnapshotTime = await get(postQueryTime);
				const postsDataTime = [];
				postsSnapshotTime.forEach((post) => {
				postsDataTime.unshift(post.val());
				});
				setPostListTime(postsDataTime);
			} catch (error) {
				console.log(error.message);
			}
		};
		getPosts();
	}, []);

	useEffect(() => {
        const fetchAndSortPosts = async () => {
            try {
                const postsSnapshot = await get(query(ref(database, 'posts')));

                if (postsSnapshot.exists()) {
                    const postsArray = Object.values(postsSnapshot.val());
                    const sortedPosts = postsArray.sort((a, b) => {
                        const repliesA = a.replies ? Object.keys(a.replies).length : 0;
                        const repliesB = b.replies ? Object.keys(b.replies).length : 0;
                        return repliesB - repliesA;
                    });
					const topTenPosts=sortedPosts.slice(0,10);
                    setSortedPostsReplies(topTenPosts);
                } else {
                    console.log('No posts found.');
                }
            } catch (error) {
                console.error('Error fetching and sorting posts:', error.message);
            }
        };

        fetchAndSortPosts();
    }, []);

	return (
		
		<div className="h-screen bg-[rgb(36,36,36)] dark:bg-white flex flex-col items-center justify-start space-y-2 z-20">
			<h1 className="flex justify-start text-[#F7AB0A] dark:text-[#001440] z-20 text-4xl mt-10 ">
				Trending
			</h1>
			<div className='inline-flex items-start space-x-6'>
			<div className="flex flex-col space-y-4 mt-32 pb-10">
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
					{postListTime.map((post, index) => (
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
						Most replied posts
					</h1>
					{sortedPostsReplies.map((post, index) => (
						<SinglePost key={index} post={post} />
					))}
				</motion.div>
			</div>
			</div>
			<div className="w-full fixed -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 dark:bg-teal-600/70"></div>
			<Footer />
		</div>
	);
};

export default Trending;
