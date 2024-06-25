import React from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { postsSavedSelector } from '../redux/selectors/postsSelector';
import { apiSavePost, apiUnSavePost } from '../services/post';
import icons from '../utils/icons';
import NewPosts from './NewPosts';

const PostDetailSidebar = ({ postInfo }) => {
    const postsSaved = useSelector(postsSavedSelector);
    const isSaved = postsSaved?.items.some((item) => item.id == postInfo.id);

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
                    const res = await apiSavePost(postInfo.id);
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
                    const res = await apiUnSavePost(postInfo?.id);
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
        <div className='w-[374px] rounded flex flex-col gap-4'>
            <div className='flex flex-col max-h-[325px] justify-center items-center w-full p-4 gap-4 bg-[#febb02] border border-solid'>
                <div className='rounded-full flex items-center justify-center overflow-hidden bg-white'>
                    <img
                        src={postInfo?.user?.avatar}
                        alt=''
                        className='object-cover h-20 w-20 object-center'
                    />
                </div>
                <span className='font-extrabold text-xl'>
                    {postInfo?.user?.name}
                </span>
                <button className='flex items-center justify-center gap-2 bg-green-500 text-white w-full py-2 rounded font-bold'>
                    <icons.FaPhoneSquareAlt size={24} />
                    {postInfo?.user?.phoneNumber}
                </button>
                <button className='flex items-center justify-center gap-2 bg-white w-full py-2 rounded font-bold'>
                    <icons.FaFacebook size={24} />
                    Facebook
                </button>
                <button
                    className={`flex items-center justify-center gap-2 bg-white w-full py-2 rounded font-bold`}
                    onClick={!isSaved ? handleSavePost : handleUnSavePost}
                >
                    <icons.FaHeart
                        size={24}
                        className={` ${
                            isSaved ? 'text-red-600' : 'text-[#8a8d91]'
                        }`}
                    />
                    Yêu thích
                </button>
            </div>
            <NewPosts />
            <div className='p-5 bg-white rounded border border-solid'>
                <h3 className='text-xl font-semibold'>Có thể bạn quan tâm</h3>
                <ul className='w-full mt-2 h-full list-none text-base'>
                    <li className='py-1 hover:text-red-500 flex items-center text-gray-700 cursor-pointer'>
                        <icons.MdOutlineNavigateNext />
                        Mẫu hợp đồng cho thuê phòng trọ
                    </li>
                    <li className='py-1 hover:text-red-500 flex text-gray-700 cursor-pointer'>
                        <icons.MdOutlineNavigateNext className='h-6' />
                        Cẩn thận các kiểu lừa đảo khi thuê trọ
                    </li>
                    <li className='py-1 hover:text-red-500 flex items-center text-gray-700 cursor-pointer'>
                        <icons.MdOutlineNavigateNext />
                        Kinh nghiệm thuê phòng trọ sinh viên
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PostDetailSidebar;
