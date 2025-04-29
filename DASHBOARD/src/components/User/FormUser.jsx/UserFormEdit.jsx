import React from "react";

function UserFormEdit({ data, dataCategory, handleChange, handleSubmit, closeModal }) {
    return (
        <form
            className="mx-auto max-w-4xl space-y-6 rounded-lg bg-white p-6"
            onSubmit={handleSubmit}
        >
            <table className="w-full table-auto border-collapse">
                <tbody>
                    <tr className="flex items-center py-3">
                        <td className="w-1/4 py-2 font-semibold text-gray-700">Tên</td>
                        <td className="w-3/4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Họ và Tên"
                                value={data.name || ""}
                                className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                required
                                readOnly
                            />
                        </td>
                    </tr>
                    <tr className="flex items-center py-3">
                        <td className="w-1/4 py-2 font-semibold text-gray-700">Địa chỉ</td>
                        <td className="w-3/4">
                            <input
                                type="text"
                                name="address"
                                placeholder="Địa chỉ"
                                value={data.address || ""}
                                className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                required
                                readOnly
                            />
                        </td>
                    </tr>
                    {dataCategory.length > 0 && (
                        <tr className="flex items-center py-3">
                            <td className="w-1/4 py-2 font-semibold text-gray-700">Vai trò</td>
                            <td className="w-3/4">
                                <select
                                    name="role"
                                    value={data.role || ""}
                                    className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                    onChange={handleChange}
                                >
                                    <option value="">Chọn vai trò</option>
                                    {dataCategory.map((item, index) => (
                                        <option
                                            key={index}
                                            value={item.name}
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    )}
                    {data.role === "Admin" && (
                        <>
                            <tr className="flex items-center py-3">
                                <td className="w-1/4 py-2 font-semibold text-gray-700">Tên đăng nhập</td>
                                <td className="w-3/4">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Tên đăng nhập"
                                        value={data.username || ""}
                                        className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        readOnly
                                    />
                                </td>
                            </tr>
                            <tr className="flex items-center py-3">
                                <td className="w-1/4 py-2 font-semibold text-gray-700">Mật khẩu</td>
                                <td className="w-3/4">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Mật khẩu"
                                        value={data.password || ""}
                                        className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        readOnly
                                    />
                                </td>
                            </tr>
                        </>
                    )}
                    <tr className="flex items-start py-3">
                        <td className="w-1/4 py-2 font-semibold text-gray-700">Mô tả</td>
                        <td className="w-3/4">
                            <textarea
                                name="about"
                                placeholder="Mô tả"
                                value={data.about || ""}
                                className="focus:ring-opacity-50 min-h-[100px] w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                required
                                readOnly
                            />
                        </td>
                    </tr>
                    <tr className="flex items-center py-3">
                        <td className="w-1/4 py-2 font-semibold text-gray-700">Email</td>
                        <td className="w-3/4">
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={data.email || ""}
                                className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                required
                                readOnly
                            />
                        </td>
                    </tr>
                    <tr className="flex items-center py-3">
                        <td className="w-1/4 py-2 font-semibold text-gray-700">Số điện thoại</td>
                        <td className="w-3/4">
                            <input
                                type="text"
                                name="phone"
                                placeholder="Số điện thoại"
                                value={data.phone || ""}
                                className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                required
                                readOnly
                            />
                        </td>
                    </tr>
                    <tr className="flex items-center py-3">
                        <td className="w-1/4 py-2 font-semibold text-gray-700">Link ảnh</td>
                        <td className="flex w-3/4 items-center space-x-3">
                            <input
                                type="text"
                                name="avatar"
                                placeholder="Ảnh đại diện URL"
                                value={data.avatar || ""}
                                className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                readOnly
                            />
                            <label className="flex-shrink-0">
                                <span className="cursor-pointer rounded bg-blue-500 px-3 py-2 text-white">Upload</span>
                                <input
                                    type="file"
                                    name="avatarFile"
                                    className="hidden"
                                    onChange={handleChange}
                                />
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="flex justify-end space-x-4 py-4">
                <button
                    type="button"
                    className="focus:ring-opacity-50 rounded-md bg-gray-400 px-5 py-2.5 font-medium text-white transition duration-200 hover:bg-gray-500 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                    onClick={closeModal}
                >
                    Hủy
                </button>
                <button
                    type="submit"
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 px-5 py-2.5 font-medium text-white shadow-md hover:bg-gradient-to-l focus:outline-none"
                >
                    Lưu
                </button>
            </div>
        </form>
    );
}

export default UserFormEdit;
