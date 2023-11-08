// import { useLocation, useNavigate} from 'react-router-dom';
// import { BiArrowBack } from 'react-icons/bi';
// import { RepliesIcon } from '../RepliesIcon/RepliesIcon';

// export const SingleReply = () => {
//     let location = useLocation();
//     let navigate = useNavigate();
//     let replies = location?.state?.replies;
  
//     return (
//       <div>
//         <div className="reply-details">
//           <div className="thread-header">
//             <BiArrowBack
//               className="react-icon"
//               size={30}
//               onClick={() => navigate(-1)}
//             />
//             <p>Replies</p>
//           </div>
//         </div>
//           {replies.map((reply, index) => {
//             return (
//               <div className="all-replies" key={index}>
//                 <div className="reply-head">
//                   <RepliesIcon userId={reply.uid} />
//                 </div>
  
//                 <div>
//                   <p className="reply-name">{reply.username}</p>
//                   <p className="comment">{reply.reply}</p>
//                   <p className="reply-timestamp">{reply.repliedAt}</p>
//                 </div>
//               </div>
//             );
//           })
//         }
//       </div>
//     );
//   }