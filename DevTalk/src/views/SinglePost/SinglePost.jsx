import { BsFillTrash2Fill } from 'react-icons/bs';
import { PropTypes } from 'prop-types';
import { Likes } from '../../components/Likes/Likes';
import { Replies } from '../../components/Replies/Replies';
import { useEffect, useState } from 'react';
import { getLikes, getReplies, deletePost, deleteReply } from '../../services/posts.services';
import { toast } from 'react-hot-toast';
import { auth } from '../../config/firebase-config';
import { EditPost } from '../../components/EditPost/EditPost';
import { useNavigate } from 'react-router-dom';

export const SinglePost = ({ post, handleReply, handleLike }) => {
  const [likes, setLikes] = useState([]);
  const [replies, setReplies] = useState([]);
  const [repliesCount, setRepliesCount] = useState(0);
  const [showReplies, setShowReplies] = useState(false);
  const navigate = useNavigate();

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const onDeleteClick = async () => {
    try {
      await deletePost(post.id, post.userID);
      toast.success('Post deleted!');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('You are not authorized to delete this post!');
    }
  };

  const replyDelete = async (replyId) => {
    await deleteReply(post.id, replyId);
    toast.success('Reply deleted!');
    const updatedReplies = await getReplies(post.id);
    setReplies(updatedReplies);
    setRepliesCount(updatedReplies.length);
  };

  useEffect(() => {
    const fetchLikes = async () => {
      const fetchedLikes = await getLikes(post.id);
      setLikes(fetchedLikes);
    };
    fetchLikes();
  }, [post.id]);

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const fetchedReplies = await getReplies(post.id);
        setReplies(fetchedReplies);
        setRepliesCount(fetchedReplies.length); // Update repliesCount
      } catch (error) {
        console.error('Error fetching replies:', error);
      }
    };
    fetchReplies();
  }, [post.id]);

  return (
    <div className="bg-[rgb(30,30,30)] dark:bg-gray-800 p-4 rounded-lg shadow-md w-[800px] dark:w-[800px] flex flex-col relative">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-gray-400 dark:text-[#eee] p-2">
          {post.title}
        </h3>
        <p className="text-gray-400 p-2">{post.createdAt}</p>
      </div>
      <div className="mt-16">
        <p className="text-white dark:text-white flex pl-2 text-lg">{post.content}</p>
      </div>
      <div className="flex flex-col items-start relative">
        <div className="flex flex-col">
          <p className="text-gray-600 dark:text-gray-400 pl-2">Posted by {post.author}</p>
        </div>
        <div className="flex flex-row items-center z-10">
          <div className="inline-flex items-center z-10 relative">
            <Likes postId={post.id} handleLike={handleLike} userId={auth.currentUser.uid} likes={likes} />
            <Replies post={post} handleReply={handleReply} replies={replies} repliesCount={repliesCount} />
            <EditPost post={post} />
            <BsFillTrash2Fill
              size={30}
              className="fill-[#F7AB0A] dark:fill-white cursor-pointer"
              onClick={onDeleteClick}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-baseline relative">
        <div className="flex flex-row items-baseline relative">
          <button
            onClick={toggleReplies}
            className="text-[#F7AB0A] dark:text-gray-400 cursor-pointer flex pl-2"
          >
            {showReplies ? 'Hide replies' : 'View replies'}
          </button>
          <button
            onClick={() => navigate(`/forum/${post.id}`)}
            className="text-[#F7AB0A] dark:text-gray-400 cursor-pointer flex pl-2"
          >
            {'View details'}
          </button>
        </div>
        <div className="mt-4 relative">
          {showReplies &&
            replies.length > 0 &&
            replies.map((reply, index) => (
              <div key={index} className="text-gray-400 dark:text-gray-300 pl-2 pb-4 relative">
                <div className="flex flex-col items-start relative">
                  <div className="text-xs text-gray-400">{reply.repliedAt}</div>
                  <div className="text-gray-400 dark:text-gray-300 text-base flex flex-row items-start relative">
                    {reply.author}: {reply.content}{' '}
                    <BsFillTrash2Fill onClick={() => replyDelete(reply.id)} className="ml-2 mt-1 cursor-pointer" />
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
    likes: PropTypes.object.isRequired,
    userID: PropTypes.string.isRequired,
  }).isRequired,
  handleReply: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
};

export default SinglePost;


  
