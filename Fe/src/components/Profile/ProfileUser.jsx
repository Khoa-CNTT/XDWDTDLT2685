import React, { useEffect, useState } from 'react';
import ProfileImg from './ProfileImg';
import ProfileInformation from './ProfileInformation';
import { getAllProfile } from '../../services/profile';
import { toast } from 'react-toastify';

const ProfileUser = () => {
    const [profile, setProfile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const userId = localStorage.getItem("user_id");
                console.log(userId)
                const res = await getAllProfile(userId);
                setProfile(res.data);
                console.log(res)
                if (res.data?.avatar_path) {
                    localStorage.setItem("avatar", res.data.avatar_path);
                }
            } catch (err) {
                toast.error("Lỗi kết nối server");
            }
        };
        getProfile();
    }, []);

    return (
        <div className='pt-20'>
            <div className='container'>
                <div className='flex gap-10 pt-10 mt-10'>
                    <div className='w-2/6'>
                        <ProfileImg avatar={profile?.avatar_path} setSelectedFile={setSelectedFile} />
                    </div>
                    <div className='w-2/3'>
                        {profile && <ProfileInformation profile={profile} setSelectedFile={setSelectedFile} selectedFile={selectedFile} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileUser;
