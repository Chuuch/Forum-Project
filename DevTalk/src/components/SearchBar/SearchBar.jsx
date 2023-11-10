import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

const SearchBar = () => {
	const [showSearchBar, setShowSearchBar] = useState(false);

	const handleSearchIconClick = () => {
		setShowSearchBar(!showSearchBar);
	};

	const handleSearch = (e) => {
		console.log('Search:', e.target.value);
	};

	return (
		<div className="flex flex-row justify-center items-center">
			<div onClick={handleSearchIconClick}>
				<BsSearch className='w-6 h-6 fill-[#F7AB0A] dark:fill-[#001440] hover:scale-110 cursor-pointer mt-1 mr-2'/>
			</div>
			{showSearchBar && (
				<><div className="flex flex-row bg-[rgb(30,30,30)] dark:bg-gray-800 p-2 mr-2">
					<input
						className="bg-[rgb(30,30,30)] text-gray-400 dark:bg-gray-800 dark:text-gray-300 w-64 h-6"
						type="text"
						placeholder="Search"
						onChange={handleSearch}
						required />
				</div><div className=''>
					<NavLink to='/search'>
					<button className="block p-15 h-10 w-32 hover:scale-105 z-20 uppercase outline-none border-none rounded text-1xl font-bold text-[rgb(36,36,36)] bg-[#F7AB0A] dark:text-[#001440] dark:bg-teal-200">
						Search
					</button>
					</NavLink>
				</div></>)}
		</div>
	);
};

export default SearchBar;
