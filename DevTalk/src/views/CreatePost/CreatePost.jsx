import { useState } from 'react';
import { createPost } from '../../services/posts.services';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';


const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (title.trim() === '' || content.trim() === '' || category.trim() === '') {
        toast.error('Please fill in title, content, and select a category before submitting.');
        return;
      }
      await createPost(title, content, category);
      setTitle('');
      setContent('');
      setCategory('');
      toast.success('Post created successfully!');
      navigate('/forum');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="h-screen bg-[rgb(36,36,36)] dark:bg-white flex flex-col items-center justify-center mt-7 z-20">
      <motion.div
        className="z-20"
        initial={{ y: -300, opacity: 0 }}
        transition={{ duration: 1.5 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <p className="flex items-center justify-center m-15 text-[#F7AB0A] dark:text-[#001440] z-20 pb-16 text-4xl">
          Create a Post
        </p>
        <div className="z-20 flex flex-col w-[400px] text-gray-400 mb-32">
          <input
            placeholder="Title"
            className="bg-[rgb(30,30,30)] dark:bg-gray-800 p-2"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name=""
            id=""
            cols="30"
            rows="5"
            placeholder="Post"
            className="mt-3 bg-[rgb(30,30,30)] dark:bg-gray-800 p-2"
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <select
            className="mt-3 bg-[rgb(30,30,30)] dark:bg-gray-800 p-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>Select a category</option>
            <option value="C">C</option>
            <option value="C#">C#</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="TypeScript">TypeScript</option>
          </select>
          <button
            className="bg-[#F7AB0A] dark:bg-teal-200 py-5 px-10 rounded-md text-[rgb(36,36,36)] dark:text-[#001440] font-bold text-lg hover:scale-105 mt-2"
            type="submit"
            onClick={handleSubmit}
          >
            Submit Post
          </button>
        </div>
      </motion.div>
      <div className="w-full absolute -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 dark:bg-teal-600/70 z-1"></div>
    </div>
  );
};

export default CreatePost;

