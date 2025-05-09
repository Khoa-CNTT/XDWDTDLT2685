import React, { useState } from 'react';
import chatbox from '../../assets/Travel/chatbox.png';
import { FaPaperclip, FaPaperPlane, FaRegImage } from 'react-icons/fa';
import { IoMdClose } from "react-icons/io";
import { IoExpandOutline } from "react-icons/io5";

const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const [messages, setMessages] = useState([
        {
            id: 1,
            text: 'Bạn quan tâm đến chương trình du lịch nước nào ạ?',
            options: ['Tour Nhật Bản', 'Tour Hàn Quốc', 'Tour Đài Loan'],
            type: 'bot',
            timestamp: new Date(),
        },
    ]);
    
    const [input, setInput] = useState('');

    const toggleChat = () => setIsOpen(!isOpen);

    const toggleExpand = () => setIsExpanded(!isExpanded); // Hàm này sẽ thay đổi trạng thái mở rộng

    const sendMessage = () => {
        if (!input.trim()) return;
        const newMessage = { id: Date.now(), text: input, type: 'user' };
        setMessages([...messages, newMessage]);
        setInput('');
    };

    return (
        <div>
            {/* Chat icon + intro message */}
            {!isOpen && (
                <div className="flex items-center p-4 ">
                    <div
                        className="flex items-center justify-center w-12 h-12 rounded-full cursor-pointer bg-primary"
                        onClick={toggleChat}
                    >
                        <img
                            src={chatbox}
                            alt="Avatar"
                            className="object-cover w-10 h-10 rounded-full"
                        />
                    </div>
                    <div className="max-w-xs p-3 text-sm bg-white rounded-lg shadow-xl">
                        <p className="font-medium text-primary">GoViet Tours sẵn sàng hỗ trợ!</p>
                        <p>Quý khách đang cần thông tin gì ạ?</p>
                    </div>
                </div>
            )}

            {/* Chat box khi mở */}
            {isOpen && (
                <div
                    className={`ml-[10px] bg-white rounded-2xl shadow-2xl flex flex-col ${isExpanded ? 'w-[800px] h-[500px] ' : 'w-90 h-[500px]'} `}
                >
                    <div className="relative flex items-center justify-between px-4 py-2 font-semibold text-white bg-primary rounded-t-2xl">
                        {/* icon mở rộng và close */}
                        <div className="absolute flex gap-4 text-white top-[-40px] right-2">
                            <button className='p-1 bg-gray-400 rounded-full' onClick={toggleExpand}> {/* Bắt sự kiện khi click vào icon mở rộng */}
                                <IoExpandOutline className='w-6 h-6' />
                            </button>
                            <button className='p-1 bg-gray-400 rounded-full' onClick={toggleChat}>
                                <IoMdClose className='w-6 h-6' />
                            </button>
                        </div>

                        {/* Tiêu đề */}
                        <div className='flex items-center'>
                            <img
                                src={chatbox}
                                alt="chat"
                                className="object-cover w-10 h-10 rounded-full"
                            />
                            <span className="ml-2">GoViet Tours</span>
                        </div>
                    </div>
                    <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`px-3 py-2  max-w-[75%] rounded-lg ${msg.type === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100'}`}>
                                    <p className="break-words whitespace-normal">{msg.text}</p>
                                    {msg.options && (
                                        <div className="mt-2 space-y-1">
                                            {msg.options.map((opt, i) => (
                                                <div
                                                    key={i}
                                                    className="px-2 py-1 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
                                                >
                                                    {opt}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 border-t">
                        <button className="text-gray-500 hover:text-gray-700">
                            <FaPaperclip />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                            <FaRegImage />
                        </button>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Aa"
                            className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none"
                        />
                        <button
                            onClick={sendMessage}
                            className="px-3 py-2 text-white rounded bg-primary hover:bg-blue-300"
                        >
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBox;