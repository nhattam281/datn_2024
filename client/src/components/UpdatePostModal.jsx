import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { getMyPost } from '../redux/slices/postSlice';
import { createFile } from '../services/file';
import { apiUpdatePost } from '../services/post';
import icons from '../utils/icons';
import CreatePostAddress from './CreatePostAddress';
import CreatePostDetail from './CreatePostDetail';

const UpdatePostModal = ({ closeModal, postInfo }) => {
    const dispatch = useDispatch();
    const imageList = postInfo?.postImages.map((item) => item.image);
    const [images, setImages] = useState(imageList);
    const [isCreatingFile, setIsCreatingFile] = useState(false);
    const [payload, setPayload] = useState({
        provinceId: postInfo?.province?.id,
        wardId: postInfo?.ward?.id,
        districtId: postInfo?.district?.id,
        address: postInfo?.address,
        title: postInfo?.title,
        desc: postInfo?.desc,
        price: postInfo?.price,
        area: postInfo?.area,
        gender: postInfo?.gender,
        imageIds: [],
        categoryId: postInfo?.category?.id,
    });

    const handleCloseModal = () => {
        closeModal(false);
    };

    const handleUpdatePost = async () => {
        try {
            const res = await apiUpdatePost(payload, postInfo.id);
            res &&
                Swal.fire({
                    title: 'Success...',
                    text: 'Chỉnh sửa bài đăng thành công!',
                    icon: 'success',
                    confirmButtonColor: '#1266dd',
                }).then(function () {
                    dispatch(getMyPost({}));
                    closeModal(false);
                });
        } catch (error) {
            console.log('create post error', error);
            error &&
                Swal.fire({
                    title: 'Oops...',
                    text: error.message,
                    icon: 'error',
                    confirmButtonColor: '#1266dd',
                });
        }
    };

    const handleUpload = async (e) => {
        const files = e.target?.files;
        if (isCreatingFile) return; //noti dang xu ly
        setIsCreatingFile(true);
        if (!files?.[0]) return;
        try {
            const newFiles = await Promise.all(
                Array.from(files).map(async (file) => {
                    const response = await createFile(file);
                    return response;
                })
            );

            setImages((prev) => [...prev, ...newFiles]);
        } catch (error) {
            console.log('Error uploading files:', error);
        } finally {
            setIsCreatingFile(false);
            e.target.value = '';
        }
    };

    const handleDeleteImage = (imageId) => {
        setImages((prevImages) =>
            prevImages.filter((image) => image.id !== imageId)
        );
    };

    useEffect(() => {
        const imgIDs = images.map((item) => item.id);
        console.log('imageid', imgIDs);
        setPayload((prev) => ({
            ...prev,
            imageIds: imgIDs,
        }));
    }, [images]);

    return (
        <div className='w-screen h-screen flex items-center justify-center fixed inset-0 z-50 bg-[#212631] bg-opacity-50 py-2'>
            <div className='w-3/5 h-full p-8 flex flex-col rounded justify-between overflow-y-auto bg-white scrollbar-thin'>
                <div className='w-full flex justify-between items-center py-4 border-b-2 border-solid border-[#dee2e6]'>
                    <h1 className='text-3xl font-medium'>
                        Chỉnh sửa bài đăng có id là {postInfo.id}
                    </h1>
                    <button
                        onClick={handleCloseModal}
                        className='w-1/4 px-2 py-2 bg-secondary rounded text-white'
                    >
                        Đóng
                    </button>
                </div>
                <div className='flex-1 mt-8'>
                    <CreatePostAddress
                        payload={payload}
                        setPayload={setPayload}
                    />
                    <CreatePostDetail
                        payload={payload}
                        setPayload={setPayload}
                    />
                    <div className='w-full'>
                        <h2 className='text-2xl font-semibold mb-4'>
                            Hình ảnh
                        </h2>
                        <p className='mb-4'>
                            Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn
                        </p>
                        <div className='w-full mb-10'>
                            <label
                                htmlFor='imagesFile'
                                className='w-full flex h-[300px] items-center justify-center border-4 border-dashed border-[#e8eefc] rounded-md cursor-pointer'
                            >
                                <icons.FaCloudUploadAlt className='w-20 h-20 text-blue-300' />
                            </label>
                            <input
                                hidden
                                type='file'
                                id='imagesFile'
                                multiple
                                onChange={handleUpload}
                            />
                            <div className='w-full min-h-40 p-2 mt-4 border-4 border-dashed border-[#e8eefc] flex flex-wrap items-center gap-4'>
                                {images.map((item) => {
                                    return (
                                        <img
                                            key={item.id}
                                            src={item?.url}
                                            alt=''
                                            className='w-36 h-36 object-cover hover:cursor-pointer'
                                            onClick={() =>
                                                handleDeleteImage(item.id)
                                            }
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <button
                            className='w-full py-4 rounded-md bg-secondary text-white'
                            onClick={handleUpdatePost}
                        >
                            Cập nhật
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePostModal;
