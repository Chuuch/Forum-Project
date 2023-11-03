import { useState } from "react";
import { SocialIcon } from "react-social-icons";

const Notification = () => {
    const [showNotifications, setShowNotifications] = useState(false);

    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <div className="flex flex-row justify-start items-start">
            <div className="" onClick={handleNotificationClick}>
            <SocialIcon
					className="cursor-pointer hover:scale-125"
					network="email"
					fgColor="#F7AB0A"
					bgColor="transparent"
				/>
            </div>
            {showNotifications && (
                <div className="absolute mt-10 z-50 rounded-sm">
                    <ul className="bg-[rgb(30,30,30)] text-gray-400 border border-[#F7AB0A] z-50 rounded-sm">
                        <li className="p-3 hover:bg-[#F7AB0A] hover:text-[rgb(36,36,36)]">CodeAddict replied to your thread.</li>
                        <li className="p-3 hover:bg-[#F7AB0A] hover:text-[rgb(36,36,36)]">DevMonkey liked your comment.</li>
                        <li className="p-3 hover:bg-[#F7AB0A] hover:text-[rgb(36,36,36)]">CodeNinja liked your thread.</li>
                    </ul>
                </div>
            )}
        </div>
    )
};

export default Notification;