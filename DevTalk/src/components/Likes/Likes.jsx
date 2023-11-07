import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useState } from 'react';

export const Likes = (post) => {
    const [likes, setLikes] = useState(post.likes);
    const [isLiked, setIsLiked] = useState(false);
  
    const handleLickClick = () => {
      if (isLiked) {
        setLikes(likes - 1);
        setIsLiked(false);
      } else {
        setLikes(likes + 1);
        setIsLiked(true);
      }
    }

	return (
		<div className="inline-flex pl-2 space-x-2">
            {!isLiked ? <AiOutlineHeart
				size={30}
				onClick={handleLickClick}
				className='cursor-pointer fill-[#F7AB0A] dark:fill-white'
			/> : <AiFillHeart
                    size={30}
                    onClick={handleLickClick}
                    className='cursor-pointer fill-[#F7AB0A] dark:fill-white' /> }
			
		</div>
	);
};
