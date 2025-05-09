import React from 'react';
import StarDisplay from '../Star/StarDisplay';
import Sort from '../Sort/Sort';
import Places from '../Places/Places';
import useTourFilterSort from '../../hooks/useTourFilterSort';

const region = ["Miền Bắc", "Miền Trung", "Miền Nam"];
const prices = [
    "1.000.000 - 3.000.000 Vnd",
    "3.000.000 - 6.000.000 Vnd",
    "6.000.000 - 8.000.000 Vnd",
    "8.000.000 - 10.000.000 Vnd"
];
const times = ['3 ngày 2 đêm', '4 ngày 3 đêm', '5 ngày 4 đêm'];

const TourFilter = () => {
    const {
        selectedRegion,
        setSelectedRegion,
        selectedPrice,
        setSelectedPrice,
        selectedDuration,
        setSelectedDuration,
        sortValue,
        setSortValue,
        tours,
        resetFilters
    } = useTourFilterSort();
    // const [loading, setLoading] = useState(false)


    return (
        <div className='pt-10'>
            <div className='flex gap-3 p-5 '>
                <div className='w-1/4'>
                    <div className='w-full p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-[#101828] dark:text-white'>
                        <div className='ml-[220px] text-white'>
                            <button
                                className='px-8 py-2 border border-gray-100 rounded-lg bg-primary'
                                onClick={resetFilters}
                            >
                                Xóa
                            </button>
                        </div>

                        <h1 className='mt-2 text-lg font-semibold'>Lọc theo giá</h1>
                        <div className='mt-3 space-y-2'>
                            {prices.map((pri, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="price"
                                        className="w-4 h-4"
                                        value={pri}
                                        checked={selectedPrice === pri}
                                        onChange={() => setSelectedPrice(pri)}
                                    />
                                    <span className='text-lg'>{pri}</span>
                                </div>
                            ))}
                        </div>
                        <hr className='mt-5 text-gray-500' />

                        <h1 className='text-lg font-semibold'>Điểm đến</h1>
                        <div className='mt-3 space-y-2'>
                            {region.map((re, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="region"
                                        className="w-4 h-4"
                                        value={re}
                                        checked={selectedRegion === re}
                                        onChange={() => setSelectedRegion(re)}
                                    />
                                    <span className='text-lg'>{re}</span>
                                </div>
                            ))}
                        </div>

                        <hr className='mt-5 text-gray-500' />

                        <h1 className='text-lg font-semibold'>Đánh giá</h1>
                        <div className='mt-3 space-y-2'>
                            {[5, 4, 3, 2, 1].map((rating, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        className="w-4 h-4"
                                        name="rating"
                                    />
                                    <StarDisplay rating={rating} />
                                </div>
                            ))}
                        </div>

                        <hr className='mt-5 text-gray-500' />

                        <h1 className='text-lg font-semibold'>Thời gian</h1>
                        <div className='mt-3 space-y-2'>
                            {times.map((time, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="duration"
                                        className="w-4 h-4"
                                        value={time}
                                        checked={selectedDuration === time}
                                        onChange={() => setSelectedDuration(time)}
                                    />
                                    <span className='text-lg'>{time}</span>
                                </div>
                            ))}
                        </div>

                        <hr className='mt-5 text-gray-400' />
                    </div>
                </div>
                <div className=''>
                    <Sort sortValue={sortValue} setSortValue={setSortValue} />
                    <Places
                        hideTitle={false}
                        booking={false}
                        size="small"
                        left={true}
                        container={false}
                        star={true}
                        tours={tours}
                    />
                </div>
            </div>
        </div>
    );
};

export default TourFilter;
