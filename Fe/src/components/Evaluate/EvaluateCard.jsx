import React from 'react';

const EvaluateCard = ({ item }) => {
    return (
        <div>
            <div className='relative flex flex-col items-center justify-center gap-4 p-4 mx-4 text-center shadow-lg rounded-xl dark:bg-gray-800 bg-primary/10'>
                <img
                    src={item.avatar}
                    alt={item.avatar}
                    className="block mx-auto rounded-full w-[100px] h-[100px]"
                />
                <h1 className="text-xl font-bold">{item.user_name}</h1>
                      <p className="text-base text-left text-gray-500 dark:text-gray-400">{item.comment}</p>
                      <p className="absolute top-0 right-0 font-serif text-black/20 dark:text-white text-9xl">
                        ,,
                      </p>
            </div>
        </div>
    );
};

export default EvaluateCard;