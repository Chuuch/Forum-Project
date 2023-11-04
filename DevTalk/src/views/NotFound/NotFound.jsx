const NotFound = () => {
	return (
		<div className="h-screen bg-[rgb(36,36,36)] flex flex-col items-center justify-start mt-36 z-30 text-3xl text-[#F7AB0A]">
			<h2 className="p-20">Error 404</h2>
			<h3>
				Oops! It seems that what you are looking for is beyond my.. scope! *wink
				wink*
			</h3>
			<div className="w-full absolute -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 z-1"></div>
		</div>
	);
};

export default NotFound;
