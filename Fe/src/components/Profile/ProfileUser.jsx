import React from 'react';
import ProfileImg from './ProfileImg';
import ProfileInformation from './ProfileInformation';

const ProfileUser = () => {
    return (
        <div className='pt-20'>
            <div className='container'>
                <div className='flex gap-10 pt-10 mt-10'>
                    <div className='w-2/6'>
                        <ProfileImg />
                    </div>
                    <div className='w-2/3'>
                        <ProfileInformation />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileUser;