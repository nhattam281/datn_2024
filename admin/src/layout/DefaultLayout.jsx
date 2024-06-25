import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const DefaultLayout = () => {
    return (
        <div className='w-full h-full'>
            <Header />
            <div className='w-full h-[calc(100%-64px)] flex'>
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
};

export default DefaultLayout;
