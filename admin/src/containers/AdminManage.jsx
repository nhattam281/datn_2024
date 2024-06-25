import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminList from '../components/AdminList';
import Footer from '../components/Footer';
import { adminsSelector } from '../redux/selectors/adminsSelector';
import { getListAdmin } from '../redux/slices/adminsSlice';

const AdminManage = () => {
    const dispatch = useDispatch();
    const adminList = useSelector(adminsSelector);

    useEffect(() => {
        dispatch(getListAdmin({}));
    }, []);

    return (
        <div className='text-white flex-grow flex flex-col ml-64 overflow-y-auto bg-primary'>
            <div className='w-full px-6 py-4 flex items-center bg-main border-b border-main'>
                <h1>Quản lý tài khoản quản trị viên</h1>
            </div>
            <div className='p-6'>
                <div className='rounded overflow-hidden bg-main'>
                    <div className='px-4 py-2 bg-[#282d37]'>
                        <h1>
                            Chỉnh sửa thông tin, thêm, xóa tài khoản quản trị
                        </h1>
                    </div>
                    <div className='w-full flex items-center justify-center px-4 py-6'>
                        {adminList && <AdminList list={adminList} />}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminManage;
