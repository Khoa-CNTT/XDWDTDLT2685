import React from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import { Link } from 'react-router-dom';

const Button = ({ to, text, width, icon = true, color = "primary", rounded = true }) => {
    const colors = {
        primary: "bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary",
        orange: "bg-orange-500",
    };

    return (
        <div className='flex mt-8'>
            <Link
                onClick={() => window.scrollTo(0, 0)}
                to={to}
                type="button"
                className={`relative inline-flex items-center text-lg justify-center font-semibold w-full ${width} px-6 py-3 text-white transition-all duration-600 gap-2 ${colors[color]} ${rounded ? 'rounded-full' : 'rounded-lg'}`}
            >
                {text} {icon && <GoArrowUpRight size={20} />}
            </Link>
        </div>
    );
};

export default Button;
