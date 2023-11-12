import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-hot-toast';
import { BsFillTrash2Fill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { EditPost } from '../../components/EditPost/EditPost';
import Likes from '../../components/Likes/Likes';
import Replies from '../../components/Replies/Replies';
import { auth } from '../../config/firebase-config';
import { deletePost, deleteReply, getLikes, getPostById, getReplies, getUsername, likePost, replyPost } from '../../services/posts.services';

export const DetailsPost = () => {
    const { postId } = useParams();
    const [ user ] = useAuthState(auth);
    const [ postLists, setPostsLists ] = useState([]);
    const [ likeLists, setLikeLists ] = useState([])
    const [ repliesCount, setRepliesCount ] = useState(0);
    const [ post, setPost ] = useState({});
    const [ likes, setLikes ] = useState([]);
    const [ replies, setReplies ] = useState([]);
    const [ showReplies, setShowReplies ] = useState(false);

    const toggleReplies = () => {
        setShowReplies(!showReplies);
    };

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

    const onDeleteClick = async () => {
        try {
            await deletePost(post.id, post.userID);
            toast.success('Post deleted!');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting post:', error);
            toast.error('You are not authorized to delete this post!');
        }
    };

    const replyDelete = async (replyId) => {
        await deleteReply(post.id, replyId);
        toast.success('Reply deleted!');
        const updatedReplies = await getReplies(post.id);
        setReplies(updatedReplies);
        setRepliesCount(updatedReplies.length);
    };

    useEffect(() => {
        const fetchPost = async () => {
            const fetchPostDetails = await getPostById(postId);
            setPost(fetchPostDetails);
        };

        fetchPost();
    }, [ postId ])

    useEffect(() => {
        const fetchLikes = async () => {
            const fetchedLikes = await getLikes(postId);
            setLikes(fetchedLikes);
        };
        fetchLikes();
    }, [ postId ])

    useEffect(() => {
        const fetchReplies = async () => {
            try {
                const fetchedReplies = await getReplies(postId);
                setReplies(fetchedReplies);
                setRepliesCount(fetchedReplies.length); // Update repliesCount
            } catch (error) {
                console.error('Error fetching replies:', error);
            }
        };
        fetchReplies();
    }, [ postId ]);

    return (
        <div className="h-screen bg-[rgb(36,36,36)] dark:bg-white flex flex-col items-center justify-start space-y-2">
            <h1 className="fixed flex justify-start text-[#F7AB0A] dark:text-[#001440] z-10 text-4xl mt-10">
                Post Details
            </h1>
            <motion.div
                className="flex flex-col space-y-4 mt-32 pb-10 z-20"
                initial={ { y: -300, opacity: 0 } }
                transition={ { duration: 1.5 } }
                whileInView={ { opacity: 1, y: 0 } }
                viewport={ { once: true } }
            >
                <div className="flex flex-col z-20 space-y-4 mt-32 pb-10">

                    <div className="bg-[rgb(30,30,30)] dark:bg-gray-800 p-4 rounded-lg shadow-md w-[800px] dark:w-[800px] flex flex-col relative">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-semibold text-gray-400 dark:text-[#eee] p-2">
                                { post.title }
                            </h3>
                            <p className="text-gray-400 p-2">{ post.createdAt }</p>
                        </div>
                        <div className="mt-16">
                            <p className="text-white dark:text-white flex pl-2 text-lg">{ post.content }</p>
                        </div>
                        <div className="flex flex-col items-start relative">
                            <div className="flex flex-col">
                                <p className="text-gray-600 dark:text-gray-400 pl-2">
                                    Posted by { post.author }
                                </p>
                            </div>
                            <div className="flex flex-row items-center z-10">
                                <div className="inline-flex items-center z-10 relative">
                                    <Likes postId={ postId } handleLike={ handleLike } userId={ user.uid } likes={ likes } />
                                    <Replies post={ post } handleReply={ handleReply } replies={ replies } repliesCount={ repliesCount } />
                                    <EditPost post={ post } />
                                    <BsFillTrash2Fill
                                        size={ 30 }
                                        className="fill-[#F7AB0A] dark:fill-white cursor-pointer"
                                        onClick={ onDeleteClick }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-baseline relative">
                            <div className="flex flex-row items-baseline relative">
                                <button
                                    onClick={ toggleReplies }
                                    className="text-[#F7AB0A] dark:text-gray-400 cursor-pointer flex pl-2"
                                >
                                    { showReplies ? 'Hide replies' : 'View replies' }
                                </button>
                            </div>
                            <div className="mt-4 relative">
                                { showReplies &&
                                    replies.length > 0 &&
                                    replies.map((reply, index) => (
                                        <div
                                            key={ index }
                                            className="text-gray-400 dark:text-gray-300 pl-2 pb-4 relative"
                                        >
                                            <div className="flex flex-col items-start relative">
                                                <div className="text-xs text-gray-400">{ reply.repliedAt }</div>
                                                <div className="text-gray-400 dark:text-gray-300 text-base flex flex-row items-start relative">
                                                    { reply.author }: { reply.content } <BsFillTrash2Fill onClick={ replyDelete } className='ml-2 mt-1 cursor-pointer' />
                                                </div>
                                            </div>
                                        </div>
                                    )) }
                            </div>
                        </div>
                    </div>
                </div>

            </motion.div>
            <div className="w-full fixed -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 dark:bg-teal-600/70 z-1"></div>
        </div>
    );
};

export default DetailsPost;

