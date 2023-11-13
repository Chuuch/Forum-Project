import { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose, AiFillEdit } from 'react-icons/ai';
import { editReply } from '../../services/posts.services'; 
import { toast } from 'react-hot-toast'; 

export const EditReplies = ({post, reply }) => {
  const [content, setContent] = useState(reply.content || '');
  const [showEditForm, setShowEditForm] = useState(false);

  const toggleEditForm = () => {
    setShowEditForm((prev) => !prev);
  };

  const closeEditForm = () => {
    setShowEditForm(false);
  };

  const handleEditSubmit = async () => {
    try {
        await editReply(post.id, reply.id, content);
        toast.success('Reply edited!');
        setShowEditForm(false);
      
    } catch (error) {
      console.error('Error editing reply:', error)
      toast.error('You are not authorized to edit this reply!');
    }
  };
  

  return (
    <div className="relative">
      <AiFillEdit
        className="relative cursor-pointer fill-[#F7AB0A] dark:fill-white mr-1 mt-1"
        size={20}
        onClick={toggleEditForm}
      />

      {showEditForm && (
        <div className="absolute left-0 top-0 z-20">
          <div className="relative flex flex-col w-[600px] bg-[rgb(36,36,36)] dark:bg-slate-700 p-6 rounded-lg shadow-lg">
            <div className="flex justify-end pb-2">
              <AiOutlineClose
                size={25}
                onClick={closeEditForm}
                className="fill-[#F7AB0A] dark:fill-teal-200 cursor-pointer"
              />
            </div>

            <form className="flex flex-col">
              <textarea
                placeholder="Edit your reply..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border border-[#F7AB0A] dark:border-teal-200 rounded-md mb-4 px-3 py-2 text-base text-gray-400 bg-[rgb(30,30,30)] dark:bg-slate-800 h-32 focus:outline-none focus:ring-2 focus:ring-[#F7AB0A] focus:dark:ring-2 focus:dark:ring-teal-200"
              ></textarea>

              <button
                type="button"
                onClick={handleEditSubmit}
                className="bg-[#F7AB0A] dark:bg-teal-200 text-black dark:text-[#001440] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#F7AB0D]"
              >
                Submit Edit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

EditReplies.propTypes = {
  reply: PropTypes.shape({
    id: PropTypes.string,
    postId: PropTypes.string,
    content: PropTypes.string,
  }),
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
}).isRequired,
};
