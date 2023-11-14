import { useState, useEffect } from 'react';
import { BsFillBellFill } from 'react-icons/bs';
import { ref, onValue, off } from 'firebase/database';
import { auth, database } from '../../config/firebase-config';

const Notification = () => {
	const [showNotifications, setShowNotifications] = useState(false);
	const [notifications, setNotifications] = useState([]);
	const [notificationCount, setNotificationCount] = useState(0);

	useEffect(() => {
		const currentUser = auth.currentUser;

		if (currentUser) {
			const userId = currentUser.uid;

			const notificationsRef = ref(database, `notifications/${userId}`);
			const unsubscribe = onValue(notificationsRef, (snapshot) => {
				if (snapshot.exists()) {
					const data = snapshot.val();
					const notificationArray = Object.values(data);
					setNotifications(notificationArray);
					setNotificationCount(notificationArray.length);
				} else {
					setNotifications([]);
					setNotificationCount(0);
				}
			});

			return () => {
				off(notificationsRef);
				unsubscribe();
			};
		}
	}, [setNotifications, setNotificationCount]);

	const handleNotificationClick = () => {
		setNotificationCount(0);
		setShowNotifications(!showNotifications);
	}

	return (
		<div className="relative">
			<div
				className=""
				onClick={handleNotificationClick}
			>
				<BsFillBellFill
					size={25}
					className="mr-2 cursor-pointer hover:scale-110 fill-[#F7AB0A] dark:fill-[#001440]"
				/>
				{notificationCount > 0 && (
					<div className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
						{notificationCount}
					</div>
				)}
			</div>
			{showNotifications && (
				<div className="fixed mt-10 flex flex-col justify-center right-10 z-50 w-auto rounded-sm">
					<ul className=" flex flex-col items-start justify-start bg-[rgb(30,30,30)] text-gray-400 border border-[#F7AB0A] dark:bg-gray-800 dark:border-teal-200 z-50 rounded-sm">
						{notifications.map((notification) => (
							<li
								key={notification.id}
								className="p-3 hover:text-[#F7AB0A] dark:hover:text-teal-200 cursor-pointer space-x-5"
							>
								{`${notification.author} ${
									notification.type === 'like' ? 'liked' : 'replied to'
								} your post.`}{' '}
								{notification.type === 'like' ? notification.likedAt : notification.repliedAt}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Notification;
