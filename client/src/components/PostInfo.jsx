import dayjs from 'dayjs';
import React from 'react';
import { convertCurrency } from '../utils/convertCurrency';
import icons from '../utils/icons';

const PostInfo = ({ postInfo }) => {
    const displayGender = (postGender) => {
        if (postGender === null || postGender === undefined) {
            return 'Tất cả';
        } else if (postGender.toLowerCase() === 'male') {
            return 'Nam';
        } else if (postGender.toLowerCase() === 'female') {
            return 'Nữ';
        } else {
            return 'Tất cả'; // Trường hợp giá trị gender không hợp lệ
        }
    };

    return (
        <div className='w-full flex flex-col gap-4 bg-white p-6 rounded-b border border-solid'>
            <h1 className='text-2xl text-[#E13427] font-bold'>
                {postInfo?.title}
            </h1>
            <div className='w-full flex items-center flex-wrap text-sm gap-1'>
                <icons.FaLocationDot color='blue' size={16} />
                <span>Địa chỉ:</span>
                <span>{postInfo?.address},</span>
                <span>{postInfo?.ward?.name},</span>
                <span>{postInfo?.district?.name},</span>
                <span>{postInfo?.province?.name}</span>
            </div>
            <div className='w-full flex gap-4'>
                <p className='flex gap-2 text-xl font-bold text-green-500 items-center'>
                    <icons.IoMdPricetags />
                    {`${convertCurrency(postInfo?.price)}/tháng`}
                </p>
                <p className='flex items-center'>
                    <icons.BiArea className='mr-2' />
                    {postInfo?.area}m<sup>2</sup>
                </p>
                <p className='flex gap-2 items-center'>
                    <icons.AiOutlineBorderlessTable />
                    {postInfo?.id}
                </p>
            </div>
            <div className='w-full flex flex-col gap-4'>
                <h2 className='text-xl font-bold'>Thông tin mô tả</h2>
                <p>{postInfo?.desc}</p>
            </div>
            <div className='w-full flex flex-col gap-4'>
                <h2 className='text-xl font-bold'>Đặc điểm tin đăng</h2>
                <div className='w-full flex flex-col'>
                    <div className='w-full flex py-2 bg-[#f5f5f5]'>
                        <span className='w-1/3'>Mã tin:</span>
                        <p className='flex-1'>#{postInfo?.id}</p>
                    </div>
                    <div className='w-full flex py-2'>
                        <span className='w-1/3'>Loại tin:</span>
                        <p className='flex-1'>{postInfo?.category?.name}</p>
                    </div>
                    <div className='w-full flex py-2 bg-[#f5f5f5]'>
                        <span className='w-1/3'>Khu vực:</span>
                        <p className='flex-1'>{postInfo?.province?.name}</p>
                    </div>
                    <div className='w-full flex py-2'>
                        <span className='w-1/3'>Đối tượng cho thuê:</span>
                        <p className='flex-1'>
                            {`${displayGender(postInfo?.gender)}`}
                        </p>
                    </div>
                    <div className='w-full flex py-2 bg-[#f5f5f5]'>
                        <span className='w-1/3'>Ngày đăng:</span>
                        <p className='flex-1'>
                            {dayjs(postInfo?.createdAt).format(
                                'DD-MM-YYYY HH:mm:ss'
                            )}
                        </p>
                    </div>
                    <div className='w-full flex py-2'>
                        <span className='w-1/3'>Ngày hết hạn:</span>
                        <p className='flex-1'>
                            {dayjs(postInfo?.expiresAt).format(
                                'DD-MM-YYYY HH:mm:ss'
                            )}
                        </p>
                    </div>
                </div>
            </div>
            <div className='w-full flex flex-col gap-4'>
                <h2 className='text-xl font-bold'>Thông tin liên hệ</h2>
                <div className='w-full flex flex-col'>
                    <div className='w-full flex py-2 bg-[#f5f5f5]'>
                        <span className='w-1/3'>Email:</span>
                        <p className='flex-1'>{postInfo?.user?.email}</p>
                    </div>
                    <div className='w-full flex py-2'>
                        <span className='w-1/3'>Điện thoại:</span>
                        <p className='flex-1'>{postInfo?.user?.phoneNumber}</p>
                    </div>
                    <div className='w-full flex py-2 bg-[#f5f5f5]'>
                        <span className='w-1/3'>Facebook:</span>
                        <p className='flex-1'>{postInfo?.user?.facebook}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostInfo;
