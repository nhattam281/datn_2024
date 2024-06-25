import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import PostList from '../components/PostList';
import { postsSelector } from '../redux/selectors/postsSelector';
import { getListPost } from '../redux/slices/postsSlice';

const PostManage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(postsSelector);

    useEffect(() => {
        dispatch(getListPost({}));
    }, []);
    return (
        <div className='text-white flex-grow flex flex-col ml-64 overflow-y-auto bg-primary'>
            <div className='w-full px-6 py-4 flex items-center bg-main border-b border-main'>
                <h1>Quản lý bài đăng</h1>
            </div>
            <div className='p-6'>
                <div className='rounded overflow-hidden bg-main'>
                    <div className='px-4 py-2 bg-[#282d37]'>
                        <h1>Đây là tất cả bài đăng trên web</h1>
                    </div>
                    <div className='w-full flex items-center justify-center py-6'>
                        {posts && <PostList list={posts} />}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PostManage;
