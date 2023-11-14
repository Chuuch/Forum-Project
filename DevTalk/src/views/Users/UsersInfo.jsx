import SingleUser from "./SingleUser";
import { allUsers } from "../../services/auth.services";
import { useEffect, useState } from "react";

export default function UsersInfo () {
    const [users, setUsers] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await allUsers();
            if (usersData) {
                setUsers(usersData);
            }
        };

        fetchUsers();
    }, []);
    if (!users || users.length === 0) {
        return <div>Loading users...</div>; 
      }
    const filteredUsers = users.filter((user) => {
        const username = user.username ? user.username.toLowerCase() : '';
        const email = user.email ? user.email.toLowerCase() : '';
        const searchValueLowerCase = searchValue ? searchValue.toLowerCase() : '';
      
        return username.includes(searchValueLowerCase) || email.includes(searchValueLowerCase);
      });
      console.log(filteredUsers);

    return (
        <div>
            <input type="text" id="simple-search" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Search by username or email..." 
            value={searchValue} 
            onChange={(e) => setSearchValue(e.target.value)}/>
            
        <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
                <tr>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Last name</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Username</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Created on</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Admin</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Blocked</th>
                </tr>
            </thead>
                <tbody className="text-gray-700 divide-y">
            {filteredUsers.map((user) => (
                <SingleUser key={user.uid} user={user} />
            ))}
                </tbody>
        </table>
        </div>
    );
}
