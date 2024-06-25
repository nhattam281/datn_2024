import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../containers/public/Footer';
import Header from '../containers/public/Header';

function NonSidebarLayout() {
    return (
        <div className='w-full flex flex-col items-center'>
            <Header />
            <Navigation />
            <div className='w-full flex justify-center p-3'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default NonSidebarLayout;
