
export const UserProfile = () => {
    return (
        <div className="h-screen bg-[rgb(36,36,36)] dark:bg-white flex flex-col items-center justify-center mt-7 z-30">
            <div className="bg-gray-800 p-4 rounded-lg shadow-md w-96 h-auto z-20">
    <div className="text-center">
        <img
            src="user-avatar.jpg"
            alt="User Avatar"
            className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <input
            type="file"
            accept="image/*"
            id="avatar-upload"
            className="block mx-auto mb-4"
        />
    </div>
    <div>
        <div className="mb-2">
            <label className="text-gray-400">Username:</label>
            <input
                type="text"
                value="example_username"
                disabled
                className="bg-gray-600 text-white rounded px-2 py-1 w-full"
            />
        </div>
        <div className="mb-2">
            <label className="text-gray-400">Email:</label>
            <input
                type="email"
                value="example@email.com"
                disabled
                className="bg-gray-600 text-white rounded px-2 py-1 w-full"
            />
        </div>
        <div className="mb-2">
            <label className="text-gray-400">Change Password:</label>
            <input
                type="password"
                placeholder="New Password"
                className="bg-gray-600 text-white rounded px-2 py-1 w-full"
            />
            <button
                id="change-password"
                className="dark:bg-teal-400 bg-[#F7AB0A] text-[rgb(30,30,30)] dark:text-[#001440] hover:scale-105 rounded px-4 py-1 mt-2 ml-0"
            >
                Change
            </button>
        </div>
    </div>
</div>
            <div className="w-full absolute -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 dark:bg-teal-600/70 z-1"></div>
        </div>
    )
};