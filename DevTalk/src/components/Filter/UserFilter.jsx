
import PropTypes from 'prop-types';

const UserList = ({ users, filter, setFilter }) => {
    console.log(users)

    return (
        <div>
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700">
                Filter by username:
            </label>
            <select
                id="filter"
                name="filter"
                className="mt-1 p-2 border border-gray-300 rounded"
                value={ filter }
                onChange={ (e) => setFilter(e.target.value) }
            >
                <option key={ 'all' } value={ 'all' } className="mb-2">
                    { 'All' }
                </option>
                { users.map(user => (
                    <option key={ user.uid } value={ user.uid } className="mb-2">
                        { user.username }
                    </option>
                )) }
            </select>
        </div>
    );
};

UserList.propTypes = {
    users: PropTypes.array.isRequired,
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired
};

export default UserList;