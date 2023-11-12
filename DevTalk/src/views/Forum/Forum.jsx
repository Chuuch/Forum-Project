import { motion } from 'framer-motion';
import { SinglePost } from '../SinglePost/SinglePost';
import { useEffect, useState } from 'react';
import { getAllPosts, likePost } from '../../services/posts.services';
import { replyPost, getUsername } from '../../services/posts.services';
import UserList from '../../components/Filter/UserFilter';
import { allUsers } from '../../services/auth.services';

export const Forum = () => {
	const [ postLists, setPostsLists ] = useState([]);
	const [ likeLists, setLikeLists ] = useState([])
	const [ repliesCount, setRepliesCount ] = useState(0);
	const [ usersList, setUsersList ] = useState([]);
	const [ filter, setFilter ] = useState('');

	const handleLike = async (id) => {
		await likePost(id, username);
		const username = getUsername();
		const newLike = {
			likedBy: username,
		}

		const updatedLikes = likeLists.map((post) => {
			if (post.id === id) {
				return {
					...post,
					likes: [ ...post.likes, newLike ],
				};
			}
			return post;
		})
		setLikeLists(updatedLikes);
	}

	const handleReply = async (id, replyContent) => {
		await replyPost(id, replyContent);
		const username = getUsername();
		const newReply = {
			content: replyContent,
			author: username,
		};


		const updatedPosts = postLists.map((post) => {
			if (post.id === id) {
				return {
					...post,
					replies: [ ...post.replies, newReply ],
				};
			}
			return post;
		});

		setPostsLists(updatedPosts);
		const updatedRepliesCount = repliesCount + 1;
		setRepliesCount(updatedRepliesCount);
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const posts = await getAllPosts();
			setPostsLists(posts);
		};
		const fetchUsers = async () => {
			const users = await allUsers();
			setUsersList(users);

		}
		fetchUsers()
		fetchPosts();
	}, []);

	useEffect(() => {
		if (filter.length && filter !== 'all') {
			const filteredPosts = postLists.filter((post) => post.userID === filter);
			setPostsLists(filteredPosts);
		}
		if (filter === 'all') {
			const fetchPosts = async () => {
				const posts = await getAllPosts();
				setPostsLists(posts);
			};
			fetchPosts();
		}
	}, [ filter, postLists ]);


	return (
		<div className="h-screen bg-[rgb(36,36,36)] dark:bg-white flex flex-col items-center justify-start space-y-2">
			<h1 className="fixed flex justify-start text-[#F7AB0A] dark:text-[#001440] z-10 text-4xl mt-10">
				Forum
			</h1>
			<motion.div
				className="flex flex-col space-y-4 mt-32 pb-10 z-20"
				initial={ { y: -300, opacity: 0 } }
				transition={ { duration: 1.5 } }
				whileInView={ { opacity: 1, y: 0 } }
				viewport={ { once: true } }
			>
				<div className="flex flex-col z-20 space-y-4 mt-32 pb-10">
					<UserList users={ usersList } filter={ filter } setFilter={ setFilter } />
				</div>

				<div className="flex flex-col z-20 space-y-4 mt-32 pb-10">
					{ postLists.length ? postLists.map((postId, index) => (
						<SinglePost key={ index } post={ postId } handleReply={ handleReply } handleLike={ handleLike } filter={ filter } />
					)) : <p className="text-[#F7AB0A] dark:text-[#001440] text-2xl">No posts to show for this user</p> }
				</div>
			</motion.div>
			<div className="w-full fixed -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 dark:bg-teal-600/70 z-1"></div>
		</div>
	);
};

export default Forum;
