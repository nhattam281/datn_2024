import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import defaultUserImg from '../../assets/default_user.png';
import AccountDropdown from '../../components/AccountDropdown';
import { authIsLogginSelector } from '../../redux/selectors/authSelector';
import { currentUserSelector } from '../../redux/selectors/currentUserSelector';
import { getCurrentUser } from '../../redux/slices/userSlice';
import { path } from '../../utils/constant';
import icons from '../../utils/icons';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const goLogin = () => {
        navigate(path.LOGIN);
    };
    const goSignup = () => {
        navigate(path.SIGNUP);
    };
    const handleAddNewPost = (params) => {
        navigate(`${path.ACCOUNT}/${path.CREATE_POST}`);
    };

    // test đăng nhập
    const isLogin = useSelector(authIsLogginSelector);
    const currentUser = useSelector(currentUserSelector);

    // Account mamage dropdown
    const [dropdown, setDropdown] = useState(false);
    const menuRef = useRef();
    useEffect(() => {
        const handler = (event) => {
            if (!menuRef.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        };
    });
    // Account mamage dropdown

    return (
        <div className='w-full flex justify-center'>
            <div className='w-[1100px] flex justify-between'>
                <NavLink to={path.HOME} className={'flex'}>
                    <h1 className='h-[70px] text-primary text-xl font-logo font-bold text-center leading-[70px]'>
                        Phongtro
                    </h1>
                    <h1 className='h-[70px] text-secondary text-xl font-logo font-bold text-center leading-[70px]'>
                        UTC2
                    </h1>
                </NavLink>
                <div className='flex items-center justify-between gap-2'>
                    {isLogin && currentUser ? (
                        <div
                            className='flex items-center justify-between gap-2 relative'
                            ref={menuRef}
                        >
                            <div className='w-10 h-10 rounded-full overflow-hidden bg-blue-400'>
                                <img
                                    src={
                                        currentUser
                                            ? currentUser.avatar
                                            : defaultUserImg
                                    }
                                    alt='user'
                                    className='w-10 h-10 cursor-pointer'
                                />
                            </div>
                            <div className='flex flex-col justify-center'>
                                <span>
                                    Xin chào,
                                    <strong> {currentUser?.name || ''}</strong>
                                    {/* <strong>{name}</strong> */}
                                </span>
                                <span>
                                    Mã tài khoản:
                                    <strong> #{currentUser?.id || ''}</strong>
                                </span>
                            </div>
                            <button
                                className='px-4 py-2 hover:underline rounded-md flex items-center justify-center gap-1'
                                onClick={() => {
                                    setDropdown((prev) => !prev);
                                }}
                            >
                                <icons.AiOutlineAppstore className='w-[24px] h-[24px]' />
                                Quản lý tài khoản
                            </button>
                            {dropdown && <AccountDropdown />}
                        </div>
                    ) : (
                        <div className='flex items-center justify-between'>
                            <button
                                className='px-2 py-2 hover:underline rounded-md flex items-center justify-center gap-1'
                                onClick={goLogin}
                            >
                                <icons.RiLoginBoxLine className='w-[24px] h-[24px]' />
                                Đăng nhập
                            </button>
                            <button
                                className='px-2 py-2 hover:underline flex items-center justify-center gap-1 rounded-md'
                                onClick={goSignup}
                            >
                                <icons.IoPersonAddOutline className='w-[24px] h-[24px]' />
                                Đăng ký
                            </button>
                        </div>
                    )}
                    <button
                        className='px-2 py-2 text-white hover:underline rounded-md bg-tertiary flex items-center justify-center gap-1'
                        onClick={handleAddNewPost}
                    >
                        Đăng tin mới
                        <icons.AiOutlinePlusCircle className='w-[16px] h-[16px]' />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;
