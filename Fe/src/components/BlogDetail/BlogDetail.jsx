import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import BlogImg from './BlogImg';

const BlogDetail = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [blogDetail, setBlogDetail] = useState();

    const getBlogDetail = async () => {
        try {
            const res = await axios.get(`https://67b48e00392f4aa94fab5b59.mockapi.io/Bestplace/${(id)}`);
            setBlogDetail(res.data);
        } catch (error) {
            console.log("Lỗi:", error);
        }
    };

    useEffect(() => {
        if (id) getBlogDetail();
    }, [id]);

    return (
        <div>
            {blogDetail && <BlogImg item={blogDetail} />}

        </div>
    );
};

export default BlogDetail;
