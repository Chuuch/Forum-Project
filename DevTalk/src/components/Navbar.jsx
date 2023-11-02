import { NavLink } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';

const Navbar = () => {
	return (
		<header className="sticky top-0 flex flex-row items-center justify-between p-5 font-space z-20">
			<div className="flex flex-row items-center justify-center">
				<img src="logo2.png" alt="logo image" className="w-[80px] h-[80px]" />
			</div>
			<div>
				<NavLink
					className="text-2xl cursor-pointer p-10 uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0 hover:scale-110"
					to="/"
				>
					Home
				</NavLink>
				<NavLink
					className="text-2xl cursor-pointer p-10 uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0 hover:scale-110"
					to="/trending"
				>
					Trending
				</NavLink>
				<NavLink
					className="text-2xl cursor-pointer p-10 uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0 hover:scale-110"
					to="/search"
				>
					Search
				</NavLink>
				<NavLink
					className="text-2xl cursor-pointer p-10 uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0 hover:scale-110"
					to="/contact"
				>
					Contact
				</NavLink>
				<NavLink
					className="text-2xl cursor-pointer p-10 uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0 hover:scale-110"
					to="/about"
				>
					About
				</NavLink>
			</div>
			<div className="flex flex-row items-center space-x-2 z-10">
				<SocialIcon
					className="cursor-pointer hover:scale-125"
					network="email"
					fgColor="#F7AB0A"
					bgColor="transparent"
				/>
				<NavLink to='/login' className='z-20'>
					<button className="block p-15 h-10 w-32 hover:scale-105 z-20 uppercase outline-none border-none rounded-sm text-1xl font-bold text-[rgb(36,36,36)] bg-[#F7AB0A]">
						LOGIN
					</button>
				</NavLink>
			</div>
		</header>
	);
};

export default Navbar;
