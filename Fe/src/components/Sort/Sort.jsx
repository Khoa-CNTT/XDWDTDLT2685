import React from 'react';

const Sort = () => {
    return (
        <div className='pt-10'>
            <div className='ml-[20px]'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-lg font-semibold'>Tours tìm thấy</h1>
                    <div className="flex items-center gap-3">
                        <p className="text-base font-semibold">Sắp xếp theo</p>
                        <select className="p-1 w-[150px] px-2 rounded-xl border border-gray-300 cursor-pointer 
                            dark:bg-[#101828] dark:text-white">
                            <option value="default">Sắp xếp theo</option>
                            <option value="new">Mới nhất</option>
                            <option value="old">Cũ nhất</option>
                            <option value="high-to-low">Cao đến thấp</option>
                            <option value="low-to-high">Thấp đến cao</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sort;
