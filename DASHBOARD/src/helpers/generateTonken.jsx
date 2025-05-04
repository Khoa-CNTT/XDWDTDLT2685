// Hàm generateToken() dùng để tạo một chuỗi token ngẫu nhiên có độ dài cố định.
export function generateToken() {
    // Khai báo tập hợp các ký tự có thể xuất hiện trong token (chữ hoa, chữ thường, chữ số)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    // Định nghĩa độ dài của token (ở đây là 20 ký tự)
    const length = 20;

    // Khởi tạo chuỗi token rỗng
    let token = '';

    // Lặp qua số lần bằng độ dài của token (20 lần)
    for (let i = 0; i < length; i++) {
        // Lấy ngẫu nhiên một ký tự từ chuỗi characters
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Trả về chuỗi token đã tạo
    return token;
}
