import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GoBack from "../../components/GoBack/Goback";

const initialContactData = [
    {
        id: "1",
        name: "Đặng Hữu Quang Huy",
        phone: "01236478945",
        email: "huydang2806@gmail.com",
        message: "Tôi cần tư vấn tour xịn",
        checked: false,
    },
    {
        id: "2",
        name: "Đặng Hữu Quang Huy",
        phone: "01236478945",
        email: "huydang2806@gmail.com",
        message: "Tôi cần tư vấn tour xịn",
        checked: false,
    },
];

const ContactNotifications = () => {
    const [contacts, setContacts] = useState(() => {
        const savedContacts = localStorage.getItem("contacts");
        return savedContacts ? JSON.parse(savedContacts) : initialContactData;
    });

    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }, [contacts]);

    const toggleCheckbox = (index) => {
        const updatedContacts = [...contacts];
        updatedContacts[index].checked = !updatedContacts[index].checked;
        setContacts(updatedContacts);
    };

    return (
        <div className="min-h-screen w-full bg-white px-4 font-sans sm:px-6 lg:px-8 dark:bg-slate-900 dark:text-white">
            <div className="py-4">
                <div className="mb-6 flex items-center justify-center rounded-2xl bg-gray-200 p-3 shadow-md dark:bg-slate-700">
                    <h1 className="text-xl font-bold tracking-wide text-gray-800 sm:text-2xl dark:text-white">Liên hệ khách hàng</h1>
                </div>

                <div className="rounded-xl bg-white shadow-lg transition-colors duration-300 dark:bg-slate-950">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {contacts.map((contact, index) => (
                            <li
                                key={contact.id}
                                className={`p-4 transition-colors hover:bg-gray-50 sm:p-6 dark:hover:bg-gray-700 ${
                                    contact.checked ? "bg-green-50 dark:bg-gray-700" : ""
                                }`}
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            checked={contact.checked}
                                            onChange={() => toggleCheckbox(index)}
                                            className="mt-1 h-5 w-5 accent-green-600"
                                        />
                                        <div>
                                            <Link>
                                                <h3
                                                    className={`text-lg font-semibold sm:text-xl ${
                                                        contact.checked
                                                            ? "text-gray-500 line-through dark:text-gray-400"
                                                            : "text-gray-800 dark:text-[#00c0d1]"
                                                    }`}
                                                >
                                                    {contact.name}
                                                </h3>
                                            </Link>
                                            <div className="mt-1 text-base text-gray-500 dark:text-gray-400">
                                                {contact.phone}
                                                {contact.email && <span className="ml-2">| {contact.email}</span>}
                                            </div>
                                            <p className="mt-2 text-base text-gray-600 sm:text-lg dark:text-gray-300">{contact.message}</p>
                                        </div>
                                    </div>
                                    <div className="text-base text-gray-400 dark:text-gray-500">#{index + 1}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6">
                    <GoBack />
                </div>
            </div>
        </div>
    );
};

export default ContactNotifications;
