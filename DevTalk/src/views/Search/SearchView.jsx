//import SearchBar from "../../components/SearchBar/SearchBar";
import { PropTypes } from 'prop-types';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SinglePost from '../SinglePost/SinglePost';
const SearchView = () => {
    const location = useLocation();
    const results = location.state?.results || [];

    if (results.length===0) {
        return <div className="h-screen bg-[rgb(36,36,36)] dark:bg-white flex flex-col items-center justify-start space-y-2">
        <h1 className="fixed flex justify-start text-[#F7AB0A] dark:text-[#001440] z-10 text-4xl mt-10">
            No results found
        </h1>
        <div className="w-full fixed -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 dark:bg-teal-600/70 z-1"></div>
        </div>;
      }
    return (
        <div className="h-screen bg-[rgb(36,36,36)] dark:bg-white flex flex-col items-center justify-start space-y-2">
        <h1 className="fixed flex justify-start text-[#F7AB0A] dark:text-[#001440] z-10 text-4xl mt-10">
            Search results
        </h1>
        <motion.div
            className="flex flex-col space-y-4 mt-32 pb-10 z-20"
            initial={{ y: -300, opacity: 0 }}
            transition={{ duration: 1.5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <div className="flex flex-col z-20 space-y-4 mt-32 pb-10">
                {results.map((postId, index) => (
                    <SinglePost key={index} post={postId} />
                ))}
            </div>
        </motion.div>
        <div className="w-full fixed -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 dark:bg-teal-600/70 z-1"></div>
    </div>
      );
    };
  
  export default SearchView;

  SearchView.propTypes = {
    results: PropTypes.array,
};