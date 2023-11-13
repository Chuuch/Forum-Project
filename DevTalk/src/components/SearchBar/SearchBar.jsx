import { get, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { NavLink, useNavigate } from 'react-router-dom';
import { database } from '../../config/firebase-config';

const SearchBar = () => {
	const [showSearchBar, setShowSearchBar] = useState(false);
	const [results, setResults] = useState([]);
	const [queryVal, setQueryVal] = useState('');
    const navigate =useNavigate();
    
	useEffect(() => {
		const searchFunc = async () => {
			try {
				if (queryVal.trim() !== '') {
					const postsQuery = await get(
						ref(database, 'posts'),
						
					);

					//const postsSnapshot = await get(postsQuery);
					console.log("Query Value: ", queryVal);
					//console.log("postsSnapshot.exists(): ", postsSnapshot.exists());
					//console.log("postsSnapshot.val(): ", postsSnapshot.val());
					if (postsQuery.exists()) {
						const postData = postsQuery.val();
						const dataArray = Object.values(postData);
						const matches=[];
						for(const post of dataArray){
							//console.log("data: ", post.content)
							if(post.content.toLowerCase().includes(queryVal.toLowerCase())
							||post.title.toLowerCase().includes(queryVal.toLowerCase())
							||post.author.toLowerCase().includes(queryVal.toLowerCase())){
								console.log(post);
                                matches.push(post);
                            } 
						}
						setResults(matches);
					} else {
						console.log("No results found");
						setResults([]);
					}
				}
			} catch (error) {
				console.log("An error occurred: " + error);
			}
		};

		searchFunc();
	}, [queryVal]);
	

    const handleSearchIconClick = () => {
		setShowSearchBar(!showSearchBar);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		setQueryVal(e.target.value);
		console.log('Search:', e.target.value);
	};

	const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${queryVal}`, { state: { results } });
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
						onChange={handleSearch} value={queryVal}
						required />
				</div><div className=''>
					<NavLink to='/search'>
					<button onClick={handleSubmit} className="block p-15 h-10 w-32 hover:scale-105 z-20 uppercase outline-none border-none rounded text-1xl font-bold text-[rgb(36,36,36)] bg-[#F7AB0A] dark:text-[#001440] dark:bg-teal-200">
						Search
					</button>
					</NavLink>
				</div></>)}
		</div>
	);
};

export default SearchBar;
