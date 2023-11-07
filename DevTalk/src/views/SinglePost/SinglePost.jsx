import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineComment } from 'react-icons/ai';
import { BsFillTrash2Fill } from 'react-icons/bs';
import { PropTypes } from 'prop-types';

export const SinglePost = ({ post }) => {
    return (
      <div className="bg-[rgb(30,30,30)] dark:bg-gray-800 p-4 rounded-lg shadow-md w-[800px] dark:w-[800px] h-[300px] flex flex-col justify-between">
        <div className="flex justify-between gap-[250px]">
          <h3 className="text-2xl font-semibold text-gray-400 dark:text-[#eee] p-2">
            {post.title}
          </h3>
          <p className="text-gray-400 p-2">{}</p>
        </div>
        <p className="text-lg text-[#ddd] dark:text-[#ccc] pl-2">{post.content}</p>
        <div className="flex flex-col items-start">
          <div className="flex flex-col">
            <p className="text-gray-600 dark:text-gray-400 pl-2">
              Posted by {post.author}
            </p>
            <p className="text-white dark:text-white flex pl-2">{post.hashtags}</p>
          </div>
          <div className='inline-flex justify-between space-x-[650px]'>
          <div className="inline-flex pl-2 space-x-2">
            <AiOutlineHeart size={30} className="fill-white cursor-pointer" />
            <AiOutlineComment size={30} className="fill-white cursor-pointer" />
          </div>
          <div className="z-20">
            <BsFillTrash2Fill size={30} className="fill-white cursor-pointer" />
          </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 pl-2">No. of likes</p>
        </div>
      </div>
    );
  };

  SinglePost.propTypes = {
    post: PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      hashtags: PropTypes.string.isRequired,
    }).isRequired,
  };