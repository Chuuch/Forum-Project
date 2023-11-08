import { NavLink, useLocation, } from 'react-router-dom';
// import { SocialIcon } from 'react-social-icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, database } from '../../config/firebase-config';
import Notification from '../Notification/Notification';
import SearchBar from '../SearchBar/SearchBar';
import DarkModeToggle from '../DarkMode/DarkModeToggle';
import { logoutUser } from '../../services/auth.services';
import { motion } from 'framer-motion';
import { CgProfile } from 'react-icons/cg';
import { get, ref } from 'firebase/database';
import { useEffect, useState } from'react';

const Navbar = () => {
	const [user] = useAuthState(auth);
	const location = useLocation();
	const [currentUser, setCurrentUser] = useState(null);

	const getCurrentUser = async () => {
		try {
			const userSnapshot = await get(
				ref(database, `/users/${auth.currentUser.uid}`)
			);
			const userData = userSnapshot.val();
			if (userData && userData.username) {
				setCurrentUser(userData.username);
			}
		} catch (error) {
			console.error('Error fetching user data:', error);
		}
	};

	useEffect(() => {
		if (user) {
			getCurrentUser();
		}
	}, [user]);

	return (
		<header className="sticky top-0 dark:bg-white bg-[rgb(36,36,36)] h-20 flex flex-row items-center justify-between p-5 font-space z-20 ">
			<motion.div
				initial={{ x: -500, opacity: 0, scale: 0.5 }}
				animate={{ x: 0, opacity: 1, scale: 1 }}
				transition={{ duration: 1.5 }}
				className="flex flex-row items-center justify-center"
			>
				{/* <img src="/logos/logo2.png" alt="logo image" className="w-[80px] h-[80px] hover:scale-110" /> */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="icon icon-tabler icon-tabler-message-code w-24 h-24 cursor-pointer stroke-width-2 fill-none stroke-[#F7AB0A] dark:stroke-[#001440]"
					viewBox="0 0 24 24"
					stroke="currentColor"
					fill="none"
				>
					{' '}
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />{' '}
					<path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />{' '}
					<path d="M10 9l-2 2l2 2" /> <path d="M14 9l2 2l-2 2" />{' '}
				</svg>
			</motion.div>
			<div className="pl-28 flex flex-row">
				<motion.div
					initial={{ x: -500, opacity: 0, scale: 0.5 }}
					animate={{ x: 1, opacity: 1, scale: 1 }}
					transition={{ duration: 1.5 }}
				>
					<NavLink
						className={`focus:bg-[#F7AB0A] focus:text-[rgb(36,36,36)] focus:outline-none focus:border-none focus-visible:bg-[#F7AB0A] dark:text-[#001440] dark:focus:bg-teal-200 w-32 h-10 rounded text-1xl cursor-pointer uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0 hover:scale-110 ${
							location.pathname === '/'
								? 'bg-[#F7AB0A] text-[rgb(36,36,36)] dark:bg-teal-200 dark:text-[#001440]'
								: ''
						}`}
						to="/"
					>
						Home
					</NavLink>
					<NavLink
						className={`focus:bg-[#F7AB0A] focus:text-[rgb(36,36,36)] focus:outline-none focus:border-none focus-visible:bg-[#F7AB0A] dark:text-[#001440] dark:focus:bg-teal-200 w-32 h-10 rounded text-1xl cursor-pointer uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0 hover:scale-110 ${
							location.pathname === '/trending'
								? 'bg-[#F7AB0A] text-[rgb(36,36,36)] dark:bg-teal-200 dark:text-[#001440]'
								: ''
						}`}
						to="/trending"
					>
						Trending
					</NavLink>
					<NavLink
						className={`focus:bg-[#F7AB0A] focus:text-[rgb(36,36,36)] focus:outline-none focus:border-none focus-visible:bg-[#F7AB0A] dark:text-[#001440] dark:focus:bg-teal-200 w-32 h-10 rounded text-1xl cursor-pointer uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0 hover:scale-110 ${
							location.pathname === '/forum'
								? 'bg-[#F7AB0A] text-[rgb(36,36,36)] dark:bg-teal-200 dark:text-[#001440]'
								: ''
						}`}
						to="/forum"
					>
						Forum
					</NavLink>
				</motion.div>
				<motion.div
					initial={{ x: +500, opacity: 0, scale: 0.5 }}
					animate={{ x: 1, opacity: 1, scale: 1 }}
					transition={{ duration: 1.5 }}
				>
					<NavLink
						className={`focus:bg-[#F7AB0A] focus:text-[rgb(36,36,36)] focus:outline-none focus:border-none focus-visible:bg-[#F7AB0A] dark:text-[#001440] dark:focus:bg-teal-200 w-32 h-10 rounded text-1xl cursor-pointer uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0 hover:scale-110 ${
							location.pathname === '/createpost'
								? 'bg-[#F7AB0A] text-[rgb(36,36,36)] dark:bg-teal-200 dark:text-[#001440]'
								: ''
						}`}
						to="/createpost"
					>
						Create Post
					</NavLink>
					<NavLink
						className={`focus:bg-[#F7AB0A] focus:text-[rgb(36,36,36)] focus:outline-none focus:border-none focus-visible:bg-[#F7AB0A] dark:text-[#001440] dark:focus:bg-teal-200 w-32 h-10 rounded text-1xl cursor-pointer uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0 hover:scale-110 ${
							location.pathname === '/contact'
								? 'bg-[#F7AB0A] text-[rgb(36,36,36)] dark:bg-teal-200 dark:text-[#001440]'
								: ''
						}`}
						to="/contact"
					>
						Contact
					</NavLink>
					<NavLink
						className={`focus:bg-[#F7AB0A] focus:text-[rgb(36,36,36)] focus:outline-none focus:border-none focus-visible:bg-[#F7AB0A] dark:text-[#001440] dark:focus:bg-teal-200 w-32 h-10 rounded text-1xl cursor-pointer uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0 hover:scale-110 ${
							location.pathname === '/about'
								? 'bg-[#F7AB0A] text-[rgb(36,36,36)] dark:bg-teal-200 dark:text-[#001440]'
								: ''
						}`}
						to="/about"
					>
						About
					</NavLink>
				</motion.div>
			</div>
			<motion.div
				initial={{ x: 500, opacity: 0, scale: 0.5 }}
				animate={{ x: 0, opacity: 1, scale: 1 }}
				transition={{ duration: 1.5 }}
				className="flex flex-row items-center space-x-2 z-10 relative"
			>
				<SearchBar />
				<Notification />
				<DarkModeToggle />
				{!user ? (
					<NavLink to="/userprofile" className="hidden">
						<CgProfile className="w-7 h-7 mt-1 mr-2 text-[#F7AB0A] dark:text-[#001440]" />
					</NavLink>
				) : (
					<NavLink to="/userprofile" className="inline-flex z-20 hover:scale-105 mr-5">
						<CgProfile className="w-7 h-7 mt-1 mr-2 text-[#F7AB0A] dark:text-[#001440]" />
						<p className='mt-2 text-[#F7AB0A] dark:text-[#001440]'>{currentUser}</p>
					</NavLink>
				)}
				{!user ? (
					<NavLink to="/login" className="z-20">
						<button className="block p-15 h-10 w-32 hover:scale-105 z-20 uppercase outline-none border-none rounded text-1xl font-bold text-[rgb(36,36,36)] bg-[#F7AB0A] dark:text-[#001440] dark:bg-teal-200">
							LOGIN
						</button>
					</NavLink>
				) : (
					<NavLink to="/login" className="z-20">
						<button
							className="block p-15 h-10 w-32 hover:scale-105 z-20 uppercase outline-none border-none rounded text-1xl font-bold text-[rgb(36,36,36)] bg-[#F7AB0A] dark:text-[#001440] dark:bg-teal-200"
							onClick={() => logoutUser()}
						>
							LOGOUT
						</button>
					</NavLink>
				)}
			</motion.div>
		</header>
	);
};

export default Navbar;
