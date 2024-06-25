import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Footer from '../components/Footer';
import ImageSlider from '../components/ImageSlider';
import {
    apiGetPostById,
    apiUnBlockPost,
    apiUpdatePost,
} from '../services/posts';
import { convertCurrency } from '../utils/convertCurrency';
import { displayGender } from '../utils/displayGender';
import icons from '../utils/icons';

const PostDetail = () => {
    const params = useParams();
    // const dispatch = useDispatch();
    const postId = params.postId;
    const [postInfo, setPostInfo] = useState({});

    const handleUnblockPost = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Bạn chắc chắn muốn mở khóa bài đăng này?`,
            icon: 'warning',
            background: '#333',
            color: '#fff',
            confirmButtonColor: '#1266dd',
            showDenyButton: true,
            denyButtonText: 'Deny',
            denyButtonColor: '#e81b1b',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await apiUnBlockPost(postInfo.id);
                    console.log(res);
                    // res &&
                    Swal.fire({
                        title: 'Success...',
                        text: 'Mở khóa bài đăng thành công!',
                        icon: 'success',
                        confirmButtonColor: '#1266dd',
                        background: '#333',
                        color: '#fff',
                        confirmButtonColor: '#333',
                    });
                } catch (error) {
                    console.log(error);
                    error &&
                        Swal.fire({
                            title: 'Oops...',
                            text: error.message,
                            icon: 'error',
                            confirmButtonColor: '#1266dd',
                            background: '#333',
                            color: '#fff',
                            confirmButtonColor: '#333',
                        });
                }
            } else if (result.isDenied) {
                Swal.fire({
                    title: 'Cancelled!',
                    text: 'Không có gì thay đổi!',
                    icon: 'error',
                    color: '#fff',
                    background: '#333',
                });
            }
        });
    };
    const handleBlockPost = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Bạn chắc chắn muốn khóa bài đăng này?`,
            icon: 'warning',
            background: '#333',
            color: '#fff',
            confirmButtonColor: '#1266dd',
            showDenyButton: true,
            denyButtonText: 'Deny',
            denyButtonColor: '#e81b1b',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await apiUpdatePost(postInfo.id);
                    console.log(res);
                    // res &&
                    Swal.fire({
                        title: 'Success...',
                        text: 'Khóa bài đăng thành công!',
                        icon: 'success',
                        confirmButtonColor: '#1266dd',
                        background: '#333',
                        color: '#fff',
                        confirmButtonColor: '#333',
                    });
                } catch (error) {
                    console.log(error);
                    error &&
                        Swal.fire({
                            title: 'Oops...',
                            text: error.message,
                            icon: 'error',
                            confirmButtonColor: '#1266dd',
                            background: '#333',
                            color: '#fff',
                            confirmButtonColor: '#333',
                        });
                }
            } else if (result.isDenied) {
                Swal.fire({
                    title: 'Cancelled!',
                    text: 'Không có gì thay đổi!',
                    icon: 'error',
                    color: '#fff',
                    background: '#333',
                });
            }
        });
    };

    useEffect(() => {
        const fetchPostById = async () => {
            const res = await apiGetPostById(postId);
            if (res) {
                setPostInfo(res);
            }
            console.log(res);
        };
        fetchPostById();
    }, []);

    return (
        <div className='text-white flex-grow flex flex-col ml-64 overflow-y-auto bg-primary'>
            <div className='w-full px-6 py-4 flex items-center bg-main border-b border-main'>
                <h1>Thông tin bài đăng</h1>
            </div>
            <div className='p-6'>
                <div className='rounded overflow-hidden bg-main'>
                    <div className='flex min-h-80 justify-center items-center p-4 bg-[#282d37]'>
                        <ImageSlider slides={postInfo?.postImages} />
                    </div>
                    <div className='w-full flex flex-col items-center justify-center p-6 gap-10'>
                        <div className='w-full flex flex-col gap-4'>
                            <h1 className='text-2xl text-red-500 font-bold'>
                                {postInfo?.title}
                            </h1>
                            <div className='w-full flex items-center gap-2'>
                                <icons.FaLocationDot color='blue' size={24} />
                                <span>Địa chỉ:</span>
                                <span>{postInfo?.address},</span>
                                <span>{postInfo?.ward?.name},</span>
                                <span>{postInfo?.district?.name},</span>
                                <span>{postInfo?.province?.name}</span>
                            </div>
                            <div className='w-full flex gap-4'>
                                <p className='flex gap-2 text-xl font-bold text-green-500 items-center'>
                                    <icons.IoMdPricetags />
                                    {`${convertCurrency(
                                        postInfo?.price
                                    )}/tháng`}
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
                        </div>
                        <div className='w-full flex flex-col gap-4'>
                            <h2 className='text-xl font-bold'>
                                Thông tin mô tả
                            </h2>
                            <p>{postInfo?.desc}</p>
                        </div>
                        <div className='w-full flex flex-col gap-4'>
                            <h2 className='text-xl font-bold'>
                                Đặc điểm tin đăng
                            </h2>
                            <div className='w-full flex flex-col'>
                                <div className='w-full flex py-2 bg-[#282d37]'>
                                    <span className='w-1/3'>Mã tin:</span>
                                    <p className='flex-1'>#{postInfo?.id}</p>
                                </div>
                                <div className='w-full flex py-2'>
                                    <span className='w-1/3'>Loại tin:</span>
                                    <p className='flex-1'>
                                        {postInfo?.category?.name}
                                    </p>
                                </div>
                                <div className='w-full flex py-2 bg-[#282d37]'>
                                    <span className='w-1/3'>Khu vực:</span>
                                    <p className='flex-1'>
                                        {postInfo?.province?.name}
                                    </p>
                                </div>
                                <div className='w-full flex py-2'>
                                    <span className='w-1/3'>
                                        Đối tượng cho thuê:
                                    </span>
                                    <p className='flex-1'>{`${displayGender(
                                        postInfo?.gender
                                    )}`}</p>
                                </div>
                                <div className='w-full flex py-2 bg-[#282d37]'>
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
                            <h2 className='text-xl font-bold'>
                                Thông tin liên hệ
                            </h2>
                            <div className='w-full flex flex-col'>
                                <div className='w-full flex py-2 bg-[#282d37]'>
                                    <span className='w-1/3'>Email:</span>
                                    <p className='flex-1'>
                                        {postInfo?.user?.email}
                                    </p>
                                </div>
                                <div className='w-full flex py-2'>
                                    <span className='w-1/3'>Điện thoại:</span>
                                    <p className='flex-1'>
                                        {postInfo?.user?.phoneNumber}
                                    </p>
                                </div>
                                <div className='w-full flex py-2 bg-[#282d37]'>
                                    <span className='w-1/3'>Facebook:</span>
                                    <p className='flex-1'>
                                        {postInfo?.user?.facebook}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex gap-4 justify-end'>
                            {postInfo?.isBlock ? (
                                <button
                                    className='flex gap-2 px-4 py-2 justify-center items-center bg-green-500 rounded-md'
                                    onClick={handleUnblockPost}
                                >
                                    <icons.CgUnblock size={24} />
                                    Gỡ khóa bài đăng
                                </button>
                            ) : (
                                <button
                                    className='flex gap-2 px-4 py-2 justify-center items-center bg-rose-500 rounded-md'
                                    onClick={handleBlockPost}
                                >
                                    <icons.ImBlocked size={20} />
                                    Khóa bài đăng
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PostDetail;
