import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

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
