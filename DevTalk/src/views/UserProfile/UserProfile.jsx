import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, updatePassword } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { auth, storage } from '../../config/firebase-config';
import { updateUserEmail, updateUserPhoto } from '../../services/auth.services';

export const UserProfile = () => {
    const [ uploadImage, setUploadImage ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState(null);

    const [ user ] = useAuthState(auth);
    const [ avatarURL, setAvatarURL ] = useState(null);
    const [ previewImage, setPreviewImage ] = useState(null);
    const [ email, setEmail ] = useState(user?.email);
    const [ currentPassword, setCurrentPassword ] = useState(null);
    const [ newPassword, setNewPassword ] = useState(null);
    const [ confirmPassword, setConfirmPassword ] = useState(null);

    useEffect(() => {
        uploadImage && console.log(uploadImage);
        console.log(user);
    }, [ uploadImage, user ]);

    useEffect(() => {
        if (user) {
            const imageRef = ref(storage, `images/${user.uid}`);
            getDownloadURL(imageRef)
                .then((url) => setAvatarURL(url))
                .catch((error) => console.error('Error getting avatar URL:', error));
        }
    }, [ user ]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[ 0 ];
        if (selectedFile) {
            setUploadImage(selectedFile);
            setPreviewImage(URL.createObjectURL(selectedFile));
            setErrorMessage(null);
        } else {
            setUploadImage(null);
            setPreviewImage(null);
            setErrorMessage('Please select an image to upload');
            return;
        }
    };

    const handleUpdateEmail = async () => {
        try {
            await updateEmail(user, email);
            toast.success('Email updated successfully!');
        } catch (error) {
            toast.error('Error updating email. Please check the console for details.');
            // TODO: To be removed
            console.error('Error updating email:', error.message);
        }
    };

    const handleUpdatePassword = async () => {
        try {
            await updatePassword(user, newPassword);
            toast.success('Password updated successfully!');
        } catch (error) {
            toast.error('Error updating password. Please check the console for details.');
            // TODO: To be removed
            console.error('Error updating password:', error.message);
        }
    };

    const uploadFile = () => {
        if (uploadImage === null) return

        if (uploadImage?.size > 1024 * 1024 * 5) {
            toast.error('File size should be less than 5MB');
            // setErrorMessage('File size should be less than 5MB');
            return;
        } else if (
            uploadImage?.type !== 'image/jpeg' &&
            uploadImage?.type !== 'image/png'
        ) {
            toast.error('File format is incorrect');
            return;
        }

        const imageRef = ref(storage, `images/${user.uid}`);

        uploadBytes(imageRef, uploadImage)
            .then(() => {
                toast.success('Image uploaded successfully');
                setErrorMessage(null);
            })
            .catch((error) => {
                toast.success('Failed to upload the image');
                // TODO: To be removed
                console.error('Upload error:', error);
            });
    };

    const handleSavePhoto = async () => {
        uploadFile()
        await updateUserPhoto(user.uid, avatarURL)
    }

    const handleSavePassword = async () => {
        if (currentPassword && newPassword && confirmPassword && newPassword === confirmPassword) {
            const credential = EmailAuthProvider.credential(email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            await handleUpdatePassword()
        }
    }

    const handleSaveEmail = async () => {
        if (email && email !== user?.email) {
            await handleUpdateEmail()
            await updateUserEmail(user.uid, email)
        }
    }

    return (
        <div className="h-screen bg-[rgb(36,36,36)] dark:bg-white flex flex-col items-center justify-center mt-7 z-30">
            <div className="bg-gray-800 p-4 rounded-lg shadow-md w-[600px] space-y-2 h-auto z-20">
                <div className="text-center">
                    <img
                        src={ previewImage ?? (avatarURL) }
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full mx-auto mb-4"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        id="avatar-upload"
                        className="block mx-auto mb-4"
                        onChange={ handleFileChange }
                    />
                </div>
                <div>
                    <div className="text-red-500">{ errorMessage }</div>
                </div>
                <button
                    id="photo-change"
                    className="dark:bg-teal-400 bg-[#F7AB0A] text-[rgb(30,30,30)] dark:text-[#001440] hover:scale-105 rounded px-4 py-1 mt-2 ml-0"
                    onClick={ () => handleSavePhoto() }
                >
                    Save Photo
                </button>

                <div className="space-y-4">
                    <div className="mb-2">
                        <label className="text-gray-400">Full Name</label>
                        <input
                            type="displayName"
                            disabled
                            placeholder="Full Name"
                            value={ user?.displayName }
                            className="bg-gray-600 text-white rounded px-2 py-1 w-full"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="text-gray-400">E-mail</label>
                        <input
                            type="email"
                            placeholder="New E-mail"
                            disabled
                            value={ email }
                            className="bg-gray-600 text-white rounded px-2 py-1 w-full"
                            onChange={ (e) => setEmail(e.target.value) }
                        />
                    </div>
                    {/* <button
                        id="email-change"
                        className="dark:bg-teal-400 bg-[#F7AB0A] text-[rgb(30,30,30)] dark:text-[#001440] hover:scale-105 rounded px-4 py-1 mt-2 ml-0"
                        onClick={ () => handleSaveEmail() }
                    >
                        Save Email
                    </button> */}
                    <div className="mb-2">
                        <label className="text-gray-400">Current password</label>
                        <input
                            type="password"
                            placeholder="Current Password"
                            className="bg-gray-600 text-white rounded px-2 py-1 w-full"
                            onChange={ (e) => setCurrentPassword(e.target.value) }

                        />
                    </div>
                    <div className="mb-2">
                        <label className="text-gray-400">New password</label>
                        <input
                            type="password"
                            placeholder="New Password"
                            className="bg-gray-600 text-white rounded px-2 py-1 w-full"
                            onChange={ (e) => setNewPassword(e.target.value) }

                        />
                    </div>
                    <div className="mb-2">
                        <label className="text-gray-400">Confirm new password</label>
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            className="bg-gray-600 text-white rounded px-2 py-1 w-full"
                            onChange={ (e) => setConfirmPassword(e.target.value) }
                        />
                    </div>
                    <button
                        id="password-change"
                        className="dark:bg-teal-400 bg-[#F7AB0A] text-[rgb(30,30,30)] dark:text-[#001440] hover:scale-105 rounded px-4 py-1 mt-2 ml-0"
                        onClick={ () => handleSavePassword() }
                    >
                        Save Password
                    </button>
                </div>
            </div>
            <div className="w-full absolute -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 dark:bg-teal-600/70 z-1"></div>
        </div>
    );
};
