import { useState } from 'react';

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
				<svg viewBox="0 0 20 20" className="w-5 h-5 fill-[#F7AB0A] dark:fill-[#001440] cursor-pointer hover:scale-125 mr-2">
					<path
						xmlns="http://www.w3.org/2000/svg"
						d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
					/>
				</svg>
			</div>
			{showSearchBar && (
				<div className="search-bar bg-[rgb(30,30,30)] dark:bg-[#001440] p-2">
					<input
						className="bg-[rgb(30,30,30)] text-gray-400 dark:bg-[#001440] dark:text-teal-200"
						type="text"
						placeholder="Search"
						onChange={handleSearch}
					/>
				</div>
			)}
		</div>
	);
};

export default SearchBar;
