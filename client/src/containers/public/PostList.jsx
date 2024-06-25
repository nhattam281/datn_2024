import React from 'react';
import { useSelector } from 'react-redux';
import Post from '../../components/Post';
import { postsSelector } from '../../redux/selectors/postsSelector';

function PostList({ postsRecommend }) {
    const posts = useSelector(postsSelector);
    console.log('postsRecommend', postsRecommend);
    return (
        <div className='w-full'>
            {postsRecommend
                ? postsRecommend.map((item) => (
                      <Post key={item.id} post={item} />
                  ))
                : posts?.items.map((item) => (
                      <Post key={item.id} post={item} />
                  ))}
            {/* {posts &&
                posts?.items.map((item) => <Post key={item.id} post={item} />)} */}
        </div>
    );
}

export default PostList;
