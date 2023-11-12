import { useState } from 'react';
import { AiFillEdit, AiOutlineClose } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { editPost } from '../../services/posts.services';
import { toast } from 'react-hot-toast';

export const EditPost = ({ post }) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
  
    const toggleEditForm = () => {
      setShowEditForm(!showEditForm);
    };
  
    const closeEditForm = () => {
      setShowEditForm(false);
    };
  
    const handleEditSubmit = async () => {
      try {
        await editPost(post.id, title, content);
        toast.success('Post edited!');
        window.location.reload();
      } catch (error) {
        console.error('Error editing post:', error);
        toast.error('You are not authorized to edit this post!');
      }
    };
  
    return (
      <div className="relative">
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
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-[#F7AB0A] dark:border-teal-200 rounded-md mb-4 px-3 py-2 text-base text-gray-400 bg-[rgb(30,30,30)] dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F7AB0A] focus:dark:ring-2 focus:dark:ring-teal-200"
                />
  
                <textarea
                  placeholder="Content"
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
  
        <AiFillEdit
          className="relative cursor-pointer fill-[#F7AB0A] dark:fill-white mr-3"
          size={30}
          onClick={toggleEditForm}
        />
      </div>
    );
  };
  

EditPost.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        userID: PropTypes.string.isRequired,
    }).isRequired,
};