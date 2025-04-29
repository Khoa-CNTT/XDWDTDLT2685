import React, { useState, forwardRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "../../util/cn";
import logoDark from "../../assets/Img/dashboard_Dark.svg";
import logoLight from "../../assets/Img/dashboard_Light.svg";
import PropTypes from "prop-types";
import { menu } from "../../util/menu";

const SideBarLeft = forwardRef(({ collapsed }, ref) => {
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const location = useLocation();

    const toggleSubMenu = (index) => {
        setOpenSubMenu(openSubMenu === index ? null : index);
    };

    return (
        <aside
            ref={ref}
            className={cn(
                "fixed z-[100] flex h-full flex-col overflow-x-hidden bg-white dark:bg-slate-900",
                collapsed
                    ? "border-b border-slate-300 md:w-[80px] md:items-center dark:border-slate-700"
                    : "border-r border-slate-300 md:w-[250px] dark:border-slate-700",
                collapsed && "max-md:hidden",
            )}
        >
            <Link
                to="/"
                className="flex h-[80px] w-full items-center justify-center"
            >
                <div className="flex items-center gap-x-3">
                    <img
                        src={logoLight}
                        alt="LogoLight"
                        className="h-[40px] w-auto dark:hidden"
                    />
                    <img
                        src={logoDark}
                        alt="LogoDark"
                        className="hidden h-[40px] w-auto dark:block"
                    />
                    {!collapsed && window.innerWidth >= 1024 && <p className="text-lg font-medium text-slate-900 dark:text-slate-50">DASHBOARD</p>}
                </div>
            </Link>

            <div className="flex w-full flex-col gap-y-4 overflow-y-auto p-3">
                <div className="flex flex-col py-3 text-left font-medium">
                    {menu.map((group, groupIndex) =>
                        group.link.map((item, index) => {
                            const isParentActive = item.children ? location.pathname.startsWith(item.path) : false;
                            const isActiveOrOpen =
                                (item.children && isParentActive) ||
                                (!item.children && location.pathname === item.path) ||
                                openSubMenu === `${groupIndex}-${index}`;

                            return (
                                <div
                                    key={item.path}
                                    className={`w-full ${isActiveOrOpen ? "bg-[#a5e6ed] dark:bg-[#064b50]" : "hover:bg-[#453d5511]"}`}
                                >
                                    <NavLink
                                        to={item.children ? "#" : item.path}
                                        end={!item.children}
                                        className="w-full"
                                        onClick={() => item.children && toggleSubMenu(`${groupIndex}-${index}`)}
                                    >
                                        <div
                                            className={`flex h-[48px] w-full items-center gap-3 px-[20px] ${
                                                isActiveOrOpen
                                                    ? `${collapsed ? "border-b-4" : "border-l-4"} border-[#01b5c8] bg-[#a5e6ed] dark:border-[#01b5c8] dark:bg-[#064b50]`
                                                    : "hover:bg-[#cad0ff22]"
                                            }`}
                                        >
                                            <div className="flex w-[18px] items-center justify-center">
                                                <item.icon
                                                    size={18}
                                                    className={`${
                                                        isActiveOrOpen ? "text-[#01b5c8] dark:text-[#01b5c8]" : "text-black dark:text-white"
                                                    }`}
                                                />
                                            </div>
                                            {!collapsed && window.innerWidth >= 1024 && (
                                                <span
                                                    className={`${
                                                        isActiveOrOpen
                                                            ? "font-semibold text-black dark:text-white"
                                                            : "text-gray-600 dark:text-gray-300"
                                                    }`}
                                                >
                                                    {item.text}
                                                </span>
                                            )}
                                        </div>
                                    </NavLink>
                                </div>
                            );
                        }),
                    )}
                </div>
            </div>
        </aside>
    );
});

SideBarLeft.displayName = "Sidebar";
SideBarLeft.propTypes = {
    collapsed: PropTypes.bool,
};

export default SideBarLeft;
