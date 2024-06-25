import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import Input from '../components/Input';
import {
    authErrorMsgSelector,
    authIsLogginSelector,
    authLoadingSelector,
} from '../redux/selectors/authSelector';
import authSlice, { authLogin } from '../redux/slices/authSlice';
import { path } from '../utils/constant';

const Login = () => {
    const loading = useSelector(authLoadingSelector);
    const isLoggedIn = useSelector(authIsLogginSelector);
    const errorMsg = useSelector(authErrorMsgSelector);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: yup.object({
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
            dispatch(authLogin(values));
        },
    });

    //check if logged in navigate to home
    useEffect(() => {
        isLoggedIn && navigate(path.HOME);
    }, [isLoggedIn]);

    //show error message
    useEffect(() => {
        errorMsg &&
            Swal.fire({
                title: 'Oops...',
                text: errorMsg?.message,
                icon: 'error',
                confirmButtonColor: '#1266dd',
                background: '#333',
                color: '#fff',
                confirmButtonColor: '#333',
            });
        dispatch(authSlice.actions.resetErrMsg());
    }, [errorMsg]);

    return (
        <div className='w-full h-screen flex flex-col items-center justify-center bg-notfound bg-cover'>
            {/* <div className='flex mb-10'>
                <h1 className='h-[70px] text-primary text-xl font-logo font-bold text-center leading-[70px] uppercase'>
                    Phongtro
                </h1>
                <h1 className='h-[70px] text-secondary text-xl font-logo font-bold text-center leading-[70px] uppercase'>
                    UTC2
                </h1>
            </div> */}
            <div className='w-[520px] flex flex-col items-center px-12 py-10 rounded-lg shadow-xl text-white bg-transparent backdrop-blur-2xl border-2 border-solid border-slate-400'>
                <h1 className='text-3xl font-bold mb-4'>Sign in</h1>
                <form className='w-full' onSubmit={formik.handleSubmit}>
                    <Input
                        text={'Email'}
                        type={'email'}
                        id={'email'}
                        name={'email'}
                        className={
                            'px-4 py-3 bg-transparent border-2 border-solid border-slate-400'
                        }
                        values={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.errors.email}
                    />
                    <Input
                        text={'Mật khẩu'}
                        type={'password'}
                        id={'password'}
                        name={'password'}
                        className={
                            'px-4 py-3 bg-transparent border-2 border-solid border-slate-400 autofill:bg-transparent'
                        }
                        errorClass={'text'}
                        values={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.errors.password}
                    />
                    <p className='text-sm mb-6'>
                        Chưa có tài khoản? Vui lòng liên hệ chủ trang web.
                    </p>
                    <button
                        type='submit'
                        className={
                            'px-4 py-4 border-2 border-solid border-slate-400 hover:bg-white hover:text-black rounded-md w-full'
                        }
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Đăng nhập'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
