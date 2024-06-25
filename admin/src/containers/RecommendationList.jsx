import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import UserList from '../components/UserList';
import { usersSelector } from '../redux/selectors/usersSelector';
import { getListUser } from '../redux/slices/usersSlice';

const RecommendationList = () => {
    const dispatch = useDispatch();
    const users = useSelector(usersSelector);

    useEffect(() => {
        dispatch(getListUser({}));
    }, []);
    return (
        <div className='text-white flex-grow flex flex-col ml-64 overflow-y-auto bg-primary'>
            <div className='w-full px-6 py-4 flex items-center bg-main border-b border-main'>
                <h1>Quản lý người dùng</h1>
            </div>
            <div className='p-6'>
                <div className='rounded overflow-hidden bg-main'>
                    <div className='px-4 py-2 bg-[#282d37]'>
                        <h1>Danh sách bài đăng gợi ý cho người dùng</h1>
                    </div>
                    <div className='w-full flex items-center justify-center py-6'>
                        {users && <UserList list={users} isRecommend={true} />}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RecommendationList;
