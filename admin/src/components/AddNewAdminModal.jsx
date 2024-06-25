import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { getListAdmin } from '../redux/slices/adminsSlice';
import { createNewAdmin } from '../services/admins';
import InputHorizontal from './InputHorizontal';

const AddNewAdminModal = ({ closeModal }) => {
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        closeModal(false);
    };
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            name: yup
                .string()
                .required('Required')
                .min(4, 'Must be 4 characters or more'),
            email: yup
                .string()
                .required('Required')
                .matches(
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    'Please enter a valid email address!'
                ),
            password: yup
                .string()
                .required('Required')
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    'Minimum eight characters, at least one letter and one number.'
                ),
        }),
        onSubmit: async (values) => {
            console.log({ values });
            try {
                const res = await createNewAdmin(values);
                console.log(res);
                res &&
                    Swal.fire({
                        title: 'Success...',
                        text: 'Thêm mới admin thành công!',
                        icon: 'success',
                        confirmButtonColor: '#1266dd',
                        background: '#333',
                        color: '#fff',
                        confirmButtonColor: '#333',
                    }).then(function () {
                        dispatch(getListAdmin({}));
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
                        confirmButtonColor: '#333',
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
                    <h1>Thêm mới tài khoản admin</h1>
                </div>
                <div className='flex-1 p-8 flex flex-col gap-4 items-center'>
                    <InputHorizontal
                        text={'Họ Tên:'}
                        type={'text'}
                        id={'name'}
                        name={'name'}
                        wrapperClassName={'w-3/4'}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={formik.errors.name}
                    />
                    <InputHorizontal
                        text={'Email:'}
                        type={'email'}
                        id={'email'}
                        name={'email'}
                        wrapperClassName={'w-3/4'}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.errors.email}
                    />
                    <InputHorizontal
                        text={'Password:'}
                        type={'password'}
                        id={'password'}
                        name={'password'}
                        wrapperClassName={'w-3/4'}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.errors.password}
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

export default AddNewAdminModal;
