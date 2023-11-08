import { useEffect, useState } from "react";
import { getUserByID } from "../../services/auth.services";
import { PropTypes } from 'prop-types';

export const RepliesIcon = ({ uid }) => {
    const [post, setPost] = useState({});
    useEffect(() => {
      getUserByID(uid, setPost);
    }, [uid]);
  
    if (post?.profileImage) {
      return (
        <div className="flex items-center">
          <div className="h-1 w-1 bg-[#F7AB0A] rounded-full mr-2"></div>
          <img
            src={post?.profileImage}
            alt="User Profile"
            className="w-8 h-8 rounded-full border-2 border-[#F7AB0A] dark:border-white"
          />
        </div>
      );
    } else {
      return null;
    }
  };
  
  RepliesIcon.propTypes = {
      uid: PropTypes.string.isRequired,
  };