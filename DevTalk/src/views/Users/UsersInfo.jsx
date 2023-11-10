import SingleUser from "./SingleUser";
import { allUsers } from "../../services/auth.services";
import { useEffect, useState } from "react";

export default function UsersInfo () {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await allUsers();
            if (usersData) {
                setUsers(usersData);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="flex flex-col z-20 space-y-4 mt-32 pb-10">
            {users.map((user) => (
                <SingleUser key={user.uid} user={user} />
            ))}
        </div>
    );
}