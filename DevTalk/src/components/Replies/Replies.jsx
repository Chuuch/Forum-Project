import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { replyPost } from '../../services/posts.services';
import { AiOutlineComment, AiOutlineClose } from 'react-icons/ai';

export const Replies = ({ post, repliesCount }) => {
	const [showReplyForm, setShowReplyForm] = useState(false);
	const [reply, setReply] = useState('');

	const toggleReplyForm = () => {
		setShowReplyForm(!showReplyForm);
	};

	const closeReplyForm = () => {
		setShowReplyForm(false);
	};

	const handleReplySubmit = async () => {
		console.log('Houston');
		if (reply.trim() !== '') {
			try {
				await replyPost(post.id, reply);
				setReply('');
				closeReplyForm();
			} catch (error) {
				console.error('Failed to post the reply:', error);
			}
		}
	};

	return (
		<div className="relative p-4 rounded-lg z-20">
			<div className="flex space-x-2 z-20">
				<div className={`flex space-x-2 ${showReplyForm ? 'hidden' : 'block'}`}>
					<div className="inline-flex space-x-2">
						<button onClick={toggleReplyForm}>
							<AiOutlineComment
								size={30}
								className="cursor-pointer fill-[#F7AB0A] dark:fill-white"
							/>
						</button>
						<span className="text-gray-400 dark:text-gray-300">
							{repliesCount}
						</span>
					</div>
				</div>
			</div>
			<div className="flex flex-row items-end relative">
				{showReplyForm && (
					<div className="absolute left-0 top-0 z-40">
						<div className="relative flex flex-col w-[600px] bg-[rgb(36,36,36)] dark:bg-slate-700 p-6 rounded-lg shadow-lg">
							<div className="flex justify-end pb-2">
								<AiOutlineClose
									size={25}
									onClick={closeReplyForm}
									className="fill-[#F7AB0A] dark:fill-teal-200 cursor-pointer"
								/>
							</div>
							<form className="flex flex-col">
								<textarea
									placeholder="Add comment here..."
									value={reply}
									onChange={(e) => setReply(e.target.value)}
									className="border border-[#F7AB0A] border-none text-left text-gray-400 text-xl bg-[rgb(30,30,30)] dark:bg-slate-800 h-32 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7AB0A] focus:dark:ring-2 focus:dark:ring-teal-200"
								></textarea>
								<button
									type="button"
									onClick={handleReplySubmit}
									className="bg-[#F7AB0A] dark:bg-teal-200 text-black dark:text-[#001440] px-4 py-2 mt-2 rounded-lg cursor-pointer hover:bg-[#F7AB0D]"
								>
									Submit Reply
								</button>
							</form>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

// PropTypes validation for the Replies component
Replies.propTypes = {
	post: PropTypes.object.isRequired,
	handleReply: PropTypes.func.isRequired,
	repliesCount: PropTypes.number.isRequired,
};

export default Replies;
