import React from 'react';
import chatbox from '../../assets/Travel/chatbox.png'
const ChatBoxImg = () => {
    return (
        <div className="flex items-start p-4 ">
            <div className="flex items-center justify-center w-12 h-12 rounded-full cursor-pointer bg-primary">
                <img
                    src={chatbox}
                    alt="Avatar"
                    className="object-cover w-10 h-10 rounded-full"
                />
            </div>
            <div className="max-w-xs p-3 text-sm bg-white rounded-lg shadow-xl">
                <p className="font-medium text-primary">Mixivivu Tours sẵn sàng hỗ trợ!</p>
                <p>Quý khách đang cần thông tin gì ạ?</p>
            </div>
        </div>
    );
};

export default ChatBoxImg;