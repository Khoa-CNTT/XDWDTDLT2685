import axios from "./customize_axios";

export const getTourById = (id) => {
    return axios.get(`tours/${id}`);
};

export const getAllTour = async (page, limit = 6) => {
    return axios.get('tours', {
        params: { page, limit }
    });
};

//  lọc tất cả 3 điều kiện 

export const getFilterTours = async (page, limit = 6, region, priceMin, priceMax, duration) => {
    // Tạo đối tượng params chứa các tham số cần thiết
    const params = {};

    // Thêm tham số vào params nếu chúng có giá trị
    if (region) params.region = region;
    if (priceMin) params.priceMin = priceMin;
    if (priceMax) params.priceMax = priceMax;
    if (duration) params.duration = duration;

    // Gửi request với các tham số đã được lọc
    return axios.get('tours', {
        params: { ...params, page, limit }  // Kết hợp các tham số trang và giới hạn
    });
};


