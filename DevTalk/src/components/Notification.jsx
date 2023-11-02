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
                <div className="">
                    <ul className="">
                        <li>Notification 1</li>
                        <li>Notification 2</li>
                        <li>Notification 3</li>
                    </ul>
                </div>
            )}
        </div>
    )
};

export default Notification;