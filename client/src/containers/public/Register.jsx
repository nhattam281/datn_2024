import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import Input from '../../components/Input';
import {
    authErrorMsgSelector,
    authIsLogginSelector,
    authLoadingSelector,
} from '../../redux/selectors/authSelector';
import authSlice, { authRegister } from '../../redux/slices/authSlice';
import { path } from '../../utils/constant';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const errorMsg = useSelector(authErrorMsgSelector);
    const loading = useSelector(authLoadingSelector);
    const isLoggedIn = useSelector(authIsLogginSelector);

    const formik = useFormik({
        initialValues: { name: '', email: '', password: '' },
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
            dispatch(authRegister(values));
        },
    });

    //check if loggedin -> navigate home
    useEffect(() => {
        isLoggedIn && navigate(path.HOME);
    }, [isLoggedIn]);

    useEffect(() => {
        console.log('error', errorMsg?.message);
        errorMsg &&
            Swal.fire({
                title: 'Oops...',
                text: errorMsg?.message,
                icon: 'error',
                confirmButtonColor: '#1266dd',
            });
        dispatch(authSlice.actions.resetErrMsg());
    }, [errorMsg]);
    return (
        <form
            className='bg-white w-[600px] p-[30px] pb-[100px] rounded-lg shadow-md'
            onSubmit={formik.handleSubmit}
        >
            <h2 className='text-2xl font-bold mb-3'>Đăng ký</h2>
            <Input
                text={'Họ tên'}
                type={'text'}
                id={'name'}
                name={'name'}
                className={'px-4 py-4'}
                values={formik.values.name}
                onChange={formik.handleChange}
                error={formik.errors.name}
            />
            <Input
                text={'Email'}
                type={'email'}
                id={'email'}
                name={'email'}
                className={'px-4 py-4'}
                values={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
            />
            <Input
                text={'Mật khẩu'}
                type={'password'}
                id={'password'}
                name={'password'}
                className={'px-4 py-4'}
                values={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
            />
            <button
                type='submit'
                className='px-4 py-4 bg-secondary text-white rounded-md w-full hover:underline disabled:bg-slate-600'
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Đăng ký'}
            </button>
            <div className='w-full flex items-center mt-4'>
                <span className='cursor-pointer'>Bạn quên mật khẩu?</span>
                <span className='cursor-pointer hover:text-red-400 text-blue-500'>
                    Đăng nhập ngay.
                </span>
            </div>
        </form>
    );
}

export default Register;
