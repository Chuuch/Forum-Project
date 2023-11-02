
    const Search = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-[rgb(247,171,10)] text-3xl">Search Threads</h1>
            <form
				className="flex items-center space-x-5 w-2/3 mb-30"
			>
				<div className="flex flex-col justify-center  w-3/4">
					<label htmlFor="thread" className="text-2xl text-gray-400">
						Title / Description
					</label>
					<input
						className="p-3 bg-[rgb(30,30,30)] text-[#F7AB0A] z-20"
						type="text"
						name="search"
					/>
				</div>
				<button className="block w-52 h-14 p-15 mt-7 z-20 cursor-pointer hover:scale-105 outline-none border-none rounded-sm text-base font-bold text-[rgb(36,36,36)] bg-[#F7AB0A] mb-15">
					SEARCH
				</button>
			</form>
            <div className="w-full absolute -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 z-1"></div>
        </div>
    )
};

export default Search;