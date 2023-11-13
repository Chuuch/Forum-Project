/* eslint-disable no-mixed-spaces-and-tabs */
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { get, ref } from 'firebase/database';
import { database } from '../../config/firebase-config';

const Home = () => {
	const [text] = useTypewriter({
		words: [
			'Welcome to DevTalk!',
			'<Made by developers />',
			'{For developers!}',
		],
		loop: true,
		delaySpeed: 2000,
	});

	const [postCount, setPostsCount] = useState([]);
	const [usersCount, setUsersCount] = useState([]);
    //const [user, loading, error] =  useAuthState(auth);

	useEffect(() => {
		const count = async () => {
			const postsSnapshot = await get(ref(database, '/posts'));
			const usersSnapshot = await get(ref(database, '/users'));
			const postCount = postsSnapshot.size;
			const usersCount = usersSnapshot.size;
			setPostsCount(postCount);
			setUsersCount(usersCount);
	}
	count()
},[]);

	return (
		<div className="flex flex-col items-center justify-center pb-48 bg-[rgb(36,36,36)] dark:bg-white h-screen font-space space-y-4">
			<h1 className="text-6xl font-semibold text-[#F7AB0A] p-20 mt-24 relative dark:text-[#001440] z-20">
				<span className="mr-3">{text}</span>
				<Cursor />
			</h1>
			<motion.div
			className='z-20'
			initial={{ x: -500, opacity: 0, scale: 0.5 }}
			animate={{ x: 0, opacity: 1, scale: 1 }}
			transition={{ duration: 1.5 }}>
			
					</motion.div>
			<div className="z-10 text-[#F7AB0A] dark:text-[] mt-10 text-2xl p-15">
			<div className="flex flex-row justify-center items-start z-40 cursor-pointer">
				<div className="absolute mt-24 z-50 pb-10">
			
				</div>
		</div>
			</div>
		 <dl className="mt-16 grid grid-cols-1 gap-8 items-center sm:mt-20 sm:grid-cols-2 lg:grid-cols-2 z-20">
			<div className="flex flex-row items-center justify-center space-x-2">
          		<dt className="text-3xl leading-7 text-[#F7AB0A] dark:text-[#001440]">Current posts:</dt>
          		<dd className="text-3xl font-bold leading-9 tracking-tight text-[#F7AB0A] dark:text-[#001440]">{postCount}</dd>
        	</div>
        	<div className="flex flex-row items-center justify-center space-x-2">
          		<dt className="text-3xl leading-7 text-[#F7AB0A] dark:text-[#001440]">Registered users: </dt>
          		<dd className="text-3xl font-bold leading-9 tracking-tight text-[#F7AB0A] dark:text-[#001440]">{usersCount}</dd>
        	</div>
		</dl>
			<div className="w-full absolute -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 dark:bg-teal-600/70"></div>
		</div>
	);
};

export default Home;
