import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import defaultUserImg from '../../assets/default_user.png';
import { currentUserSelector } from '../../redux/selectors/currentUserSelector';
import authSlice from '../../redux/slices/authSlice';
import userSlice from '../../redux/slices/userSlice';
import { path } from '../../utils/constant';
import icons from '../../utils/icons';

function AccoundManagerSidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector(currentUserSelector);

    const handleLogout = () => {
        dispatch(authSlice.actions.logout());
        dispatch(userSlice.actions.userLogout());
        navigate(path.HOME);
    };

    const handleAddNewPost = () => {
        navigate(`${path.ACCOUNT}/${path.CREATE_POST}`);
    };

    return (
        <div className='w-[272px] fixed top-12 flex flex-col gap-2 items-center bottom-0 p-5'>
            <div className='w-full flex gap-4'>
                <div className='w-14 h-14 rounded-full flex items-center justify-center overflow-hidden bg-blue-400'>
                    <img
                        src={
                            currentUser?.avatar
                                ? currentUser?.avatar
                                : defaultUserImg
                        }
                        alt='user'
                        className='w-14 h-14 object-cover cursor-pointer'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <span>
                        <strong>{currentUser?.name}</strong>
                    </span>
                    <span className='font-light'>
                        {currentUser?.phoneNumber}
                    </span>
                </div>
            </div>
            <div className='w-full'>
                <p>
                    Mã tài khoản: <strong>#{currentUser?.id}</strong>
                </p>
                <button
                    className='py-2 mt-2 mb-4 w-1/2 bg-tertiary text-white rounded-md'
                    onClick={handleAddNewPost}
                >
                    Đăng tin
                </button>
            </div>
            <div className='w-full flex flex-col justify-center'>
                <NavLink
                    to={`${path.ACCOUNT}/${path.POSTS_MANAGEMENT}`}
                    className={({ isActive }) =>
                        clsx(
                            'py-2 px-2 -ml-2 flex gap-3 items-center hover:bg-slate-200 rounded-md',
                            isActive ? 'font-semibold' : ''
                        )
                    }
                >
                    <icons.BsPostcard />
                    Quản lý tin đăng
                </NavLink>
                <NavLink
                    to={`${path.ACCOUNT}/${path.PROFILE}`}
                    className={({ isActive }) =>
                        clsx(
                            'py-2 px-2 -ml-2 flex gap-3 items-center hover:bg-slate-200 rounded-md',
                            isActive ? 'font-semibold' : ''
                        )
                    }
                >
                    <icons.CgProfile />
                    Sửa thông tin cá nhân
                </NavLink>
                <NavLink
                    to={`${path.ACCOUNT}/${path.LIKE}`}
                    className={({ isActive }) =>
                        clsx(
                            'py-2 px-2 -ml-2 flex gap-3 items-center hover:bg-slate-200 rounded-md',
                            isActive ? 'font-semibold' : ''
                        )
                    }
                >
                    <icons.FaRegHeart />
                    Tin đã lưu
                </NavLink>
                <button
                    className={
                        'py-2 px-2 -ml-2 flex gap-3 items-center hover:bg-slate-200 rounded-md'
                    }
                    onClick={handleLogout}
                >
                    <icons.RiLogoutCircleRLine />
                    Thoát
                </button>
            </div>
        </div>
    );
}

export default AccoundManagerSidebar;
