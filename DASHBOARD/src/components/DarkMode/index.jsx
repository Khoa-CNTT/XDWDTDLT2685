import { useTheme } from "../../hooks/use_theme";
import icons from "../../util/icon";
const { IoIosSunny, IoIosMoon } = icons;
function DarkMode() {
    const { theme, setTheme } = useTheme();
    return (
        <button
            className="btn-ghost size-12 rounded-full border border-amber-400"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            <IoIosSunny
                size={18}
                className={theme === "dark" ? "hidden" : "text-yellow-400"}
            />
            <IoIosMoon
                size={18}
                className={theme === "dark" ? "text-yellow-400" : "hidden"}
            />
        </button>
    );
}
export default DarkMode;
