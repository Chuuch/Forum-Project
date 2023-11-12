
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
            <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">TRUE</button></td>
            <td className="text-left py-3 px-4">{user.isBlocked}
            <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">TRUE</button></td>
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