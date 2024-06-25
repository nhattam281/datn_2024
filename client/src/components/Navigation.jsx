import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { categorySelector } from '../redux/selectors/categorySelector';
import { getCategory } from '../redux/slices/categorySlice';
import { path } from '../utils/constant';
import { formatVietnameseToString } from '../utils/formatVietnameseToString';

function Navigation() {
    const category = useSelector(categorySelector);

    return (
        <div className='w-full h-10 flex justify-center items-center text-white bg-secondary'>
            <div className='w-[1116px] h-full flex items-center'>
                <NavLink
                    to={path.HOME}
                    className={({ isActive }) =>
                        clsx(
                            'hover:bg-tertiary h-full flex items-center justify-center px-3',
                            isActive ? 'bg-tertiary' : ''
                        )
                    }
                >
                    Trang chủ
                </NavLink>
                {category?.length > 0 &&
                    category.map((item) => {
                        return (
                            <NavLink
                                to={`${formatVietnameseToString(item.name)}`}
                                key={item.id}
                                className={({ isActive }) =>
                                    clsx(
                                        'hover:bg-tertiary h-full flex items-center justify-center px-3',
                                        isActive ? 'bg-tertiary' : ''
                                    )
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

export default Navigation;
