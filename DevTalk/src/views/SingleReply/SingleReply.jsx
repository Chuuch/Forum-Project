import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RepliesIcon } from '../RepliesIcon/RepliesIcon';
import { get, ref,  } from 'firebase/database';
import { database } from '../../config/firebase-config';

export const SingleReply = () => {
	const location = useLocation();
	const postId = location?.state?.postId;

	const [replies, setReplies] = useState([]);

	useEffect(() => {
		const fetchReplies = async () => {
			if (postId) {
				try {
					const repliesSnapshot = await get(
						ref(database, '/replies')
					);
					const repliesData = [];

					repliesSnapshot.forEach((reply) => {
						repliesData.push(reply.val());
					});

					setReplies(repliesData);
				} catch (error) {
					console.error('Error retrieving replies:', error);
				}
			}
		};

		fetchReplies();
	}, [postId]);
	return (
		<div>
			<div className="reply-details">
				<div className="thread-header">
					<p>Replies</p>
				</div>
			</div>
			{replies && Array.isArray(replies) && replies.length > 0 ? (
				replies.map((reply, index) => {
					return (
						<div className="all-replies" key={index}>
							<div className="reply-head">
								<RepliesIcon userId={reply.uid} />
							</div>

							<div>
								<p className="reply-name">{reply.username}</p>
								<p className="comment">{reply.reply}</p>
								<p className="reply-timestamp">{reply.repliedAt}</p>
							</div>
						</div>
					);
				})
			) : (
				<p>No replies available.</p>
			)};
		</div>
	);
};

SingleReply.propTypes
