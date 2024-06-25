import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyPost from '../../components/MyPost';
import { myPostsSelector } from '../../redux/selectors/postsSelector';
import { getMyPost } from '../../redux/slices/postSlice';

function PostManagement() {
    const myPosts = useSelector(myPostsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyPost({}));
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='flex-1 bg-white px-10 py-5 ml-[272px] overflow-y-auto'>
            <div className='py-4 border-b-2 border-solid border-[#dee2e6]'>
                <h1 className='text-3xl font-medium'>Quản lý tin đăng</h1>
            </div>
            <div className='w-full'>{myPosts && <MyPost list={myPosts} />}</div>
        </div>
    );
}

export default PostManagement;
