
import { PropTypes } from 'prop-types';


export const SingleUser = ({user}) => {

console.log("Single user:" + user.isAdmin);
  return (
        <tr>
            <td className="text-left py-3 px-4">{user.firstName}</td>
            <td className="text-left py-3 px-4">{user.lastName}</td>
            <td className="text-left py-3 px-4"><a className="hover:text-blue-500" >{user.username}</a></td>
            <td className="text-left py-3 px-4"><a className="hover:text-blue-500" >{user.email}</a></td>
            <td className="text-left py-3 px-4">{user.createdOn}</td>
            <td className="text-left py-3 px-4">{user.isAdmin}
            <div className="flex items-center mb-4">
    <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
    <label htmlFor="bordered-checkbox-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">ADMIN</label>
</div></td>
            <td className="text-left py-3 px-4">{user.isBlocked}
            <div className="flex items-center mb-4">
    <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
    <label htmlFor="bordered-checkbox-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">BLOCKED</label>
</div></td>
        </tr>
  );
};



// PropTypes validation for the SingleUser component
SingleUser.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    createdOn: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isBlocked: PropTypes.bool.isRequired
  }).isRequired,
  
};

export default SingleUser;