import { useEffect, useState } from "react";
import { get, ref,  } from "firebase/database";
import { database } from '../../config/firebase-config';

const Forum = () => {
    const [postLists, setPostsLists] = useState([]);

    useEffect(() => {
		const getPosts = async () => {
			try {
				const postsSnapshot = await get(ref(database, '/posts'));
				const postsData = [];
				postsSnapshot.forEach((post) => {
					postsData.push(post.val());
				});
				setPostsLists(postsData);
			} catch (error) {
				console.log(error.message);
			}
		};
		getPosts();
	}, []);

    return (
        <div className="h-screen bg-[rgb(36,36,36)] dark:bg-white flex flex-col items-center justify-center">
			<p className=" text-[#F7AB0A] dark:text-[#001440] z-20">Forum</p>
            <div className="flex flex-col z-20">
				{postLists.map((post, index) => (
					<div key={index}>
						<h3>{post.title}</h3>
						<h3>{post.author}</h3>
						<p>{post.content}</p>
					</div>
				))}
			</div>
			<div className="w-full absolute -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 dark:bg-teal-600/70 z-1"></div>
		</div>
    )
};

export default Forum;