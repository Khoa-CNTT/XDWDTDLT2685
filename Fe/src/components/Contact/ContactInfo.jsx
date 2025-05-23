import React, { useState } from "react";
import img1 from "../../assets/Travel/ContactImg1.jpg";
import img2 from "../../assets/Travel/ContactImg2.jpg";
import img3 from "../../assets/Travel/ContactImg3.jpg";
import { postContact } from "../../services/contact";
import { toast } from 'react-toastify';

const ContactInfo = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSdt] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Hàm xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang

    // Kiểm tra dữ liệu đầu vào
    if (!name || !email || !sdt || !description) {
      setError("Vui lòng điền đầy đủ các trường bắt buộc.");
      setSuccess(null);
      return;
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Vui lòng nhập email hợp lệ.");
      setSuccess(null);
      return;
    }

    // Kiểm tra định dạng số điện thoại (10-11 số)
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(sdt)) {
      setError("Số điện thoại phải có 10 hoặc 11 chữ số.");
      setSuccess(null);
      return;
    }

    // Dữ liệu gửi lên API, khớp với định dạng JSON
    const contactData = {
      customerName: name,
      email,
      phone: sdt,
      content: description,
      checked: false,
    };

    try {
      const result = await postContact(contactData); // Gọi hàm postContact
      setSuccess("Gửi thông tin thành công!");
      toast.success("Gửi thông tin thành công")
      setError(null);
      // Reset form sau khi gửi thành công
      setName("");
      setEmail("");
      setSdt("");
      setDescription("");
    } catch (err) {
      setError("Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại.");
      setSuccess(null);
      console.error("Lỗi:", err);
    }
  };

  return (
    <div className="pt-20">
      <div className="container">
        <div className="flex gap-10">
          <div className="w-1/2 h-full px-6 py-2 shadow-md bg-gray-50 dark:bg-[#101828] dark:text-white dark:border dark:border-white rounded-xl">
            <div data-aos="fade-left">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold">Liên Hệ</h1>
                <p className="text-gray-500">
                  Địa chỉ email của bạn sẽ không được công bố. Các trường bắt
                  buộc được đánh dấu <span className="text-red-500">*</span>
                </p>
              </div>
              <form className="items-center mt-3" onSubmit={handleSubmit}>
                <div className="flex gap-4">
                  <div className="mt-3">
                    <div className="flex gap-2">
                      <label className="flex flex-col mb-2 font-semibold">
                        Họ và tên
                      </label>
                      <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-auto p-3 dark:text-black border border-gray-400 rounded-lg w-[250px]"
                      placeholder="Tên của bạn..."
                      required
                    />
                  </div>
                  <div className="mt-3">
                    <div className="flex gap-2">
                      <label className="flex flex-col mb-2 font-semibold">
                        Số điện thoại
                      </label>
                      <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="tel"
                      pattern="[0-9]{10,11}"
                      value={sdt}
                      onChange={(e) => setSdt(e.target.value)}
                      className="h-auto dark:text-black w-[250px] p-3 border border-gray-400 rounded-lg"
                      placeholder="Số điện thoại..."
                      required
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex gap-2">
                    <label className="flex flex-col mb-2 font-semibold">
                      Địa chỉ Email
                    </label>
                    <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-400 rounded-lg dark:text-black"
                    placeholder="Nhập email..."
                    required
                  />
                </div>
                <div className="mt-3">
                  <div className="flex gap-2">
                    <label className="flex flex-col mb-2 font-semibold">
                      Nội dung
                    </label>
                    <span className="text-red-500">*</span>
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full dark:text-black p-3 border border-gray-400 rounded-lg h-[150px]"
                    placeholder="Nội dung..."
                    required
                  />
                </div>
                {error && <p className="mt-2 text-red-500">{error}</p>}
                <div className="p-2 border text-center mt-3 text-white mb-2 border-gray-200 w-[100px] bg-primary rounded-full">
                  <button type="submit" className="font-semibold">
                    Gửi
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div data-aos="fade-right" className="mx-auto space-y-4">
            <img
              src={img1}
              className="object-cover w-[600px] rounded-xl h-[250px]"
              alt=""
            />
            <div className="flex gap-6">
              <img
                src={img2}
                className="w-[250px] h-[300px] object-cover rounded-xl"
                alt=""
              />
              <img
                src={img3}
                className="w-[250px] h-[300px] object-cover rounded-xl"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
