import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import { path } from '../utils/constant';
import { useDispatch } from 'react-redux';
import authSlice from '../redux/slices/authSlice';
import userSlice from '../redux/slices/userSlice';
import { path } from '../utils/constant';
import icons from '../utils/icons';

function AccountDropdown() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(authSlice.actions.logout());
        dispatch(userSlice.actions.userLogout());
        navigate(path.LOGIN);
    };

    return (
        <div className='absolute top-[100%] right-0 shadow-2xl z-50 border border-solid rounded-md bg-white'>
            <div className='flex flex-col justify-center px-5 py-4'>
                <NavLink
                    to={`${path.ACCOUNT}/${path.CREATE_POST}`}
                    className={
                        'py-2 flex items-center gap-2 hover:text-red-400 text-[#1266dd]'
                    }
                >
                    <icons.FcAdvertising className='w-[16px] h-[16px]' />
                    Đăng tin cho thuê
                </NavLink>
                <hr className='h-px bg-gray-200 border-0'></hr>
                <NavLink
                    to={`${path.ACCOUNT}/${path.POSTS_MANAGEMENT}`}
                    className={
                        'py-2 flex items-center gap-2 hover:text-red-400 text-[#1266dd]'
                    }
                >
                    <icons.FcFinePrint className='w-[16px] h-[16px]' />
                    Quản lý tin đăng
                </NavLink>
                <hr className='h-px bg-gray-200 border-0'></hr>
                <NavLink
                    to={`${path.ACCOUNT}/${path.PROFILE}`}
                    className={
                        'py-2 flex items-center gap-2 hover:text-red-400 text-[#1266dd]'
                    }
                >
                    <icons.FcGallery className='w-[16px] h-[16px]' />
                    Thông tin cá nhân
                </NavLink>
                <hr className='h-px bg-gray-200 border-0'></hr>
                <NavLink
                    to={`${path.ACCOUNT}/${path.LIKE}`}
                    className={
                        'py-2 flex items-center gap-2 hover:text-red-400 text-[#1266dd]'
                    }
                >
                    <icons.FcLike className='w-[16px] h-[16px]' />
                    Tin đã lưu
                </NavLink>
                <hr className='h-px bg-gray-200 border-0'></hr>
                <button
                    className={
                        'py-2 flex items-center gap-2 hover:text-red-400 text-[#1266dd]'
                    }
                    onClick={handleLogout}
                >
                    <icons.FcAdvance className='w-[16px] h-[16px]' />
                    Thoát
                </button>
            </div>
        </div>
    );
}

export default AccountDropdown;
