import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center transition-colors duration-300 dark:bg-slate-950">
            <h1 className="mb-4 text-5xl font-bold text-red-500 md:text-6xl dark:text-red-400">404</h1>
            <p className="mb-6 text-lg text-gray-700 md:text-xl lg:text-2xl dark:text-gray-300">Oops! Trang bạn tìm kiếm không tồn tại.</p>
            <Link
                to="/"
                className="rounded-lg px-6 py-2 text-sm text-white transition hover:opacity-90 md:text-base"
                style={{
                    backgroundColor: "#00c0d1",
                }}
            >
                Quay lại Trang chủ
            </Link>
        </div>
    );
}
