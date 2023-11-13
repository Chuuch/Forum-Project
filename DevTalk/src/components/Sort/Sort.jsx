
import PropTypes from 'prop-types';

const Sort = ({ sort, setSort }) => {
    return (
        <div>
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700">
                Sort by date:
            </label>
            <select
                id="sort"
                name="filter"
                className="mt-1 p-2 border border-gray-300 rounded"
                value={ sort }
                placeholder='Sort by date'
                onChange={ (e) => setSort(e.target.value) }
            >
                {/* <option value={ 'Sort' } className="mb-2">
                    { 'Sort' }
                </option> */}
                <option value={ 'DESC' } className="mb-2">
                    { 'Sort Latest Date' }
                </option>
                <option value={ 'ASC' } className="mb-2">
                    { 'Sort Oldest Date' }
                </option>
            </select>
        </div>
    );
};

Sort.propTypes = {
    sort: PropTypes.string.isRequired,
    setSort: PropTypes.func.isRequired
};

export default Sort;