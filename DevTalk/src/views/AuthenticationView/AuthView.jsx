import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../config/firebase-config";
import AdminView from "../AdminView/AdminView";
import UserView from "../UserVIew/UserView";
import BlockedView from "../Blocked/BlockedView";

// eslint-disable-next-line react/prop-types
export default function AuthenticationViews({ userId }) {
	const [ isAdmin, setIsAdmin ] = useState(null);
	const [ isBlocked, setIsBlocked ] = useState(null);

	useEffect(() => {
		if (userId !== undefined) {
			const checkIfUserIsAdmin = async () => {
				try {
					const usersSnapshot = await get(ref(database, 'users'));
					if (usersSnapshot.exists()) {
						const usersData = usersSnapshot.val();
						if (usersData && usersData[ userId ] !== undefined && usersData[ userId ].isAdmin === true) {
							setIsAdmin(true);
						} else {
							setIsAdmin(false);
						}
					} else {
						console.log('No data found in the "users" entity.');
					}
				} catch (error) {
					console.error('Error checking if user is an admin:', error.message);
				}
			};

			checkIfUserIsAdmin();
		}
	}, [ userId ]);

	useEffect(() => {
		if (userId !== undefined) {
			const checkIfUserIsBlocked = async () => {
				try {
					const usersSnapshot = await get(ref(database, 'users'));
					if (usersSnapshot.exists()) {
						const usersData = usersSnapshot.val();
						if (usersData && usersData[ userId ] !== undefined && usersData[ userId ].isBlocked === true) {
							setIsBlocked(true);
						} else {
							setIsBlocked(false);
						}
					} else {
						console.log('No data found in the "users" entity.');
					}
				} catch (error) {
					console.error('Error checking if user is blocked:', error.message);
				}
			};

			checkIfUserIsBlocked();
		}
	}, [ userId ]);

	return (
		<div>
      {isBlocked ? (
        <BlockedView />
      ) : isAdmin ? (
        <AdminView />
      ) : (
        <UserView />
      )}
    </div>
	);
}


