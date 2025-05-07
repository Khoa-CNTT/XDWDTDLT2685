import PropTypes from "prop-types";
import icons from "../../util/icon";
import { useEffect, useRef, useState } from "react";
import { getInfoAdmin } from "../../services/adminService";
import DarkMode from "../../components/DarkMode";
import Menu from "../../components/Menu";

const { BiSolidChevronsRight } = icons;

function Header({ collapsed, setCollapsed }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef();
    const [userAvatar, setUserAvatar] = useState("https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png");

    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
            console.warn("No user_id found in localStorage");
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await getInfoAdmin(userId);
                if (res.status === 200 && res.data?.avatar_path) {
                    setUserAvatar(res.data.avatar_path);
                } else {
                    console.warn("No valid avatar_path found, using default");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <BiSolidChevronsRight className={collapsed ? "rotate-180" : ""} />
                </button>
            </div>
            <div className="flex items-center gap-x-3 py-2">
                <DarkMode />
                <div
                    className="relative"
                    ref={dropdownRef}
                >
                    <button
                        className="flex size-12 items-center justify-center overflow-hidden rounded-full border border-amber-400 bg-slate-50 dark:bg-slate-950"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <img
                            src={userAvatar}
                            alt="Ảnh đại diện người dùng"
                            className="h-full w-full object-cover"
                        />
                    </button>
                    <Menu dropdownOpen={dropdownOpen} />
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    setCollapsed: PropTypes.func.isRequired,
};

export default Header;
