import { BsFillTrash2Fill } from 'react-icons/bs';
import { PropTypes } from 'prop-types';
import { Likes } from '../../components/Likes/Likes';
import { Replies } from '../../components/Replies/Replies';
import { useEffect, useState } from 'react';
import { getReplies } from '../../services/posts.services';

export const SinglePost = ({ post, handleReply }) => {
  const [replies, setReplies] = useState([]);

  // Define an effect to fetch replies when the post changes
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const fetchedReplies = await getReplies(post.id);
        setReplies(fetchedReplies);
      } catch (error) {
        console.error('Error fetching replies:', error);
      }
    };

    fetchReplies();
  }, [post.id]);

  return (
    <div className="bg-[rgb(30,30,30)] dark:bg-gray-800 p-4 rounded-lg shadow-md w-[800px] dark:w-[800px] h-[300px] flex flex-col justify-between z-20">
      <div className="flex justify-between gap-[250px]">
        <h3 className="text-2xl font-semibold text-gray-400 dark:text-[#eee] p-2">
          {post.title}
        </h3>
        <p className="text-gray-400 p-2">{post.createdAt}</p>
      </div>
      <div>
        <p className="text-white dark:text-white flex pl-2">{post.content}</p>
      </div>
      <div className="flex flex-col items-start">
        <div className="flex flex-col">
          <p className="text-gray-600 dark:text-gray-400 pl-2">
            Posted by {post.author}
          </p>
        </div>
        <div className="relative inline-flex items-center space-x-20 justify-between z-20">
          <div className="inline-flex items-baseline">
            <Likes />
            <Replies post={post} handleReply={handleReply} />
          </div>
          <BsFillTrash2Fill
            size={30}
            className="fill-[#F7AB0A] dark:fill-white cursor-pointer"
          />
        </div>
      </div>
      <div className="mt-4">
        {replies.length > 0 ? (
          replies.map((reply, index) => (
            <div key={index} className="text-gray-400 dark:text-gray-300 pl-2">
              {reply.author}: {reply.content}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No replies available.</p>
        )}
      </div>
    </div>
  );
};

// PropTypes validation for the SinglePost component
SinglePost.propTypes = {
  post: PropTypes.shape({

    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  handleReply: PropTypes.func.isRequired,
};