import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { currentUserSelector } from '../redux/selectors/currentUserSelector';
import authSlice from '../redux/slices/authSlice';
import currentUserSlice from '../redux/slices/currentUserSlice';
import { path } from '../utils/constant';
import icons from '../utils/icons';

const Sidebar = () => {
    const currentUser = useSelector(currentUserSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(authSlice.actions.logout());
        dispatch(currentUserSlice.actions.currentUserLogout());
        navigate(path.HOME);
    };

    return (
        <div className='w-64 p-2 fixed text-white top-16 bottom-0 bg-main flex flex-col border-r border-main'>
            <NavLink
                to={path.CATEGORY}
                className={({ isActive }) =>
                    clsx(
                        'flex items-center hover:bg-[#2a303d] px-4 py-3 gap-2 rounded',
                        isActive ? 'bg-[#2a303d]' : ''
                    )
                }
            >
                <icons.TbCategoryPlus size={20} />
                Danh mục
            </NavLink>

            {currentUser?.role == 'SUPER_ADMIN' && (
                <>
                    <div className='uppercase px-4 py-3 mt-4 text-xs text-sidebar_title'>
                        Admin
                    </div>
                    <NavLink
                        to={path.ADMIN_ACCOUNT}
                        className={({ isActive }) =>
                            clsx(
                                'flex items-center hover:bg-[#2a303d] px-4 py-3 gap-2 rounded',
                                isActive ? 'bg-[#2a303d]' : ''
                            )
                        }
                    >
                        <icons.FaUserSecret size={20} />
                        Tài khoản admin
                    </NavLink>
                </>
            )}
            <div className='uppercase px-4 py-3 mt-4 text-xs text-sidebar_title'>
                Users
            </div>
            <NavLink
                to={path.USERS}
                className={({ isActive }) =>
                    clsx(
                        'flex items-center hover:bg-[#2a303d] px-4 py-3 gap-2 rounded',
                        isActive ? 'bg-[#2a303d]' : ''
                    )
                }
            >
                <icons.FaUsersRectangle size={20} />
                Người dùng
            </NavLink>
            <NavLink
                to={path.USERS_BLOCK}
                className={({ isActive }) =>
                    clsx(
                        'flex items-center hover:bg-[#2a303d] px-4 py-3 gap-2 rounded',
                        isActive ? 'bg-[#2a303d]' : ''
                    )
                }
            >
                <icons.SiAdblock size={20} />
                Người dùng đã khóa
            </NavLink>
            <NavLink
                to={path.USERS_RECOMMEND}
                className={({ isActive }) =>
                    clsx(
                        'flex items-center hover:bg-[#2a303d] px-4 py-3 gap-2 rounded',
                        isActive ? 'bg-[#2a303d]' : ''
                    )
                }
            >
                <icons.MdRecommend size={20} />
                Bài đăng đã lưu
            </NavLink>
            <div className='uppercase px-4 py-3 mt-4 text-xs text-sidebar_title'>
                Posts
            </div>
            <NavLink
                to={path.POST}
                className={({ isActive }) =>
                    clsx(
                        'flex items-center hover:bg-[#2a303d] px-4 py-3 gap-2 rounded',
                        isActive ? 'bg-[#2a303d]' : ''
                    )
                }
            >
                <icons.FaUsersRectangle size={20} />
                Bài đăng
            </NavLink>
            <NavLink
                to={path.POST_BLOCK}
                className={({ isActive }) =>
                    clsx(
                        'flex items-center hover:bg-[#2a303d] px-4 py-3 gap-2 rounded',
                        isActive ? 'bg-[#2a303d]' : ''
                    )
                }
            >
                <icons.TbLockSquareRoundedFilled size={20} />
                Bài đăng đã khóa
            </NavLink>
            <button
                className='flex items-center mt-auto hover:bg-[#2a303d] px-4 py-3 gap-2 rounded'
                onClick={handleLogout}
            >
                <icons.LuLogOut color='' size={20} />
                Đăng xuất
            </button>
        </div>
    );
};

export default Sidebar;
