import { Link } from "react-router-dom";
function Menu(props) {
    const { dropdownOpen } = props;
    return (
        <div>
            {dropdownOpen && (
                <nav className="absolute right-0 z-20 mt-2 w-48 rounded-md border bg-white p-2 shadow-lg dark:border-slate-600 dark:bg-slate-800">
                    <ul className="mb-1 flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-200">
                        <li className="flex items-center gap-2 border-b-2 border-slate-200 px-3 py-2 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700">
                            <Link
                                to="/admin"
                                className="block w-full rounded-md px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700"
                            >
                                Hồ sơ cá nhân
                            </Link>
                        </li>
                        <li className="flex items-center gap-2 border-b-2 border-slate-200 px-3 py-2 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700">
                            <Link
                                to="/admin/change-password"
                                className="block w-full rounded-md px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700"
                            >
                                Thay đổi mật khẩu
                            </Link>
                        </li>

                        <li className="flex items-center gap-2 border-b-2 border-slate-200 px-3 py-2 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700">
                            <Link
                                to="/logout"
                                className="block w-full rounded-md px-3 py-2 text-left text-red-500 hover:bg-slate-100 dark:text-red-400 dark:hover:bg-slate-700"
                            >
                                Đăng xuất
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}
export default Menu;
