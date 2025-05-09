import React, { useState, useEffect, useRef } from 'react';
import chatbox from '../../assets/Travel/chatbox.png';
import { FaPaperclip, FaPaperPlane, FaRegImage } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { IoExpandOutline } from 'react-icons/io5';

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
    const [isTyping, setIsTyping] = useState(false);
    const [typingDots, setTypingDots] = useState(0);
    const messagesEndRef = useRef(null);
    const CHAT_ID = 'user-123'; // Có thể tạo động nếu cần

    // URL backend cố định
    const BASE_URL = 'http://localhost:8088/api/v1';

    // Cuộn xuống tin nhắn mới nhất
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, typingDots]);

    // Hiệu ứng dấu chấm động cho typing indicator
    useEffect(() => {
        let typingInterval = null;
        if (isTyping) {
            typingInterval = setInterval(() => {
                setTypingDots((prev) => (prev + 1) % 4);
            }, 500);
        }
        return () => clearInterval(typingInterval);
    }, [isTyping]);

    // Thiết lập kết nối SSE
    useEffect(() => {
        const evtSource = new EventSource(`${BASE_URL}/events`); // Gọi thẳng đến backend
        evtSource.onmessage = (e) => {
            try {
                const { chatId, reply } = JSON.parse(e.data);
                if (chatId === CHAT_ID) {
                    setIsTyping(false);
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: Date.now(),
                            text: reply,
                            type: 'bot',
                            timestamp: new Date(),
                        },
                    ]);
                }
            } catch (err) {
                console.error('Invalid SSE data', err);
                setIsTyping(false);
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now(),
                        text: 'Lỗi xử lý dữ liệu từ server.',
                        type: 'bot',
                        timestamp: new Date(),
                    },
                ]);
            }
        };
        evtSource.onerror = (err) => {
            console.error('SSE connection error', err);
            setIsTyping(false);
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    text: 'Mất kết nối với server.',
                    type: 'bot',
                    timestamp: new Date(),
                },
            ]);
        };

        return () => evtSource.close();
    }, []);

    const toggleChat = () => setIsOpen(!isOpen);
    const toggleExpand = () => setIsExpanded(!isExpanded);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const newMessage = {
            id: Date.now(),
            text: input,
            type: 'user',
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const res = await fetch(`${BASE_URL}/chat`, { // Gọi thẳng đến backend
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input, chatId: CHAT_ID }),
            });
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Status ${res.status}: ${errorText || 'Không tìm thấy endpoint'}`);
            }
            // Không cần lấy data.reply vì dùng SSE để nhận phản hồi
        } catch (err) {
            setIsTyping(false);
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    text: `Lỗi kết nối tới server: ${err.message}`,
                    type: 'bot',
                    timestamp: new Date(),
                },
            ]);
            console.error('Error:', err);
        }
    };

    // Xử lý hiển thị ảnh trong tin nhắn bot
    const renderMessageText = (text) => {
        const regex = /(https?:\/\/\S+\.(?:jpg|jpeg|png|gif))(?![^<]*>)/gi;
        if (regex.test(text)) {
            return (
                <div
                    dangerouslySetInnerHTML={{
                        __html: text.replace(regex, '<img src="$1" alt="Tour Image" style="max-width: 100%; max-height: 150px; border-radius: 4px; margin-top: 5px;" />'),
                    }}
                />
            );
        }
        return <p className="break-words whitespace-normal">{text}</p>;
    };

    return (
        <div>
            {/* Chat icon + intro message */}
            {!isOpen && (
                <div className="flex items-center p-4">
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
                        <p className="font-medium text-primary">Mixivivu Tours sẵn sàng hỗ trợ!</p>
                        <p>Quý khách đang cần thông tin gì ạ?</p>
                    </div>
                </div>
            )}

            {/* Chat box khi mở */}
            {isOpen && (
                <div
                    className={`ml-[10px] bg-white rounded-2xl shadow-2xl flex flex-col ${isExpanded ? 'w-[800px] h-[500px]' : 'w-[400px] h-[500px]'}`}
                >
                    <div className="relative flex items-center justify-between px-4 py-2 font-semibold text-white bg-primary rounded-t-2xl">
                        {/* icon mở rộng và close */}
                        <div className="absolute flex gap-4 text-white top-[-40px] right-2">
                            <button className="p-1 bg-gray-400 rounded-full" onClick={toggleExpand}>
                                <IoExpandOutline className="w-6 h-6" />
                            </button>
                            <button className="p-1 bg-gray-400 rounded-full" onClick={toggleChat}>
                                <IoMdClose className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Tiêu đề */}
                        <div className="flex items-center">
                            <img
                                src={chatbox}
                                alt="chat"
                                className="object-cover w-10 h-10 rounded-full"
                            />
                            <span className="ml-2">Mixivivu Tours</span>
                        </div>
                    </div>
                    <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`px-3 py-2 max-w-[75%] rounded-lg ${msg.type === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100'}`}
                                >
                                    {renderMessageText(msg.text)}
                                    <p className="mt-1 text-xs text-gray-500">
                                        {new Date(msg.timestamp).toLocaleTimeString()}
                                    </p>
                                    {msg.options && (
                                        <div className="mt-2 space-y-1">
                                            {msg.options.map((opt, i) => (
                                                <div
                                                    key={i}
                                                    className="px-2 py-1 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
                                                    onClick={() => {
                                                        setInput(opt);
                                                        sendMessage();
                                                    }}
                                                >
                                                    {opt}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex items-center justify-start">
                                <div className="px-3 py-2 max-w-[75%] rounded-lg bg-gray-100 flex items-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-gray-400 rounded-full border-t-transparent animate-spin"></div>
                                    <p className="break-words whitespace-normal">
                                        Nhân viên đang trả lời bạn{'.'.repeat(typingDots)}
                                    </p>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
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
                            disabled={!input.trim()}
                            className={`px-3 py-2 text-white rounded bg-primary hover:bg-blue-300 ${!input.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
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