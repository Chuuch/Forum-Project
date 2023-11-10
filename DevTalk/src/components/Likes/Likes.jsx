import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { likePost, dislikePost, getLikes } from '../../services/posts.services';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';

const Likes = ({ postId, username }) => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likesData = await getLikes(postId);
        setLikes(likesData.length);
        setIsLiked(likesData.some((like) => like.username === username));
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };

    fetchLikes();
  }, [postId, username]);

  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        await dislikePost(postId, username);
        setLikes((prevLikes) => prevLikes - 1)
		toast.success('Disliked!');
      } else {
        await likePost(postId, username);
        setLikes((prevLikes) => prevLikes + 1)
		toast.success('Liked!');
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  return (
    <div className="inline-flex pl-2 space-x-2">
      {isLiked ? (
        <AiFillHeart
          size={30}
          onClick={handleLikeClick}
          className="cursor-pointer fill-[#F7AB0A] dark:fill-white"
        />
      ) : (
        <AiOutlineHeart
          size={30}
          onClick={handleLikeClick}
          className="cursor-pointer fill-[#F7AB0A] dark:fill-white"
        />
      )}
      <span className="text-gray-400 dark:text-gray-300 pl-2">{likes}</span>
    </div>
  );
};

export default Likes;

Likes.propTypes = {
	postId: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired,
};