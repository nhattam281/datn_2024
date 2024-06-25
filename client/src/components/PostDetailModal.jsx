import React from 'react';
import ImageSlider from './ImageSlider';
import PostInfo from './PostInfo';

const PostDetailModal = ({ closeModal, postInfo }) => {
    const handleCloseModal = () => {
        closeModal(false);
    };
    return (
        <div className='w-screen h-screen flex items-center justify-center fixed inset-0 z-50 bg-[#212631] bg-opacity-50 py-2'>
            <div className='w-1/2 h-full flex flex-col rounded justify-between overflow-y-auto bg-white scrollbar-none'>
                <div className='flex flex-col'>
                    <ImageSlider slides={postInfo?.postImages} />
                    <PostInfo postInfo={postInfo} />
                </div>
                <div className='w-full p-4 flex justify-end items-center gap-2'>
                    <button
                        onClick={handleCloseModal}
                        className='w-1/4 px-2 py-2 bg-secondary rounded text-white'
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostDetailModal;
