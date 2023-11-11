
import { PropTypes } from 'prop-types';


export const SingleUser = ({user}) => {


  return (
        <tr>
            <td className="w-1/3 text-left py-3 px-4">{user.firstName}</td>
            <td className="w-1/3 text-left py-3 px-4">{user.lastName}</td>
            <td className="text-left py-3 px-4"><a className="hover:text-blue-500" >{user.username}</a></td>
            <td className="text-left py-3 px-4"><a className="hover:text-blue-500" >{user.email}</a></td>
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
    createdAt: PropTypes.string.isRequired,
    email: PropTypes.number.isRequired,
  }).isRequired,
  
};

export default SingleUser;