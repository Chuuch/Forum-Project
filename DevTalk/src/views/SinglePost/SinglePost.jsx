import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineComment } from 'react-icons/ai';
// import { database } from '../../config/firebase-config';

// import { useEffect, useState } from 'react';
// import { get, ref } from 'firebase/database';

export const SinglePost = () => {
	// const [postLists, setPostsLists] = useState([]);

	// useEffect(() => {
	// 	const getPosts = async () => {
	// 		try {
	// 			const postsSnapshot = await get(ref(database, '/posts'));
	// 			const postsData = [];
	// 			postsSnapshot.forEach((post) => {
	// 				postsData.push(post.val());
	// 			});
	// 			setPostsLists(postsData);
	// 		} catch (error) {
	// 			console.log(error.message);
	// 		}
	// 	};
	// 	getPosts();
	// }, []);

	return (
		<div className="bg-[rgb(30,30,30)] dark:bg-gray-800 p-4 rounded-lg shadow-md w-[800px] dark:w-[800px] h-[300px] flex flex-col justify-between">
    <div className="flex justify-between gap-[250px]">
        <h3 className="text-2xl font-semibold text-gray-400 dark:text-[#eee] p-2">
            <p>Title</p>
        </h3>
        <p className='text-gray-400 p-2'>
            1h
        </p>
    </div>
    <p className="text-lg text-[#ddd] dark:text-[#ccc] pl-2">
        Grisho e nomer 1
    </p>
    <div className='flex flex-col items-start'>
        <div className="flex flex-col">
            <p className="text-gray-600 dark:text-gray-400 pl-2">
                Posted by danskii
            </p>
            <p className="text-white dark:text-white flex pl-2">#hashtags</p>
        </div>
        <div className="inline-flex pl-2 space-x-2">
            <AiOutlineHeart size={30} className='fill-white cursor-pointer' />
            <AiOutlineComment size={30} className='fill-white cursor-pointer'/>
        </div>
        <p className="text-gray-600 dark:text-gray-400 pl-2">No. of likes</p>
    </div>
</div>
	);
};
