import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import CreatePostAddress from '../../components/CreatePostAddress';
import CreatePostDetail from '../../components/CreatePostDetail';
import { createFile } from '../../services/file';
import { apiCreatePost } from '../../services/post';
import { path } from '../../utils/constant';
import icons from '../../utils/icons';

function CreatePost() {
    // const currentUser = useSelector(currentUserSelector)
    const navigate = useNavigate();

    const [images, setImages] = useState([]);
    const [isCreatingFile, setIsCreatingFile] = useState(false);
    // const [resetComponent, setResetComponent] = useState(true);
    const [payload, setPayload] = useState({
        provinceId: null,
        wardId: null,
        districtId: null,
        address: '',
        title: '',
        desc: '',
        price: null,
        area: null,
        gender: null,
        imageIds: [],
        categoryId: null,
    });
    console.log('payload', payload);
    // const dispatch = useDispatch();

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

    useEffect(() => {
        const imgIDs = images.map((item) => item.id);
        console.log('imageid', imgIDs);
        setPayload((prev) => ({
            ...prev,
            imageIds: imgIDs,
        }));
    }, [images]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleAddNewPost = async () => {
        //create new post
        try {
            const res = await apiCreatePost(payload);
            res &&
                Swal.fire({
                    title: 'Success...',
                    text: 'Thêm mới bài đăng thành công!',
                    icon: 'success',
                    confirmButtonColor: '#1266dd',
                }).then(function () {
                    navigate(`${path.ACCOUNT}/${path.POSTS_MANAGEMENT}`);
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

    const handleDeleteImage = (imageId) => {
        setImages((prevImages) =>
            prevImages.filter((image) => image.id !== imageId)
        );
    };

    return (
        <div className='flex-1 bg-white px-10 py-5 ml-[272px] overflow-y-auto'>
            <div className='py-4 border-b-2 border-solid border-[#dee2e6]'>
                <h1 className='text-3xl font-medium'>Đăng tin cho thuê</h1>
            </div>
            <div className='flex my-12 gap-8'>
                <div className='flex-1'>
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
                            onClick={handleAddNewPost}
                        >
                            Đăng tin
                        </button>
                    </div>
                </div>
                <div className='w-[372px] h-[290px] gap-2 p-4 rounded-sm text-[#856404] bg-[#fff3cd] border border-[#ffeeba]'>
                    <h2 className='text-2xl mb-2'>Lưu ý khi đăng tin</h2>
                    <ul className='list-disc list-inside'>
                        <li>Nội dung phải viết bằng tiếng Việt có dấu.</li>
                        <li>Tiêu đề tin không dài quá 100 kí tự</li>
                        <li>
                            Các bạn nên điền đầy đủ thông tin vào các mục để tin
                            đăng có hiệu quả hơn.
                        </li>
                        <li>
                            Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp
                            nhiều lần so với tin rao không có ảnh. Hãy đăng ảnh
                            để được giao dịch nhanh chóng!
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
