import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import defaultUserImg from '../../assets/default_user.png';
import {
    currentUserLoadingSelector,
    currentUserSelector,
} from '../../redux/selectors/currentUserSelector';
import {
    getCurrentUser,
    updateUserProfile,
} from '../../redux/slices/userSlice';
import { createFile } from '../../services/file';

function Profile() {
    const currentUser = useSelector(currentUserSelector);
    const currentUserLoading = useSelector(currentUserLoadingSelector);

    const [avatar, setAvatar] = useState({});
    const [isCreatingFile, setIsCreatingFile] = useState(false);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const handleUpload = async (e) => {
        const files = e.target?.files;
        if (isCreatingFile) return; //noti dang xu ly
        setIsCreatingFile(true);

        if (!files?.[0]) return;
        const file = await createFile(files[0]);
        setAvatar(file);

        setIsCreatingFile(false);
        e.target.value = '';
    };

    const onSubmit = async (data) => {
        try {
            const profileUpdate = { ...data, avatar: avatar.url };
            console.log(profileUpdate);
            dispatch(updateUserProfile(profileUpdate));
            Swal.fire({
                title: 'Success...',
                text: 'Cập nhật hồ sơ thành công!',
                icon: 'success',
                confirmButtonColor: '#1266dd',
            }).then(() => {
                dispatch(getCurrentUser());
            });
        } catch (error) {
            error &&
                Swal.fire({
                    title: 'Oops...',
                    text: error.message,
                    icon: 'error',
                    confirmButtonColor: '#1266dd',
                });
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='flex-1 bg-white px-10 py-5 ml-[272px] overflow-y-auto'>
            <div className='py-4 border-b-2 border-solid border-[#dee2e6]'>
                <h1 className='text-3xl font-medium'>
                    Cập nhật thông tin cá nhân
                </h1>
            </div>
            <form
                className='w-full flex flex-col items-center p-10'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='w-3/4 py-4 flex items-center'>
                    <span className='w-1/3'>Mã thành viên: </span>
                    <input
                        type='text'
                        id='userId'
                        name='userId'
                        disabled
                        defaultValue={currentUser?.id}
                        className='flex-1 px-2 py-1 rounded-md border border-solid border-[#ced4da] bg-[#e9ecef]'
                    />
                </div>
                <div className='w-3/4 py-4 flex items-center'>
                    <span className='w-1/3'>Email: </span>
                    <input
                        type='text'
                        id='email'
                        name='email'
                        disabled
                        defaultValue={currentUser?.email}
                        className='flex-1 px-2 py-1 rounded-md border border-solid border-[#ced4da] bg-[#e9ecef]'
                    />
                </div>
                <div className='w-3/4 py-4 flex items-center'>
                    <span className='w-1/3'>Tên hiển thị: </span>
                    <input
                        {...register('name')}
                        defaultValue={currentUser?.name}
                        className='flex-1 px-2 py-1 rounded-md border border-solid border-[#ced4da] focus:outline-none'
                    />
                </div>
                <div className='w-3/4 py-4 flex items-center'>
                    <span className='w-1/3'>Số điện thoại: </span>
                    <input
                        {...register('phoneNumber')}
                        defaultValue={currentUser?.phoneNumber}
                        className='flex-1 px-2 py-1 rounded-md border border-solid border-[#ced4da] focus:outline-none'
                    />
                </div>
                <div className='w-3/4 py-4 flex items-center'>
                    <span className='w-1/3'>Số zalo: </span>
                    <input
                        {...register('zaloPhoneNumber')}
                        defaultValue={currentUser?.zaloPhoneNumber}
                        className='flex-1 px-2 py-1 rounded-md border border-solid border-[#ced4da] focus:outline-none'
                    />
                </div>
                <div className='w-3/4 py-4 flex items-center'>
                    <span className='w-1/3'>Facebook: </span>
                    <input
                        {...register('facebook')}
                        defaultValue={currentUser?.facebook}
                        className='flex-1 px-2 py-1 rounded-md border border-solid border-[#ced4da] focus:outline-none'
                    />
                </div>

                <div className='w-3/4 py-4 flex'>
                    <span className='w-1/3'>Ảnh đại diện: </span>
                    <div className='flex flex-col gap-4'>
                        <div className='border-2 py-2 border-dashed flex justify-center'>
                            <img
                                src={
                                    avatar.url
                                        ? avatar.url
                                        : currentUser?.avatar
                                }
                                alt=''
                                className='w-[140px] h-[140px] rounded-full object-cover'
                            />
                        </div>
                        <input
                            type='file'
                            id='avatar'
                            name='avatar'
                            onChange={handleUpload}
                            className='w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-600 rounded'
                        />
                    </div>
                </div>
                <button
                    type='submit'
                    className='bg-secondary hover:underline text-white w-3/4 disabled:bg-slate-600 py-4 rounded-md mt-10'
                    disabled={currentUserLoading}
                >
                    {currentUserLoading ? 'Loading...' : 'Lưu & Cập nhật'}
                </button>
            </form>
        </div>
    );
}

export default Profile;
