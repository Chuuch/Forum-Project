import { useState } from 'react';
import { AiOutlineComment, AiOutlineClose } from 'react-icons/ai';
import { replyPost } from '../../services/posts.services';
import { toast } from 'react-hot-toast'


export const Replies = () => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [reply, setReply] = useState(''); // State for the reply input

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  const closeReplyForm = () => {
    setShowReplyForm(false);
  };

  const handleReplySubmit = () => {
  
    if (reply.trim() !== '') {
      replyPost(reply);
      setReply('');
      closeReplyForm()
      toast.success('Post created successfully!');
    }
  };

  return (
    <div className="relative bg-[rgb(30,30,30)] dark:bg-gray-800 p-4 rounded-lg w-[600px] dark:w-[600px] z-20">
      <div className="flex justify-between space-x-2 z-20">
        <div className={`z-20 flex space-x-2 ${showReplyForm ? 'hidden' : 'block'}`}>
          <button onClick={toggleReplyForm}>
            <AiOutlineComment size={30} className="cursor-pointer fill-[#F7AB0A] dark:fill-white" />
          </button>
        </div>
      </div>

      <div className={`z-20 ${!showReplyForm ? 'hidden' : 'absolute top-1 right-0 mr-0 mt-5'}`}>
        <AiOutlineClose size={25} onClick={closeReplyForm} className="fill-[#F7AB0A] dark:fill-teal-200 cursor-pointer" />
      </div>

      {showReplyForm && (
        <div className="absolute flex flex-col w-full bg-[rgb(36,36,36)] dark:bg-slate-700 p-12 rounded-lg shadow-lg">
          <form className="z-20 flex flex-col">
            <textarea
              placeholder="Add comment here..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="border border-[#F7AB0A] border-none text-left text-gray-400 text-xl bg-[rgb(30,30,30)] dark:bg-slate-800 h-20"
            ></textarea>
            <button type="button" onClick={handleReplySubmit} className="bg-[#F7AB0A] dark:bg-teal-200 text-black dark:text-[#001440] px-2 py-1 mt-2 w-32 rounded-lg cursor-pointer">
              Submit Reply
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
