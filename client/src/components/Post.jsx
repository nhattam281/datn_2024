import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { postsSavedSelector } from '../redux/selectors/postsSelector';
import { getAllPostSaved, getAllPosts } from '../redux/slices/postSlice';
import { apiSavePost, apiUnSavePost } from '../services/post';
import { convertCurrency } from '../utils/convertCurrency';
import icons from '../utils/icons';

function Post({ post }) {
    const postsSaved = useSelector(postsSavedSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isSaved = postsSaved?.items.some((item) => item.id == post.id);

    //dayjs
    dayjs.extend(relativeTime);
    const postDate = dayjs(post?.createdAt).fromNow();

    dayjs.extend(updateLocale);
    dayjs.updateLocale('en', {
        relativeTime: {
            future: 'in %s',
            past: '%s trước',
            s: 'vài giây',
            m: '1 phút',
            mm: '%d phút',
            h: '1 giờ',
            hh: '%d giờ',
            d: '1 ngày',
            dd: '%d ngày',
            M: '1 tháng',
            MM: '%d tháng',
            y: '1 năm',
            yy: '%d năm',
        },
    });
    //dayjs

    const handleViewPostDetails = () => {
        navigate(`/${post.id}`);
    };

    const handleSavePost = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Bạn chắc chắn muốn lưu tin này?`,
            icon: 'warning',
            confirmButtonColor: '#1266dd',
            showDenyButton: true,
            denyButtonText: 'Deny',
            denyButtonColor: '#e81b1b',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await apiSavePost(post.id);
                    console.log(res);
                    // res &&
                    Swal.fire({
                        title: 'Success...',
                        text: 'Lưu bài đăng thành công!',
                        icon: 'success',
                        confirmButtonColor: '#1266dd',
                    }).then(() => {
                        dispatch(getAllPosts({}));
                        dispatch(getAllPostSaved({}));
                    });
                } catch (error) {
                    console.log(error);
                    error &&
                        Swal.fire({
                            title: 'Oops...',
                            text: error.message,
                            icon: 'error',
                            confirmButtonColor: '#1266dd',
                        });
                }
            } else if (result.isDenied) {
                Swal.fire({
                    title: 'Cancelled!',
                    text: 'Không có gì thay đổi!',
                    icon: 'error',
                });
            }
        });
    };
    const handleUnSavePost = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Bạn chắc chắn muốn bỏ lưu tin này?`,
            icon: 'warning',
            confirmButtonColor: '#1266dd',
            showDenyButton: true,
            denyButtonText: 'Deny',
            denyButtonColor: '#e81b1b',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await apiUnSavePost(post?.id);
                    console.log(res);
                    // res &&
                    Swal.fire({
                        title: 'Success...',
                        text: 'Bỏ lưu bài đăng thành công!',
                        icon: 'success',
                        confirmButtonColor: '#1266dd',
                    }).then(() => {
                        dispatch(getAllPosts({}));
                        dispatch(getAllPostSaved({}));
                    });
                } catch (error) {
                    console.log(error);
                    error &&
                        Swal.fire({
                            title: 'Oops...',
                            text: error.message,
                            icon: 'error',
                            confirmButtonColor: '#1266dd',
                        });
                }
            } else if (result.isDenied) {
                Swal.fire({
                    title: 'Cancelled!',
                    text: 'Không có gì thay đổi!',
                    icon: 'error',
                });
            }
        });
    };

    return (
        <div className='w-full py-4 flex gap-4 border-t border-[#3763e0] '>
            <div
                className={
                    'w-[170px] h-[160px] overflow-hidde cursor-pointer rounded-md'
                }
                onClick={handleViewPostDetails}
            >
                <img
                    src={post.postImages[0].image.url}
                    alt=''
                    className='w-full h-full object-cover'
                />
            </div>
            <div className='flex-1 flex flex-col justify-between'>
                <NavLink
                    to={`/${post.id}`}
                    className={'text-blue-700 uppercase font-medium'}
                >
                    <strong>{post.title}</strong>
                </NavLink>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <strong className='text-[#16c784]'>{`${convertCurrency(
                            post.price
                        )}/tháng`}</strong>
                        <span>
                            {post.area}m<sup>2</sup>
                        </span>
                        <span>{post.province.name}</span>
                    </div>
                    <span className='text-xs'>{postDate}</span>
                </div>
                <p className='max-h-14 max-w-[495px] line-clamp-3 text-sm text-[#8a8d91]'>
                    {post.desc}
                </p>
                <div className='flex items-center justify-between'>
                    <div className='flex gap-2 items-center rounded-full overflow-hidden'>
                        <img
                            src={post.user.avatar}
                            alt='user'
                            className='w-[30px] h-[30px] rounded-full object-cover cursor-pointer'
                        />
                        <p className='text-[#8a8d91]'>{post.user.name}</p>
                    </div>

                    <button
                        className={`rounded-md p-2 text-[#8a8d91] ${
                            isSaved ? 'text-red-600' : ''
                        } hover:text-red-600 flex items-center gap-2`}
                        onClick={!isSaved ? handleSavePost : handleUnSavePost}
                    >
                        <icons.FaHeart className='w-[24px] h-[24px]' />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Post;
