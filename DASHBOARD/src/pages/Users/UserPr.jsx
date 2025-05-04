import DeleteUser from "../../components/User/Delete";
import EditUser from "../../components/User/Edit";

function UserPr(props) {
    const { user } = props;

    const getRoleName = () => {
        if (!user.role) return "N/A";
        if (user.role.roleId === 2) return "Admin";
        return user.role.name || "N/A";
    };

    return (
        <>
            <div className="mt-0 flex flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg sm:flex-row dark:border-gray-700 dark:bg-slate-800">
                {/* Avatar */}
                <div className="flex w-full items-center justify-center sm:order-first sm:w-1/2">
                    <div className="h-50 w-50 overflow-hidden rounded-full border border-amber-300">
                        <img
                            src={user.avatar || "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"}
                            alt={user.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

                {/* Thông tin người dùng */}
                <div className="mt-4 flex w-full flex-col sm:mt-0 sm:w-1/2 sm:pr-4">
                    <div className="flex flex-1 flex-col">
                        <h3 className="mt-0 text-lg font-bold text-gray-900 dark:text-white">{user.name}</h3>
                        <div className="mt-2 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            <p>
                                <span className="font-semibold">About:</span> {user.about || "Chưa có thông tin"}
                            </p>
                            <p>
                                <span className="font-semibold">Address:</span> {user.address || "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">Phone:</span> {user.phone || "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">Email:</span> {user.email || "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">Vai trò:</span> {getRoleName()}
                            </p>
                        </div>
                    </div>
                    {/* Button */}
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
                        <div className="w-fit flex-shrink-0">
                            <EditUser
                                user={user}
                                className="w-full min-w-[120px] px-4 py-2"
                            />
                        </div>
                        <div className="w-fit flex-shrink-0">
                            <DeleteUser
                                user={user}
                                className="w-full min-w-[120px] px-4 py-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserPr;
