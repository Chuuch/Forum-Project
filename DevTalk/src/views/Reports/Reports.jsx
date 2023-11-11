import UsersInfo from "../Users/UsersInfo";

export default function Reports() {
    return (
        <div className="w-full mt-12">
            <p className="text-xl pb-3 flex items-center">
                <i className="fas fa-list mr-3"></i> Reports
            </p>
            <UsersInfo />
        </div>
    )
}