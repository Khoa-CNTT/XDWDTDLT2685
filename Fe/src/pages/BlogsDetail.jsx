import React from 'react';
import { useLocation } from 'react-router-dom'
import Places from '../components/Places/Places';
import BlogDetail from '../components/BlogDetail/BlogDetail';
const BlogsDetail = () => {
    const location = useLocation();
    console.log(location, useLocation)

    return (
        <div className='pt-20 dark:bg-[#101828] dark:text-white'>
            <BlogDetail />
            <Places title="Những Tour tương tự" />
        </div>
       
    );
};

export default BlogsDetail;