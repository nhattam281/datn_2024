import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostSaveList from '../../components/PostSaveList';
import { postsSavedSelector } from '../../redux/selectors/postsSelector';
import { getAllPostSaved } from '../../redux/slices/postSlice';

function LikedPost() {
    const postsSaved = useSelector(postsSavedSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPostSaved({}));
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='flex-1 bg-white px-10 py-5 ml-[272px] overflow-y-auto'>
            <div className='py-4 border-b-2 border-solid border-[#dee2e6]'>
                <h1 className='text-3xl font-medium'>Tin đã lưu</h1>
            </div>
            <div className='w-full h-full'>
                {postsSaved && <PostSaveList list={postsSaved} />}
            </div>
        </div>
    );
}

export default LikedPost;
