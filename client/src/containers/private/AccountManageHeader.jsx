import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { categorySelector } from '../../redux/selectors/categorySelector';
import { path } from '../../utils/constant';
import { formatVietnameseToString } from '../../utils/formatVietnameseToString';

function AccountManageHeader() {
    const category = useSelector(categorySelector);

    const navigate = useNavigate();
    const navigateHome = () => {
        navigate(path.HOME);
    };

    return (
        <div className='w-full h-12 px-4 flex items-center sticky z-10 top-0 text-white bg-[#055699]'>
            <h1
                className='w-1/5 font-bold cursor-pointer'
                onClick={navigateHome}
            >
                PhongtroUTC2.com
            </h1>
            <div className='flex flex-1 items-center gap-4'>
                {category?.length > 0 &&
                    category.map((item) => {
                        return (
                            <NavLink
                                to={`/${formatVietnameseToString(item.name)}`}
                                key={item.id}
                                className={
                                    'hover:text-[#f90] h-full flex items-center justify-center px-2 text-sm'
                                }
                            >
                                {item.name}
                            </NavLink>
                        );
                    })}
            </div>
        </div>
    );
}

export default AccountManageHeader;
