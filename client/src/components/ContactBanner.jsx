import React from 'react';
import { NavLink } from 'react-router-dom';
import supportImg from '../assets/support-bg.jpg';
import { path } from '../utils/constant';

function ContactBanner() {
    return (
        <div className='w-full flex items-center justify-center my-10'>
            <div className='w-[1100px] flex flex-col items-center justify-center px-20 py-10 rounded-md shadow-md bg-white border-8 border-dashed border-[#e8eefc]'>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <img src={supportImg} alt='' className='w-1/2' />
                    <h2 className='text-xl'>
                        Liên hệ với chúng tôi nếu bạn cần hỗ trợ:
                    </h2>
                    <strong>Điện thoại: 0123456789</strong>
                    <strong>Zalo: 0123456789</strong>
                </div>
                <div className='inline-flex items-center justify-center w-full my-10'>
                    <hr className='w-64 h-[2px] my-8 bg-[#8a8d91] border-0 rounded'></hr>
                    <span className='absolute px-3 font-medium text-[#8a8d91] -translate-x-1/2 bg-white left-1/2'>
                        hoặc
                    </span>
                </div>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <h2 className='text-xl font-semibold'>
                        Bạn đang có phòng trọ / căn hộ cho thuê?
                    </h2>
                    <p>Không phải lo tìm người cho thuê, phòng trống kéo dài</p>
                    <NavLink
                        to={`${path.ACCOUNT}/${path.CREATE_POST}`}
                        className={
                            'bg-tertiary text-white px-4 py-2 rounded-md'
                        }
                    >
                        Đăng tin ngay
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default ContactBanner;
