import { useState } from 'react';

const Notification = () => {
	const [showNotifications, setShowNotifications] = useState(false);

	const handleNotificationClick = () => {
		setShowNotifications(!showNotifications);
	};

	return (
		<div className="flex flex-row justify-start items-start">
			<div className="" onClick={handleNotificationClick}>
				{/* <img src='/icons/bell.svg' alt="notification bell"
					className="cursor-pointer hover:scale-125 w-5 h-5 fill-[#F7AB0A] dark:fill-[#001440]"
				/> */}
			<svg xmlns="http://www.w3.org/2000/svg" className="bi bi-bell-fill cursor-pointer hover:scale-125 fill-[#F7AB0A] dark:fill-[#001440] w-5 h-5 mr-2" viewBox="0 0 16 16"> <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/> </svg>
			</div>
			{showNotifications && (
				<div className="absolute mt-10 z-50 rounded-sm">
					<ul className="bg-[rgb(30,30,30)] text-gray-400 border border-[#F7AB0A] dark:bg-gray-800 dark:border-teal-200 z-50 rounded-sm">
						<li className="p-3 hover:text-[#F7AB0A] dark:hover:text-teal-200 cursor-pointer">
							CodeAddict replied to your thread.
						</li>
						<li className="p-3 hover:text-[#F7AB0A] dark:hover:text-teal-200 cursor-pointer">
							DevMonkey liked your comment.
						</li>
						<li className="p-3 hover:text-[#F7AB0A] dark:hover:text-teal-200 cursor-pointer">
							CodeNinja liked your thread.
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default Notification;
