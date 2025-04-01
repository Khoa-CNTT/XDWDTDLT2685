import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BlogContentCard from './BlogContentCard';
import { useParams } from 'react-router-dom';

const BlogContent = () => {
    const [content, setContent] = useState(null);
    const { id } = useParams();

    const getContent = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/tours/${id}`);
            setContent(res.data);
        } catch {
            console.log("Lỗi");
        }
    };

    useEffect(() => {
        if (id) getContent();
    }, [id]);

    return (
        <div>
            <div className='container pt-10 mt-10'>
                <h1 className='text-3xl font-semibold'>Khám phá Tours</h1>
                {content && <BlogContentCard item={content} />}
            </div>
        </div>
    );
};

export default BlogContent;
