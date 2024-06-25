import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import Footer from '../components/Footer';
import InputHorizontal from '../components/InputHorizontal';
import UpdatePasswordModal from '../components/UpdatePasswordModal';
import { currentUserSelector } from '../redux/selectors/currentUserSelector';
import {
    getCurrentUser,
    updateUserProfile,
} from '../redux/slices/currentUserSlice';

const HomePage = () => {
    const currentUser = useSelector(currentUserSelector);
    const dispatch = useDispatch();

    const [openUpdatePasswordmodal, setOpenUpdatePasswordmodal] =
        useState(false);

    const handleChangePassword = (event) => {
        event.preventDefault();
        setOpenUpdatePasswordmodal(true);
    };

    const formik = useFormik({
        initialValues: { name: '' },
        validationSchema: yup.object({
            name: yup
                .string()
                .required('Required')
                .min(4, 'Must be 4 characters or more'),
        }),
        onSubmit: (values) => {
            console.log({ values });
            dispatch(updateUserProfile(values));
            Swal.fire({
                title: 'Success...',
                text: 'Đổi tên thành công!',
                icon: 'success',
                confirmButtonColor: '#1266dd',
                background: '#333',
                color: '#fff',
                confirmButtonColor: '#333',
            }).then(() => {
                dispatch(getCurrentUser());
            });
        },
    });

    return (
        <div className='text-white flex-grow flex flex-col ml-64 overflow-y-auto bg-primary'>
            <div className='w-full px-6 py-4 flex sticky top-0 items-center bg-main border-b border-main'>
                <h1>Hồ sơ</h1>
            </div>
            <div className='p-6 flex-1'>
                <div className='rounded overflow-hidden bg-main'>
                    <div className='px-4 py-2 bg-[#282d37]'>
                        <h1>Thông tin tài khoản của bạn</h1>
                    </div>
                    <form
                        className='w-full flex flex-col items-center px-4 py-8 gap-4'
                        onSubmit={formik.handleSubmit}
                    >
                        <InputHorizontal
                            text={'Mã admin:'}
                            type={'text'}
                            id={'userId'}
                            name={'userId'}
                            wrapperClassName={'w-1/2'}
                            labelClassName={'w-1/3'}
                            className={'hover:cursor-not-allowed'}
                            defaultValue={currentUser?.id}
                            disabled
                        />
                        <InputHorizontal
                            text={'Vai trò:'}
                            type={'text'}
                            id={'role'}
                            name={'role'}
                            wrapperClassName={'w-1/2'}
                            labelClassName={'w-1/3'}
                            className={'hover:cursor-not-allowed'}
                            defaultValue={currentUser?.role.replace('_', ' ')}
                            disabled
                        />
                        <InputHorizontal
                            text={'Email:'}
                            type={'email'}
                            id={'email'}
                            name={'email'}
                            wrapperClassName={'w-1/2'}
                            labelClassName={'w-1/3'}
                            className={'hover:cursor-not-allowed'}
                            defaultValue={currentUser?.email}
                            disabled
                        />
                        <InputHorizontal
                            text={'Họ tên:'}
                            type={'name'}
                            id={'name'}
                            name={'name'}
                            wrapperClassName={'w-1/2'}
                            labelClassName={'w-1/3'}
                            className={'flex-1'}
                            defaultValue={currentUser?.name}
                            values={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.errors.name}
                        />
                        <div className='flex items-center w-1/2 '>
                            <span className='w-1/3 font-semibold'>
                                Mật khẩu:{' '}
                            </span>
                            <button
                                className='px-2'
                                onClick={handleChangePassword}
                            >
                                Thay đổi mật khẩu
                            </button>
                        </div>
                        <button
                            type='submit'
                            className='w-1/2 px-2 py-2 mt-8 bg-secondary'
                        >
                            Lưu
                        </button>
                    </form>
                </div>
            </div>
            {openUpdatePasswordmodal && (
                <UpdatePasswordModal closeModal={setOpenUpdatePasswordmodal} />
            )}
            <Footer />
        </div>
    );
};

export default HomePage;
