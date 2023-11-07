import { useState } from 'react';
import { BsFillBellFill } from 'react-icons/bs'

const Notification = () => {
	const [showNotifications, setShowNotifications] = useState(false);

	const handleNotificationClick = () => {
		setShowNotifications(!showNotifications);
	};

	return (
		<div className="flex flex-row justify-start items-start">
			<div className="" onClick={handleNotificationClick}>
				<BsFillBellFill className="w-6 h-6 fill-[#F7AB0A] dark:fill-[#001440] hover:scale-125 mt-1 mr-2 cursor-pointer" />
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
