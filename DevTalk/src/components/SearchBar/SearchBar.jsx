import { useState } from "react";

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
                <img src='/icons/search3.png' alt="search-icon" className="w-5 h-5 cursor-pointer bg-transparent hover:scale-125"/>
            </div>
            {showSearchBar && (
                <div className="search-bar bg-[rgb(30,30,30)] p-2">
                    <input
                        className="bg-[rgb(30,30,30)] text-gray-400" 
                        type="text"
                        placeholder="Search by tag"
                        onChange={handleSearch} />
                </div>
            )}
        </div>
    )
};

export default SearchBar;