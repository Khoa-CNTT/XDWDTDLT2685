import { useEffect } from "react";

export const useClickOutside = (refs, callback) => {
    useEffect(() => {
        const handleOutsideClick = (event) => {
            // Kiểm tra xem có bất kỳ ref nào chứa event.target hay không
            const isInside = refs.some((ref) => ref?.current && ref.current.contains(event.target));

            // Nếu không có ref nào chứa event.target và callback là hàm, thì gọi callback
            if (!isInside && typeof callback === "function") {
                callback(event);
            }
        };

        window.addEventListener("mousedown", handleOutsideClick);

        // Cleanup: Gỡ sự kiện khi component unmount
        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [callback, refs]);
};
