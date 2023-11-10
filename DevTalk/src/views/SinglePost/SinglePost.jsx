import { BsFillTrash2Fill } from 'react-icons/bs';
import { PropTypes } from 'prop-types';
import { Likes } from '../../components/Likes/Likes';
import { Replies } from '../../components/Replies/Replies';
import { useEffect, useState } from 'react';
import { getReplies } from '../../services/posts.services';

export const SinglePost = ({ post, handleReply }) => {
	const [replies, setReplies] = useState([]);
	const [showReplies, setShowReplies] = useState(false);

	const toggleReplies = () => {
		setShowReplies(!showReplies);
	};

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
		<div className="bg-[rgb(30,30,30)] dark:bg-gray-800 p-4 rounded-lg shadow-md w-[800px] dark:w-[800px] h-[350px] flex flex-col  z-20">
  <div className="flex items-center justify-between">
    <h3 className="text-2xl font-semibold text-gray-400 dark:text-[#eee] p-2">
      {post.title}
    </h3>
    <p className="text-gray-400 p-2">{post.createdAt}</p>
  </div>
  <div className='mt-16'>
    <p className="text-white dark:text-white flex pl-2">{post.content}</p>
  </div>
  <div className="flex flex-col items-start">
    <div className="flex flex-col">
      <p className="text-gray-600 dark:text-gray-400 pl-2">
        Posted by {post.author}
      </p>
    </div>
    <div className="flex flex-row items-center z-20">
      <div className="inline-flex items-center">
        <Likes />
        <Replies post={post} handleReply={handleReply} />
        <BsFillTrash2Fill
          size={30}
          className="fill-[#F7AB0A] dark:fill-white cursor-pointer"
        />
      </div>
    </div>
  </div>
  <div className="flex flex-col items-baseline">
    <button
      onClick={toggleReplies}
      className="text-[#F7AB0A] dark:text-gray-400 cursor-pointer flex pl-2"
    >
      {showReplies ? 'Hide replies' : 'View replies'}
    </button>

    <div className="mt-4">
      {showReplies &&
        replies.length > 0 &&
        replies.map((reply, index) => (
          <div
            key={index}
            className="text-gray-400 dark:text-gray-300 pl-2"
          >
            <div className="flex flex-row items-center space-x-2">
              <div className="text-sm text-gray-400">{reply.repliedAt}</div>
              <div className="text-gray-400 dark:text-gray-300 text-sm pl-2 flex flex-row items-start">
                {reply.author}: {reply.content}
              </div>
            </div>
          </div>
        ))}
    </div>
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
