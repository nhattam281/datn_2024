import React from 'react';
import { Outlet } from 'react-router-dom';
import AccoundManagerSidebar from '../containers/private/AccoundManagerSidebar';
import AccountManageHeader from '../containers/private/AccountManageHeader';

function PrivateLayout() {
    return (
        <div className='w-screen h-screen flex flex-col bg-primary'>
            <AccountManageHeader />
            <div className='w-full h-[calc(100%-48px)] flex'>
                <AccoundManagerSidebar />
                <Outlet />
            </div>
        </div>
    );
}

export default PrivateLayout;
