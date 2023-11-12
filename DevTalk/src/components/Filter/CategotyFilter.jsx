
import PropTypes from 'prop-types';

const CategoryFilter = ({ categoryFilter, setCategoryFilter }) => {
    return (
        <div>
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700">
                Filter by category:
            </label>
            <select
                id="categoryFilter"
                name="filter"
                className="mt-1 p-2 border border-gray-300 rounded"
                value={ categoryFilter }
                onChange={ (e) => setCategoryFilter(e.target.value) }
            >
                <option value={ 'all' } className="mb-2">
                    { 'All' }
                </option>
                <option value={ 'csharp' } className="mb-2">
                    { 'C#' }
                </option>
                <option value={ 'java' } className="mb-2">
                    { 'Java' }
                </option>
                <option value={ 'javascript' } className="mb-2">
                    { 'JavaScript' }
                </option>
                <option value={ 'python' } className="mb-2">
                    { 'Python' }
                </option>
                <option value={ 'typescript' } className="mb-2">
                    { 'Typescript' }
                </option>
            </select>
        </div>
    );
};

CategoryFilter.propTypes = {
    categoryFilter: PropTypes.string.isRequired,
    setCategoryFilter: PropTypes.func.isRequired
};

export default CategoryFilter;