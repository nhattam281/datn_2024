import React from 'react';
import { NavLink } from 'react-router-dom';
import { path } from '../../utils/constant';
import icons from '../../utils/icons';

function Footer() {
    return (
        <div className='w-full p-7 flex flex-col justify-center items-center bg-white'>
            <div className='w-[1100px] py-4 flex items-center justify-between '>
                <NavLink to={path.HOME} className={'flex'}>
                    <h1 className='h-[70px] text-primary text-xl font-logo font-bold text-center leading-[70px]'>
                        Phongtro
                    </h1>
                    <h1 className='h-[70px] text-secondary text-xl font-logo font-bold text-center leading-[70px]'>
                        UTC2
                    </h1>
                </NavLink>
                <div className='flex justify-end gap-3'>
                    <a
                        href='http://facebook.com'
                        className='hover:cursor-pointer'
                    >
                        <icons.AiOutlineFacebook className='w-[24px] h-[24px] ' />
                    </a>
                    <a
                        href='http://instagram.com'
                        className='hover:cursor-pointer'
                    >
                        <icons.FaInstagram className='w-[24px] h-[24px] ' />
                    </a>
                    <a
                        href='https://www.youtube.com'
                        className='hover:cursor-pointer'
                    >
                        <icons.TfiYoutube className='w-[24px] h-[24px] ' />
                    </a>
                    <a
                        href='https://github.com'
                        className='hover:cursor-pointer'
                    >
                        <icons.FaGithub className='w-[24px] h-[24px] ' />
                    </a>
                </div>
            </div>
            <hr className='w-[1100px] h-px bg-gray-200 border-0'></hr>
            <div className='w-[1100px] py-4 flex items-center justify-between text-sm'>
                <div className='flex items-center gap-x-3'>
                    <strong className='font-semibold'>
                        Copyright &#169; 2024 ntaam
                    </strong>
                    <span className='font-medium text-text1'>
                        Powered by @ntaam
                    </span>
                </div>
                <div className='flex items-center font-medium text-text1 gap-x-3 max-md:hidden'>
                    <p>Privacy policy</p>
                    <span className='w-[5px] h-[5px] rounded-full bg-text1 bg-opacity-30'></span>
                    <p>Affiliate Notice</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
