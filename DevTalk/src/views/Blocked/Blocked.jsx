const BlockedUser = () => {
	return (
		<div className="h-screen bg-[rgb(36,36,36)] dark:bg-white flex flex-col items-center justify-start mt-36 z-30 text-3xl text-[#F7AB0A] dark:text-[#001440]">
			<h2 className="p-20 z-20">Error 404</h2>
			<h3 className="z-20">
				This account is blocked! Contact us to see why!
			</h3>
			<div className="w-full absolute -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 dark:bg-teal-600/70 z-1"></div>
		</div>
	);
};

export default BlockedUser;