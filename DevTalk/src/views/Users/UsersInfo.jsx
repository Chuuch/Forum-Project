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
        <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
                <tr>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Last name</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Username</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                </tr>
            </thead>
                <tbody className="text-gray-700 divide-y">
            {users.map((user) => (
                <SingleUser key={user.uid} user={user} />
            ))}
                </tbody>
        </table>
    );
}
