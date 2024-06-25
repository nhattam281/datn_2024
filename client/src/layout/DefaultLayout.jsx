import React from 'react';
import { Outlet } from 'react-router-dom';
import BannerLocation from '../components/BannerLocation';
import ContactBanner from '../components/ContactBanner';
import Navigation from '../components/Navigation';
import SearchPanel from '../components/SearchPanel';
import Footer from '../containers/public/Footer';
import Header from '../containers/public/Header';
import Sidebar from '../containers/public/Sidebar';

function DefaultLayout() {
    return (
        <div className='w-full m-auto'>
            <Header />
            <Navigation />
            {/* <SearchPanel /> */}
            <div className='w-full flex justify-center p-3'>
                <div className='w-[1100px] flex flex-col'>
                    <div className='w-full flex justify-center'>
                        <h1 className='text-[28px] font-bold'>
                            Tìm kiếm chỗ thuê ưng ý
                        </h1>
                    </div>
                    <p className='text-base text-gray-700'>
                        Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn
                        hộ, ở ghép nhanh, hiệu quả.
                    </p>
                </div>
            </div>
            <BannerLocation />
            <div className='w-full flex justify-center p-3'>
                <div className='w-[1100px] flex gap-4'>
                    <Outlet />
                    <Sidebar />
                </div>
            </div>
            <ContactBanner />
            <Footer />
        </div>
    );
}

export default DefaultLayout;
