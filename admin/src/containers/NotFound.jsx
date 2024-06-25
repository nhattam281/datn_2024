import React from 'react';
import { NavLink } from 'react-router-dom';
import { path } from '../utils/constant';
import icons from '../utils/icons';

const NotFound = () => {
    return (
        <div className='w-full h-screen text-white flex justify-center bg-notfound bg-cover'>
            <div className='w-full py-[80px] flex flex-col items-center gap-10'>
                <p className='text-xl font-bold '>404</p>
                <h1 className='text-5xl font-bold'>Page not found</h1>
                <p className='text-lg'>
                    Sorry, we couldn't find the page you're looking for.
                </p>
                <NavLink to={path.HOME} className={'flex'}>
                    <icons.IoIosArrowRoundBack className='w-[24px] h-[24px] mr-2' />
                    Back to home
                </NavLink>
            </div>
        </div>
    );
};

export default NotFound;
