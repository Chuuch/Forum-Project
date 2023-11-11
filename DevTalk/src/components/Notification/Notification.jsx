import { useState, useEffect } from 'react';
import { BsFillBellFill } from 'react-icons/bs';
import { ref, onValue, off } from 'firebase/database';
import { auth, database } from '../../config/firebase-config';

const Notification = () => {
	const [showNotifications, setShowNotifications] = useState(false);
	const [notifications, setNotifications] = useState([]);
	const [notificationCount, setNotificationCount] = useState(0);

	const handleNotificationClick = () => {
		setShowNotifications(!showNotifications);
		setNotificationCount(0);
	};

	useEffect(() => {
		const currentUser = auth.currentUser;

		if (currentUser) {
			const userId = currentUser.uid;
			const notificationsRef = ref(database, `notifications/${userId}/`);

			onValue(notificationsRef, (snapshot) => {
				if (snapshot.exists()) {
					const data = snapshot.val();
					const notificationArray = Object.values(data);
					setNotifications(notificationArray);
					setNotificationCount(notificationArray.length);
				}
			});

			return () => {
				off(notificationsRef);
			};
		}
	}, []);

	return (
		<div className="relative">
			<div className="" onClick={handleNotificationClick}>
				<BsFillBellFill className="w-6 h-6 fill-[#F7AB0A] dark:fill-[#001440] hover:scale-110 mt-1 mr-2 cursor-pointer" />
				{notificationCount > 0 && (
					<div className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
						{notificationCount}
					</div>
				)}
			</div>
			{showNotifications && (
				<div className="absolute mt-10 z-50 rounded-sm">
					<ul className="bg-[rgb(30,30,30)] text-gray-400 border border-[#F7AB0A] dark:bg-gray-800 dark:border-teal-200 w-72 z-50 rounded-sm">
						{notifications.map((notification) => (
							<li
								key={notification.id}
								className="p-3 hover:text-[#F7AB0A] dark:hover:text-teal-200 cursor-pointer"
							>
								{`${notification.author} ${
									notification.type === 'like' ? 'liked' : 'replied to'
								} your post.`}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Notification;
