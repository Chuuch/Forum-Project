
import PropTypes from 'prop-types';

const UserFilter = ({ users, userFilter, setUserFilter }) => {
    return (
        <div>
            <label htmlFor="filter" className="block text-sm font-medium text-gray-400 dark:text-gray-700">
                Filter by username:
            </label>
            <select
                id="userFilter"
                name="filter"
                className="mt-1 p-2 border border-gray-300 rounded bg-[rgb(30,30,30)] text-gray-400 dark:bg-white dark:text-black"
                value={ userFilter }
                onChange={ (e) => setUserFilter(e.target.value) }
            >
                <option value={ 'all' } className="mb-2">
                    { 'All' }
                </option>
                { users.map(user => (
                    <option key={ user.createdOn } value={ user.uid } className="mb-2">
                        { user.username }
                    </option>
                )) }
            </select>
        </div>
    );
};

UserFilter.propTypes = {
    users: PropTypes.array.isRequired,
    userFilter: PropTypes.string.isRequired,
    setUserFilter: PropTypes.func.isRequired
};

export default UserFilter;