import { NavLink } from 'react-router-dom';
// import { SocialIcon } from 'react-social-icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase-config';
import Notification from '../Notification/Notification';
import SearchBar from '../SearchBar/SearchBar';
import DarkModeToggle from '../DarkMode/DarkModeToggle';

const Navbar = () => {
	const [user] = useAuthState(auth);

	const logoutUser = async () => {
		await auth
			.signOut()
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<header className="sticky top-0 flex flex-row items-center justify-between p-5 font-space z-20">
			<div className="flex flex-row items-center justify-center">
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
			</div>
			<div className="pl-28">
				<NavLink
					className="focus:bg-[#F7AB0A] focus:text-[rgb(36,36,36)] focus:outline-none focus:border-none focus-visible:bg-[#F7AB0A] dark:text-[#001440] dark:focus:bg-teal-200 w-32 h-10 rounded text-1xl cursor-pointer uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0 hover:scale-110"
					to="/"
				>
					Home
				</NavLink>
				<NavLink
					className="focus:bg-[#F7AB0A] focus:text-[rgb(36,36,36)] focus:outline-none focus:border-none w-32 h-10 rounded text-1xl cursor-pointer uppercase text-[#F7AB0A] dark:text-[#001440] dark:focus:bg-teal-200 items-center inline-flex justify-center top-0 hover:scale-110"
					to="/trending"
				>
					Trending
				</NavLink>
				<NavLink
					className="focus:bg-[#F7AB0A] focus:text-[rgb(36,36,36)] focus:outline-none focus:border-none w-40 h-10 rounded text-1xl cursor-pointer uppercase text-[#F7AB0A] dark:text-[#001440] dark:focus:bg-teal-200 items-center inline-flex justify-center top-0 hover:scale-110"
					to="/createpost"
				>
					Create post
				</NavLink>
				<NavLink
					className="focus:bg-[#F7AB0A] focus:text-[rgb(36,36,36)] focus:outline-none focus:border-none w-32 h-10 rounded text-1xl cursor-pointer uppercase text-[#F7AB0A] dark:text-[#001440] dark:focus:bg-teal-200 items-center inline-flex justify-center top-0 hover:scale-110"
					to="/contact"
				>
					Contact
				</NavLink>
				<NavLink
					className="focus:bg-[#F7AB0A] focus:text-[rgb(36,36,36)] focus:outline-none focus:border-none w-32 h-10 rounded text-1xl cursor-pointer uppercase text-[#F7AB0A] dark:text-[#001440] dark:focus:bg-teal-200 items-center inline-flex justify-center top-0 hover:scale-110"
					to="/about"
				>
					About
				</NavLink>
			</div>
			<div className="flex flex-row items-center space-x-2 z-10 relative">
				<SearchBar />
				<Notification />
				<DarkModeToggle />
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
			</div>
		</header>
	);
};

export default Navbar;
