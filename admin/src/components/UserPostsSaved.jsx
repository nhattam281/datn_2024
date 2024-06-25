import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postsSavedSelector } from '../redux/selectors/postsSelector';
import PostList from './PostList';

const UserPostsSaved = () => {
    const params = useParams();
    const postsSaved = useSelector(postsSavedSelector);
    console.log(postsSaved);

    return (
        <div className='w-full flex items-center justify-center'>
            {postsSaved && (
                <PostList
                    list={postsSaved}
                    isViewOnly={true}
                    userId={params.userId}
                />
            )}
        </div>
    );
};

export default UserPostsSaved;
