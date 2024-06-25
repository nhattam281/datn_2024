import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContactBanner from '../../components/ContactBanner';
import ImageSlider from '../../components/ImageSlider';
import PostDetailSidebar from '../../components/PostDetailSidebar';
import PostInfo from '../../components/PostInfo';
import { apiGetPostWithId } from '../../services/post';

function PostDetail() {
    const params = useParams();
    const postId = params.postId;
    const [postInfo, setPostInfo] = useState({});

    useEffect(() => {
        const fetchPostById = async () => {
            const res = await apiGetPostWithId(postId);
            if (res) {
                setPostInfo(res);
            }
            console.log(res);
        };
        fetchPostById();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='w-[1100px] flex flex-col gap-4'>
            {postInfo?.id ? (
                <div className='flex gap-4'>
                    <div className='flex-1 flex-col flex'>
                        <ImageSlider slides={postInfo?.postImages} />
                        <PostInfo postInfo={postInfo} />
                    </div>
                    <PostDetailSidebar postInfo={postInfo} />
                </div>
            ) : (
                <div className='w-full h-96 p-10 flex flex-col gap-4 items-center justify-center bg-white mt-7'>
                    <h2 className='text-9xl font-semibold'>404</h2>
                    <h2 className='text-xl font-semibold'>Not Found</h2>
                    <h2 className='text-sm'>
                        Rất tiếc, bài viết này không còn nữa.
                    </h2>
                </div>
            )}
            <ContactBanner />
        </div>
    );
}

export default PostDetail;
