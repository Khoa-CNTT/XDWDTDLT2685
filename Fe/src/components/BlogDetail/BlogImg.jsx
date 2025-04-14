import React, { useState } from 'react';
import BlogHeader from './BlogHeader';
import BlogContentCard from './BlogContentCard';

const BlogImg = ({ item }) => {
    // const [selectedIndex, setSelectedIndex] = useState(0);
    // const [selectedImg, setSelectedImg] = useState(item.img[0]);

    // const handlePrev = () => {
    //     setSelectedIndex(prev => {
    //         const newIndex = prev === 0 ? item.img.length - 1 : prev - 1;
    //         setSelectedImg(item.img[newIndex]);
    //         return newIndex;
    //     });
    // };

    // const handleNext = () => {
    //     setSelectedIndex(prev => {
    //         const newIndex = prev === item.img.length - 1 ? 0 : prev + 1;
    //         setSelectedImg(item.img[newIndex]);
    //         return newIndex;
    //     });
    // };

    return (
        <div >
            <div className='container gap-10 '>
                {/* <div className='pt-2'>
                    <div className="relative mx-auto">
                        <img
                            className=' h-[500px] w-full object-cover transition duration-700'
                            src={selectedImg} alt="" />
                        <button
                            onClick={handlePrev}
                            className="absolute p-2 text-white rounded-full shadow-md bg-gradient-to-r from-primary to-secondary left-5 top-1/2">
                            <AiOutlineLeft className='w-6 h-6' />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute p-2 text-white rounded-full shadow-md bg-gradient-to-r from-primary to-secondary right-5 top-1/2">
                            <AiOutlineRight className='w-6 h-6' />
                        </button>
                    </div>
                    <div className='flex justify-center w-full gap-2 mt-2'>
                        {item.img.map((img, index) => (
                            <img
                                key={index}
                                className={`w-[220px] object-cover cursor-pointer border 
                                    ${index === selectedIndex ? 'border-red-500' : ''}`}
                                src={img} alt=""
                                onClick={() => {
                                    setSelectedIndex(index);
                                    setSelectedImg(img);
                                }}
                            />
                        ))}
                    </div>
                </div> */}
                <BlogHeader item={item} />
            </div>
            <BlogContentCard item={item} />
            
        </div>
    );
};

export default BlogImg;
