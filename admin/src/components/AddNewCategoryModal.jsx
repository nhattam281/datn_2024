import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { getListCategory } from '../redux/slices/categorySlice';
import { createNewCategory } from '../services/category';
import InputHorizontal from './InputHorizontal';

const AddNewCategoryModal = ({ closeModal }) => {
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        closeModal(false);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            desc: '',
        },
        validationSchema: yup.object({
            name: yup
                .string()
                .required('Required')
                .min(4, 'Must be 4 characters or more'),
            desc: yup
                .string()
                .required('Required')
                .min(4, 'Must be 4 characters or more'),
        }),
        onSubmit: async (values) => {
            try {
                console.log('values', values);
                const res = await createNewCategory(values);
                res &&
                    Swal.fire({
                        title: 'Success...',
                        text: 'Thêm mới danh mục thành công!',
                        icon: 'success',
                        confirmButtonColor: '#1266dd',
                        background: '#333',
                        color: '#fff',
                        confirmButtonColor: '#333',
                    }).then(function () {
                        dispatch(getListCategory({}));
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
                    <h1>Tạo danh mục mới</h1>
                </div>
                <div className='flex-1 p-8 flex flex-col gap-4 items-center'>
                    <InputHorizontal
                        text={'Tên:'}
                        type={'text'}
                        id={'name'}
                        name={'name'}
                        wrapperClassName={'w-3/4'}
                        labelClassName={'w-1/4'}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={formik.errors.name}
                    />
                    <div className='w-3/4'>
                        <div
                            className={`flex justify-center w-full box-border`}
                        >
                            <label
                                htmlFor='desc'
                                className='font-semibold w-1/4'
                            >
                                Mô tả:
                            </label>
                            <textarea
                                name='desc'
                                id='desc'
                                rows={4}
                                className={`flex-1 rounded-md py-2 px-2 focus:outline-none bg-transparent border border-solid border-main text-white text-ellipsis`}
                                onChange={formik.handleChange}
                                value={formik.values.decs}
                            ></textarea>
                        </div>
                        <div className='w-full flex h-3 justify-end mt-1'>
                            <span className={`font-medium text-xs text-white`}>
                                {formik.errors.desc}
                            </span>
                        </div>
                    </div>
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

export default AddNewCategoryModal;
