import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useState } from 'react';
import { likePost } from '../../services/posts.services';
import { toast } from 'react-hot-toast';

export const Likes = (like) => {
	const [likes, setLikes] = useState(like.count);
	const [isLiked, setIsLiked] = useState(false);

	const handleLickClick = async () => {
		try {
			await likePost().then(toast.success('Liked!'));
			if (isLiked) {
				setLikes(likes - 1);
				setIsLiked(false);
			} else {
				setLikes(likes + 1);
				setIsLiked(true);
			}
		} catch (e) {
			console.error(e.message);
		}
	};

	return (
		<div className="inline-flex pl-2 space-x-2">
			{!isLiked ? (
				<AiOutlineHeart
					size={30}
					onClick={handleLickClick}
					className="cursor-pointer fill-[#F7AB0A] dark:fill-white"
				/>
			) : (
				<AiFillHeart
					size={30}
					onClick={handleLickClick}
					className="cursor-pointer fill-[#F7AB0A] dark:fill-white"
				/>
			)}
		</div>
	);
};
