import React, { useEffect, useState } from 'react';
import ProfileImg from './ProfileImg';
import ProfileInformation from './ProfileInformation';
import { getAllProfile } from '../../services/profile';
import { toast } from 'react-toastify';

const ProfileUser = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const userId = localStorage.getItem("user_id");
                console.log(userId)
                const res = await getAllProfile(userId);
                setProfile(res);
                console.log(res)
            } catch (err) {
                toast.error("Lỗi kết nối server");
                console.log("Lỗi khi lấy thông tin", err);
            }
        };
        getProfile();
    }, []);

    return (
        <div className='pt-20'>
            <div className='container'>
                <div className='flex gap-10 pt-10 mt-10'>
                    <div className='w-2/6'>
                        <ProfileImg avatar={profile?.avatar_path} />
                    </div>
                    <div className='w-2/3'>
                    {profile && <ProfileInformation profile={profile} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileUser;
