import { useState } from 'react';
import { createPost } from '../../services/posts.services';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try{
        e.preventDefault();
        await createPost(title, content)
        .then(alert('Post created successfully!'))
        .then(navigate('/forum'))
         } catch(e) {console.log(e.message);
      }
    }

    return (
        <div className="h-screen bg-[rgb(36,36,36)] dark:bg-white flex flex-col items-center justify-center z-20">
            <p className="flex items-center justify-center m-15 text-[#F7AB0A] dark:text-[#001440] z-20 pb-16 text-4xl">
                Create a Post
            </p>
            <div className="z-20 flex flex-col w-[400px] text-gray-400 mb-32">
                <input
                    placeholder="Title"
                    className="bg-[rgb(30,30,30)] dark:bg-gray-800 p-2"
                    value={title}
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
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button
                    className="bg-[#F7AB0A] dark:bg-teal-200 py-5 px-10 rounded-md text-[rgb(36,36,36)] dark:text-[#001440] font-bold text-lg hover:scale-105 mt-2"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Submit Post
                </button>
            </div>
            <div className="w-full absolute -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 dark:bg-teal-600/70 z-1"></div>
        </div>
    );
};

export default CreatePost;
