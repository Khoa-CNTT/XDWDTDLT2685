import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import BlogImg from './BlogImg';
import { getTourById } from '../../services/tour';

const BlogDetail = () => {
    const { id } = useParams(); 
    const [blogDetail, setBlogDetail] = useState();

    const getDetail = async () => {
        try {
            const res = await getTourById(id);
            setBlogDetail(res);
        } catch (error) {
            console.log("Lỗi khi gọi API:", error);
        }
    };

    useEffect(() => {
        if (id) getDetail();
    }, [id]);

    return (
        <div>
            {blogDetail && <BlogImg item={blogDetail} />}

        </div>
    );
};

export default BlogDetail;
