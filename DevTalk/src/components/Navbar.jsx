import { NavLink } from 'react-router-dom';
// import { SocialIcon } from 'react-social-icons';
import Notification from './Notification';
import SearchBar from './SearchBar';

const Navbar = () => {
	return (
		<header className="sticky top-0 flex flex-row items-center justify-between p-5 font-space z-20">
			<div className="flex flex-row items-center justify-center">
				<img src="logo2.png" alt="logo image" className="w-[80px] h-[80px] hover:scale-110" />
			</div>
			<div className='pl-28'>
				<NavLink
					className="focus:bg-[#F7AB0A] focus:text-[rgb(36,36,36)] focus:outline-none focus:border-none focus-visible:bg-[#F7AB0A] w-32 h-10 rounded text-1xl cursor-pointer uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0 hover:scale-110"
					to="/"
				>
						Home
				</NavLink>
				<NavLink
					className="focus:bg-[#F7AB0A] focus:text-[rgb(36,36,36)] focus:outline-none focus:border-none w-32 h-10 rounded text-1xl cursor-pointer uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0 hover:scale-110"
					to="/trending"
				>
					Trending
				</NavLink>
				<NavLink
					className="focus:bg-[#F7AB0A] focus:text-[rgb(36,36,36)] focus:outline-none focus:border-none w-32 h-10 rounded text-1xl cursor-pointer uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0 hover:scale-110"
					to="/contact"
				>
					Contact
				</NavLink>
				<NavLink
					className="focus:bg-[#F7AB0A] focus:text-[rgb(36,36,36)] focus:outline-none focus:border-none w-32 h-10 rounded text-1xl cursor-pointer uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0 hover:scale-110"
					to="/about"
				>
					About
				</NavLink>
			</div>
			<div className="flex flex-row items-center space-x-2 z-10 relative">
				<SearchBar className='text-[#F7AB0A]'/>
				<Notification />
				<NavLink to='/login' className='z-20'>
					<button className="block p-15 h-10 w-32 hover:scale-105 z-20 uppercase outline-none border-none rounded text-1xl font-bold text-[rgb(36,36,36)] bg-[#F7AB0A]">
						LOGIN
					</button>
				</NavLink>
			</div>
		</header>
	);
};

export default Navbar;
