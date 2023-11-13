import { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { PropTypes } from 'prop-types';
import { CgProfile } from 'react-icons/cg'

export const ProfileImage = ({userID}) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${userID}`);

    getDownloadURL(storageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.error('Error getting download URL:', error);
      });
  }, [userID]);

  return (
    <div className='flex-shrink-0 w-8 h-8 ml-2 overflow-hidden rounded-full'>
      {imageUrl ? (
        <img src={imageUrl} alt="Firebase Storage Image" />
      ) : (
        <CgProfile className='w-8 h-8'/>
      )}
    </div>
  );
};

ProfileImage.propTypes = {
  userID: PropTypes.string.isRequired,
};
