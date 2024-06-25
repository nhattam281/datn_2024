import { orderBy } from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsSelector } from '../redux/selectors/postsSelector';
import { getAllPosts } from '../redux/slices/postSlice';
import PostCard from './PostCard';

const NewPosts = () => {
    const dispatch = useDispatch();
    const newPosts = useSelector(postsSelector);

    useEffect(() => {
        dispatch(
            getAllPosts({ orderBy: 'CREATED_DATE', orderDirection: 'desc' })
        );
    }, []);
    return (
        <div className='w-full p-4 rounded bg-white  border border-solid'>
            <h2 className='text-xl font-semibold'>Tin mới đăng</h2>
            {newPosts?.items &&
                newPosts?.items?.map((item) => {
                    return <PostCard key={item.id} item={item} />;
                })}
        </div>
    );
};

export default NewPosts;
