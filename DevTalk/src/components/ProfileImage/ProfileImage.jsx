import { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { auth } from '../../config/firebase-config';

export const ProfileImage = () => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const userID = auth.currentUser.uid;
    const storage = getStorage();
    const storageRef = ref(storage, `images/${userID}`);

    // Get the download URL of the image
    getDownloadURL(storageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.error('Error getting download URL:', error);
      });
  }, []);

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Firebase Storage Image" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
