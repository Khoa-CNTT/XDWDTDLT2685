import React, { useState } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";

const PaymentQuality = () => {
    const [countAdult, setCountAdult] = useState(0);
    const [countChildren, setCountChildren] = useState(0);

    const incrAdult = () => setCountAdult(countAdult + 1)
    const decrAdult = () => countAdult > 0 && setCountAdult(countAdult - 1)

    const incrChildren = () => setCountChildren(countChildren + 1)
    const decrChildren = () => countChildren > 0 && setCountChildren(countChildren - 1)
    return (
        <div className='pt-5'>
            <h1 className='text-xl font-semibold'>Hành khách</h1>
            <div className='flex items-center gap-5 mt-5 '>
                <div className="flex items-center justify-between p-3  border rounded-lg w-[325px]">
                    <p className="text-lg text-gray-600">Người lớn</p>
                    <div className='flex items-center gap-5'>
                        <button
                            className="p-2 border rounded-md hover:bg-green-100 dark:hover:bg-blue-300"
                            onClick={decrAdult}
                        >
                            <FaMinus />
                        </button>
                        <span className="text-lg font-semibold">{countAdult}</span>
                        <button
                            className="p-2 border rounded-md dark:hover:bg-blue-300 hover:bg-green-100"
                            onClick={incrAdult}
                        >
                            <FaPlus />
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between p-3  border rounded-lg w-[325px]">
                    <p className="text-lg text-gray-600">Trẻ em</p>
                    <div className='flex items-center gap-5'>
                        <button
                            className="p-2 border rounded-md dark:hover:bg-blue-300 hover:bg-green-100"
                            onClick={decrChildren}
                        >
                            <FaMinus />
                        </button>
                        <span className="text-lg font-semibold">{countChildren}</span>
                        <button
                            className="p-2 border rounded-md dark:hover:bg-blue-300 hover:bg-green-100"
                            onClick={incrChildren}
                        >
                            <FaPlus />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PaymentQuality;