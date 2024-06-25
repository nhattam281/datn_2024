import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { currentUserSelector } from '../redux/selectors/currentUserSelector';
import { path } from '../utils/constant';

const Header = () => {
    const currentUser = useSelector(currentUserSelector);
    return (
        <div className='w-full flex items-center h-16 sticky z-10 top-0 bg-main border-b border-main text-white'>
            <NavLink
                to={path.HOME}
                className={
                    'flex w-64 h-full pl-4 border-r border-main items-center'
                }
            >
                <h1 className='text-logo_primary text-lg flex-1 font-logo font-bold text-center uppercase'>
                    Phongtro
                </h1>
                <h1 className='text-logo_secondary text-lg flex-1 font-logo font-bold uppercase'>
                    UTC2
                </h1>
            </NavLink>
            <div className='flex-1 h-full px-6 flex justify-end items-center gap-4'>
                <span>{currentUser?.name}</span>
                <span>|</span>
                <span>{currentUser?.role.replace('_', ' ')}</span>
            </div>
        </div>
    );
};

export default Header;
