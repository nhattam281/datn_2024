import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { getListAdmin } from '../redux/slices/adminsSlice';
import { updateAdmin } from '../services/admins';
import InputHorizontal from './InputHorizontal';

const UpdateAdminModal = ({ closeModal, adminInfo }) => {
    const dispatch = useDispatch();
    const handleCloseModal = () => {
        closeModal(false);
    };

    const formik = useFormik({
        initialValues: { name: adminInfo.name, password: '' },
        validationSchema: yup.object({
            name: yup.string().min(4, 'Must be 4 characters or more'),
            password: yup
                .string()
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    'Minimum eight characters, at least one letter and one number.'
                ),
        }),
        onSubmit: async (values) => {
            console.log(values);
            try {
                const res = await updateAdmin(adminInfo.id, values);
                res &&
                    Swal.fire({
                        title: 'Success...',
                        text: 'Cập nhật thông tin admin thành công!',
                        icon: 'success',
                        confirmButtonColor: '#1266dd',
                        background: '#333',
                        color: '#fff',
                    }).then(() => {
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
                    <h1>Thay đổi thông tin của {adminInfo.name}</h1>
                </div>
                <div className='flex-1 p-8 flex flex-col gap-4 items-center'>
                    <InputHorizontal
                        text={'Email:'}
                        type={'email'}
                        id={'email'}
                        name={'email'}
                        wrapperClassName={'w-3/4'}
                        labelClassName={'w-1/3'}
                        defaultValue={adminInfo.email}
                        className={'hover:cursor-not-allowed'}
                        disabled
                    />
                    <InputHorizontal
                        text={'Họ tên:'}
                        type={'name'}
                        id={'name'}
                        name={'name'}
                        wrapperClassName={'w-3/4'}
                        labelClassName={'w-1/3'}
                        defaultValue={adminInfo.name}
                        values={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.errors.name}
                    />
                    <InputHorizontal
                        text={'Mật khẩu:'}
                        type={'password'}
                        id={'password'}
                        name={'password'}
                        labelClassName={'w-1/3'}
                        wrapperClassName={'w-3/4'}
                        values={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.errors.password}
                    />
                </div>
                <div className='w-full flex justify-center items-center gap-2 pb-8'>
                    <button
                        onClick={handleCloseModal}
                        className='w-1/4 px-2 py-2 bg-secondary rounded'
                    >
                        Cancel
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

export default UpdateAdminModal;
