import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { postsSavedSelector } from '../redux/selectors/postsSelector';
import { getListPost, getListPostSave } from '../redux/slices/postsSlice';
import { apiGetUserById } from '../services/user';
import { path } from '../utils/constant';

const UserDetailRecommend = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const userId = params.userId;
    const [userInfo, setUserInfo] = useState({});
    // const postsSaved = useSelector(postsSavedSelector);

    useEffect(() => {
        const fetchUserById = async () => {
            const res = await apiGetUserById(userId);
            if (res) {
                setUserInfo(res);
            }
            console.log(res);
        };
        fetchUserById();
    }, []);

    useEffect(() => {
        dispatch(getListPostSave({ userId }));
    }, []);
    return (
        <div className='text-white flex-grow flex flex-col ml-64 overflow-y-auto bg-primary'>
            <div className='w-full px-6 py-4 flex items-center bg-main border-b border-main'>
                <h1>Thông tin người dùng</h1>
            </div>
            <div className='p-6'>
                <div className='rounded overflow-hidden bg-main'>
                    <div className='flex justify-center flex-col gap-12 px-4 py-10 bg-[#282d37]'>
                        <div className='flex justify-center gap-20'>
                            <div className='flex items-center justify-center'>
                                <div className='w-32 h-32'>
                                    <img
                                        src={userInfo.avatar}
                                        alt=''
                                        className='w-32 h-32 rounded-full'
                                    />
                                </div>
                            </div>
                            <div className='flex justify-center gap-20'>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex gap-2'>
                                        <strong>id:</strong>
                                        <span>{userInfo.id}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <strong>email:</strong>
                                        <span>{userInfo.email}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <strong>Họ tên:</strong>
                                        <span>{userInfo.name}</span>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex gap-2'>
                                        <strong>Số điện thoại:</strong>
                                        <span>{userInfo.phoneNumber}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <strong>Zalo:</strong>
                                        <span>{userInfo.zaloPhoneNumber}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <strong>Facebook link:</strong>
                                        <span>{userInfo.facebook}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex items-center justify-center gap-4'>
                            <NavLink
                                to={path.USER_POST_SAVED}
                                className={({ isActive }) =>
                                    clsx(
                                        'border-b-2 border-transparent hover:border-white',
                                        isActive ? 'border-white' : ''
                                    )
                                }
                            >
                                Tin đã lưu
                            </NavLink>
                            {/* <NavLink
                                to={path.USERS_POST_RECOMMEND}
                                className={({ isActive }) =>
                                    clsx(
                                        'border-b-2 border-transparent hover:border-white',
                                        isActive ? 'border-white' : ''
                                    )
                                }
                            >
                                Tin được gợi ý
                            </NavLink> */}
                        </div>
                    </div>
                    <div className='w-full flex items-center justify-center py-6 px-4'>
                        <Outlet userId={userId} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserDetailRecommend;
