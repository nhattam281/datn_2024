import { useFormik } from 'formik';
import React from 'react';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { apiUpdateUserPassword } from '../services/currentUser.js';
import InputHorizontal from './InputHorizontal';

const UpdatePasswordModal = ({ closeModal }) => {
    const handleCloseModal = () => {
        closeModal(false);
    };

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: yup.object({
            oldPassword: yup
                .string()
                .required('Required')
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    'Minimum eight characters, at least one letter and one number.'
                ),
            newPassword: yup
                .string()
                .required('Required')
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    'Minimum eight characters, at least one letter and one number.'
                ),
            confirmPassword: yup
                .string()
                .required('Required')
                .oneOf([yup.ref('newPassword'), null], 'Password must match!'),
        }),
        onSubmit: async (values) => {
            try {
                const res = await apiUpdateUserPassword(values);
                console.log(res);
                res &&
                    Swal.fire({
                        title: 'Success...',
                        text: 'Thay đổi mật khẩu thành công!',
                        icon: 'success',
                        confirmButtonColor: '#1266dd',
                        background: '#333',
                        color: '#fff',
                    }).then(() => {
                        closeModal(false);
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
                    });
            }
        },
    });

    return (
        <div className='w-screen h-screen flex items-center justify-center fixed inset-0 z-50 bg-main bg-opacity-50'>
            <form
                className='w-2/5 flex flex-col rounded  border border-main bg-main'
                onSubmit={formik.handleSubmit}
            >
                <div className='flex items-center justify-center px-4 py-4 bg-[#282d37]'>
                    <h1>Thay đổi mật khẩu</h1>
                </div>
                <div className='flex-1 p-8 flex flex-col gap-4 items-center'>
                    <InputHorizontal
                        text={'Mật khẩu cũ:'}
                        type={'password'}
                        id={'oldPassword'}
                        name={'oldPassword'}
                        wrapperClassName={'w-3/4'}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.errors.password}
                    />
                    <InputHorizontal
                        text={'Mật khẩu mới:'}
                        type={'password'}
                        id={'newPassword'}
                        name={'newPassword'}
                        wrapperClassName={'w-3/4'}
                        onChange={formik.handleChange}
                        value={formik.values.newPassword}
                        error={formik.errors.newPassword}
                    />
                    <InputHorizontal
                        text={'Nhập lại mật khẩu:'}
                        type={'password'}
                        id={'confirmPassword'}
                        name={'confirmPassword'}
                        wrapperClassName={'w-3/4'}
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        error={formik.errors.confirmPassword}
                    />
                </div>
                <div className='w-full flex justify-center items-center gap-2 pb-8'>
                    <button
                        onClick={handleCloseModal}
                        className='w-1/4 px-2 py-2 bg-secondary rounded'
                    >
                        Cancle
                    </button>
                    <button
                        type='submit'
                        className='w-1/4 px-2 py-2 bg-secondary rounded'
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdatePasswordModal;
