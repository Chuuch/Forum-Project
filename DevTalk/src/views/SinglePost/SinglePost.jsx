import { BsFillTrash2Fill } from 'react-icons/bs';
import { PropTypes } from 'prop-types';
import { Likes } from '../../components/Likes/Likes';
import { Replies } from '../../components/Replies/Replies';


export const SinglePost = ({ post }) => {

  

  return (
    <div className="bg-[rgb(30,30,30)] dark:bg-gray-800 p-4 rounded-lg shadow-md w-[800px] dark:w-[800px] h-[300px] flex flex-col justify-between">
      <div className="flex justify-between gap-[250px]">
        <h3 className="text-2xl font-semibold text-gray-400 dark:text-[#eee] p-2">
          {post.title}
        </h3>
        <p className="text-gray-400 p-2">{post.createdAt}</p>
      </div>
      <div>
      <p className="text-white dark:text-white flex pl-2">
            {post.content}
          </p>
      </div>
      <div className="flex flex-col items-start">
        <div className="flex flex-col">
          <p className="text-gray-600 dark:text-gray-400 pl-2">
            Posted by {post.author}
          </p>
        </div>
        <div className='relative inline-flex items-center space-x-20 justify-between z-20'>
          <div className='inline-flex items-baseline'>
            <Likes />
            <Replies />
          </div>
          <BsFillTrash2Fill size={30} className="fill-[#F7AB0A] dark:fill-white cursor-pointer" />
          {/* Remove this placeholder text
          <p className="text-gray-600 dark:text-gray-400 pl-2">{}</p>
          */}
        </div>
      </div>
      
    </div>
  );
};

  SinglePost.propTypes = {
    post: PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      postId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }).isRequired,
  };

  