import React, { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { authIsLogginSelector } from '../../redux/selectors/authSelector';
import {
    postsRecommendSelector,
    postsSelector,
} from '../../redux/selectors/postsSelector';
import postSlice, {
    getAllPostSaved,
    getAllPosts,
    getPostRecommend,
} from '../../redux/slices/postSlice';
import PostList from './PostList';

function HomePage() {
    const isLoggedIn = useSelector(authIsLogginSelector);
    const dispatch = useDispatch();
    const posts = useSelector(postsSelector);
    const postsRecommend = useSelector(postsRecommendSelector);
    const amount = 2;
    console.log('postRecommend', postsRecommend);

    const handlePageClick = (event) => {
        const page = event.selected + 1;
        try {
            dispatch(getAllPosts({ page }));
        } catch (error) {
            console.log(error);
        }
    };

    const handleSortByNewest = () => {
        dispatch(
            getAllPosts({ orderBy: 'CREATED_DATE', orderDirection: 'desc' })
        );
        dispatch(postSlice.actions.clearPostRecommend());
    };
    const handleSortByDefault = () => {
        dispatch(getAllPosts({}));
        dispatch(postSlice.actions.clearPostRecommend());
    };
    const handleSortByRecommended = () => {
        try {
            dispatch(getPostRecommend({ amount }));
        } catch (error) {
            console.log(error);
            error &&
                Swal.fire({
                    title: 'Oops...',
                    text: error.message,
                    icon: 'error',
                    confirmButtonColor: '#1266dd',
                });
        }
    };

    useEffect(() => {
        dispatch(getAllPosts({}));
        dispatch(getAllPostSaved({}));
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='w-4/6 flex flex-col'>
            <div className='w-full p-5 rounded-lg border border-solid shadow-md bg-white'>
                <div className='w-full flex flex-col gap-3'>
                    <h3 className='text-xl font-semibold'>
                        Tổng {postsRecommend ? amount : posts?.meta.totalItems}{' '}
                        kết quả
                    </h3>
                    <div className='w-full flex items-center gap-2'>
                        <span>Sắp xếp:</span>
                        <button
                            className='px-2 py-1 bg-primary hover:bg-[#e7f0f7] hover:underline rounded-lg'
                            onClick={handleSortByDefault}
                        >
                            Mặc định
                        </button>
                        <button
                            className='px-2 p-1 bg-primary hover:bg-[#e7f0f7] hover:underline rounded-lg'
                            onClick={handleSortByNewest}
                        >
                            Mới nhất
                        </button>
                        {isLoggedIn && (
                            <button
                                className='px-2 p-1 bg-primary hover:bg-[#e7f0f7] hover:underline rounded-lg'
                                onClick={handleSortByRecommended}
                            >
                                Phù hợp nhất
                            </button>
                        )}
                    </div>
                    <PostList postsRecommend={postsRecommend} />
                </div>
            </div>
            <ReactPaginate
                breakLabel='...'
                nextLabel='>'
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={postsRecommend ? 1 : posts?.meta.totalPages}
                // pageCount={10}
                previousLabel='<'
                renderOnZeroPageCount={null}
                className='w-full flex items-center justify-center gap-1 mt-4'
                pageClassName='border overflow-hidden bg-white border-main w-12 h-12 rounded cursor-pointer hover:bg-tertiary hover:text-white'
                pageLinkClassName='w-full h-full flex items-center justify-center'
                activeLinkClassName='w-full h-full flex items-center justify-center bg-tertiary text-white'
                breakClassName='border border-main text-black bg-white flex items-center justify-center w-12 h-12 rounded cursor-pointer hover:bg-tertiary hover:text-white'
                nextClassName='border border-main bg-white text-black flex items-center justify-center px-1 w-12  h-12 rounded cursor-pointer hover:bg-tertiary hover:text-white'
                nextLinkClassName='w-full h-full flex items-center justify-center'
                previousClassName='border border-main bg-white text-black flex items-center justify-center px-1 w-12 h-12 rounded cursor-pointer hover:bg-tertiary hover:text-white'
                previousLinkClassName='w-full h-full flex items-center justify-center'
            />
        </div>
    );
}

export default HomePage;
