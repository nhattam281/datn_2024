import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postsRecommendSelector } from '../redux/selectors/postsSelector';

const UserPostsRecommend = () => {
    const params = useParams();
    const postsRecommend = useSelector(postsRecommendSelector);

    return (
        <div className='w-full flex justify-center'>
            <h1 className='w-full'>
                Đây là danh dánh tin được gợi ý cho người dùng này
            </h1>
            {postsRecommend && (
                <PostList
                    list={postsRecommend}
                    isViewOnly={true}
                    userId={params.userId}
                />
            )}
        </div>
    );
};

export default UserPostsRecommend;
