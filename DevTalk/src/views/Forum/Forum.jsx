import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { allUsers } from '../../services/auth.services';
import {
	getAllPosts,
	getUsername,
	likePost,
	replyPost,
} from '../../services/posts.services';
import { SinglePost } from '../SinglePost/SinglePost';
import CategoryFilter from '../../components/Filter/CategotyFilter';
import UserFilter from '../../components/Filter/UserFilter';

const Forum = () => {
	const [ postLists, setPostsLists ] = useState([]);
	const [ filteredList, setFilteredList ] = useState([]);
	const [ likeLists, setLikeLists ] = useState([]);
	const [ repliesCount, setRepliesCount ] = useState(0);
	const [ usersList, setUsersList ] = useState([]);
	const [ userFilter, setUserFilter ] = useState('');
	const [ categoryFilter, setCategoryFilter ] = useState('');

	const handleLike = async (id) => {
		const username = getUsername();
		await likePost(id, username);
		const newLike = {
			likedBy: username,
		};

		const updatedLikes = likeLists.map((post) =>
			post.id === id ? { ...post, likes: [ ...post.likes, newLike ] } : post
		);
		setLikeLists(updatedLikes);
	};

	const handleReply = async (id, replyContent) => {
		const username = getUsername();
		await replyPost(id, replyContent);
		const newReply = {
			content: replyContent,
			author: username,
		};

		const updatedPosts = postLists.map((post) =>
			post.id === id ? { ...post, replies: [ ...post.replies, newReply ] } : post
		);

		setPostsLists(updatedPosts);
		setRepliesCount(repliesCount + 1);
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const posts = await getAllPosts();
			setPostsLists(posts);
		};
		const fetchUsers = async () => {
			const users = await allUsers(); // Assuming you have a function named 'allUsers'
			setUsersList(users);
		};

		fetchUsers();
		fetchPosts();
	}, []);

	useEffect(() => {
		if (userFilter.length && userFilter !== 'all' && (!categoryFilter.length || categoryFilter === 'all')) {
			const filteredPosts = postLists.filter((post) => post.userID === userFilter);
			setFilteredList(filteredPosts);
		}
		if (categoryFilter.length && categoryFilter !== 'all' && (!userFilter.length || userFilter === 'all')) {
			const filteredPosts = postLists.filter((post) => post.category?.toLowerCase() === categoryFilter.toLowerCase());
			setFilteredList(filteredPosts);
		}
		if (userFilter !== 'all' && categoryFilter !== 'all' && userFilter.length && categoryFilter.length) {
			const filteredPosts = postLists.filter(
				(post) => post.category?.toLowerCase() === categoryFilter.toLocaleLowerCase() && post.userID === userFilter
			);
			setFilteredList(filteredPosts);
		}
		if (userFilter === 'all' && categoryFilter === 'all') {
			setFilteredList([ ...postLists ]);
		}

	}, [ userFilter, postLists, categoryFilter ]);

	return (
		<div className="h-screen bg-[rgb(36,36,36)] dark:bg-white flex flex-col items-center justify-start space-y-2">
			<h1 className="flex justify-start text-[#F7AB0A] dark:text-[#001440] z-10 text-4xl mt-10">
				Forum
			</h1>
			<motion.div
				className="flex flex-col space-y-2 mt-32 pb-10 z-20"
				initial={ { y: -300, opacity: 0 } }
				transition={ { duration: 1.5 } }
				whileInView={ { opacity: 1, y: 0 } }
				viewport={ { once: true } }
			>
				<div className="flex flex-col space-y-4 mt-32 pb-10 z-20">
					<div className="flex items-center justify-center space-x-2">
						<UserFilter users={ usersList } userFilter={ userFilter } setUserFilter={ setUserFilter } />
						<CategoryFilter categoryFilter={ categoryFilter } setCategoryFilter={ setCategoryFilter } />
					</div>
					{ filteredList.length === 0 && postLists.length && !categoryFilter.length && !userFilter.length ? (
						postLists.map((post, index) => (
							<SinglePost
								key={ index }
								post={ post }
								handleReply={ handleReply }
								handleLike={ handleLike }
								userFilter={ userFilter }
							/>
						))
					) : (
						filteredList.length ? filteredList.map((post, index) => (
							<SinglePost
								key={ index }
								post={ post }
								handleReply={ handleReply }
								handleLike={ handleLike }
								userFilter={ userFilter }
							/>
						)) : (
							<p className="text-[#F7AB0A] dark:text-[#001440] text-2xl">
								No posts to show for this user
							</p>
						))
					}
				</div>
			</motion.div>
			<div className="w-full fixed -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 dark:bg-teal-600/70 z-1"></div>
		</div>
	);
};

export default Forum;
