
import { ref, update } from 'firebase/database';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { database } from '../../config/firebase-config';


export const SingleUser = ({user}) => {
  const [adminIsChecked, setAdminIsChecked] = useState(user.isAdmin);
  const [blockedIsChecked, setBlockedIsChecked] = useState(user.isBlocked);

  const handleAdmin = () => {
    setAdminIsChecked(!adminIsChecked);
    updateData('isAdmin',!adminIsChecked);
    console.log("admin is checked: " + !adminIsChecked);
  };

  const handleBlocked = () => {
    setBlockedIsChecked(!blockedIsChecked);
    updateData('isBlocked',!blockedIsChecked);
    console.log("blocked is checked: " + !blockedIsChecked);
  };

  const updateData = async (prop, value) => {
    const updates = {};
    updates[prop] = value;

    try {
      await update(ref(database, `users/${user.uid}`), updates);
    } catch (error) {
      console.error('Error updating data:', error.message);
    }
  };

  console.log("Single user:" + user.isAdmin);
  return (
        <tr>
            <td className="text-left py-3 px-4">{user.firstName}</td>
            <td className="text-left py-3 px-4">{user.lastName}</td>
            <td className="text-left py-3 px-4"><a className="hover:text-blue-500" >{user.username}</a></td>
            <td className="text-left py-3 px-4"><a className="hover:text-blue-500" >{user.email}</a></td>
            <td className="text-left py-3 px-4">{user.createdOn}</td>
            <td className="text-left py-3 px-4">
        <div className="flex items-center mb-4">
          <input
            id="bordered-checkbox-admin"
            type="checkbox"
            value={user.isAdmin}
            name="bordered-checkbox-admin"
            checked={adminIsChecked}
            onChange={handleAdmin}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="bordered-checkbox-admin"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            ADMIN
          </label>
        </div>
      </td>
      <td className="text-left py-3 px-4">
        <div className="flex items-center mb-4">
          <input
            id="bordered-checkbox-blocked"
            type="checkbox"
            value={user.isBlocked}
            name="bordered-checkbox-blocked"
            checked={blockedIsChecked}
            onChange={handleBlocked}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="bordered-checkbox-blocked"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            BLOCKED
          </label>
        </div>
      </td>
        </tr>
  );
};



// PropTypes validation for the SingleUser component
SingleUser.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    createdOn: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isBlocked: PropTypes.bool.isRequired
  }).isRequired,
  
};

export default SingleUser;