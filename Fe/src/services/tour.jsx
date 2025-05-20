import axios from "./customize_axios";

export const getTourById = (id) => {
    return axios.get(`tours/${id}`);
};

export const getAllTour = async (page, limit = 6) => {
    return axios.get('tours', {
        params: { page, limit }
    });
};

//  lọc tất cả 4 điều kiện 
export const getFilterSortTours = async (page, limit = 6, region, priceMin, priceMax, duration, sortBy, sortDir,starRating) => {
    // Tạo đối tượng params chứa các tham số cần thiết
    const params = {};
    // Thêm tham số vào params nếu chúng có giá trị
    if (region) params.region = region;
    if (priceMin) params.priceMin = priceMin;
    if (priceMax) params.priceMax = priceMax;
    if (duration) params.duration = duration;
    if (sortBy) params.sortBy = sortBy;
    if (sortDir) params.sortDir = sortDir;
    if (starRating) params.starRating = starRating;
    // Gửi request với các tham số đã được lọc
    return axios.get('tours', {
        params: { ...params, page, limit }  // Kết hợp các tham số trang và giới hạn
    });
};

// tìm kiếm
export const getSearchTour = async (page, limit = 6, title, priceMin, priceMax, duration) => {
    // Tạo đối tượng params chứa các tham số cần thiết
    const params = {};
    // Thêm tham số vào params nếu chúng có giá trị
    if (title) params.title = title;
    if (priceMin) params.priceMin = priceMin;
    if (priceMax) params.priceMax = priceMax;
    if (duration) params.duration = duration;

    // Gửi request với các tham số đã được lọc
    return axios.get('tours', {
        params: { ...params, page, limit }  // Kết hợp các tham số trang và giới hạn
    });
};

// lấy tất cả tour đã đặt của 1 người dùng
export const getAllBookingId = (id) => {
    const token = localStorage.getItem("token");
    return axios.get(`tours/user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// lấy tất cả tour được đặt nhiều nhất
export const getPopular = () => {
    return axios.get("tours/top-booked");
};

// lọc trạng thái
export const getBookingtour = async (id, booking_status) => {
    const token = localStorage.getItem("token");
    const params = {};
    if (booking_status) params.booking_status = booking_status;

    return axios.get(`tours/user/${id}`, {
        params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
