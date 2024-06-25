import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getListPost, getListPostSave } from '../redux/slices/postsSlice';
import {
    // apiDeletePost,
    apiUnBlockPost,
    apiUpdatePost,
} from '../services/posts';
import icons from '../utils/icons';

const PostList = ({
    list,
    isBlockedPost = false,
    isViewOnly = false,
    isPostSaved = false,
    isOwnedByUser = false,
    userId = null,
}) => {
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //button click
    const handlePageClick = (event) => {
        const page = event.selected + 1;
        try {
            if (isPostSaved) {
                dispatch(getListPostSave({ page, searchText, userId }));
            } else if (isOwnedByUser) {
                dispatch(getListPost({ page, searchText, userId }));
            } else {
                dispatch(getListPost({ page, searchText }));
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleSearchPost = () => {
        try {
            if (isPostSaved) {
                dispatch(getListPostSave({ searchText, userId }));
            } else if (isOwnedByUser) {
                dispatch(getListPost({ searchText, userId }));
            } else if (isBlockedPost) {
                const isBlock = true;
                dispatch(getListPost({ searchText, userId, isBlock }));
            } else {
                dispatch(getListPost({ searchText }));
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleResetPost = () => {
        setSearchText('');
        try {
            if (isPostSaved) {
                dispatch(getListPostSave({ userId }));
            } else if (isOwnedByUser) {
                dispatch(getListPost({ userId }));
            } else if (isBlockedPost) {
                const isBlock = true;
                dispatch(getListPost({ isBlock }));
            } else {
                dispatch(getListPost({}));
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleUnBlockPost = (row) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Bạn chắc chắn muốn mở khóa bài đăng có id là ${row.original.id}?`,
            icon: 'warning',
            background: '#333',
            color: '#fff',
            confirmButtonColor: '#1266dd',
            showDenyButton: true,
            denyButtonText: 'Deny',
            denyButtonColor: '#e81b1b',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await apiUnBlockPost(row.original.id);
                    console.log(res);
                    // res &&
                    Swal.fire({
                        title: 'Success...',
                        text: 'Mở khóa bài đăng thành công!',
                        icon: 'success',
                        confirmButtonColor: '#1266dd',
                        background: '#333',
                        color: '#fff',
                        confirmButtonColor: '#333',
                    }).then(function () {
                        const isBlock = true;
                        dispatch(getListPost({ isBlock }));
                    });
                } catch (error) {
                    console.log(error);
                    error &&
                        Swal.fire({
                            title: 'Oops...',
                            text: error.message,
                            icon: 'error',
                            confirmButtonColor: '#1266dd',
                            background: '#333',
                            color: '#fff',
                            confirmButtonColor: '#333',
                        });
                }
            } else if (result.isDenied) {
                Swal.fire({
                    title: 'Cancelled!',
                    text: 'Không có gì thay đổi!',
                    icon: 'error',
                    color: '#fff',
                    background: '#333',
                });
            }
        });
    };
    const handleBlockPost = (row) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Bạn chắc chắn muốn khóa bài đăng có id là ${row.original.id}?`,
            icon: 'warning',
            background: '#333',
            color: '#fff',
            confirmButtonColor: '#1266dd',
            showDenyButton: true,
            denyButtonText: 'Deny',
            denyButtonColor: '#e81b1b',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await apiUpdatePost(row.original.id);
                    console.log(res);
                    // res &&
                    Swal.fire({
                        title: 'Success...',
                        text: 'Khóa bài đăng thành công!',
                        icon: 'success',
                        confirmButtonColor: '#1266dd',
                        background: '#333',
                        color: '#fff',
                        confirmButtonColor: '#333',
                    }).then(function () {
                        dispatch(getListPost({}));
                    });
                } catch (error) {
                    console.log(error);
                    error &&
                        Swal.fire({
                            title: 'Oops...',
                            text: error.message,
                            icon: 'error',
                            confirmButtonColor: '#1266dd',
                            background: '#333',
                            color: '#fff',
                            confirmButtonColor: '#333',
                        });
                }
            } else if (result.isDenied) {
                Swal.fire({
                    title: 'Cancelled!',
                    text: 'Không có gì thay đổi!',
                    icon: 'error',
                    color: '#fff',
                    background: '#333',
                });
            }
        });
    };
    // const handleDeletePost = (row) => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: `Bạn chắc chắn xóa ${row.original.name} khỏi danh sách user?`,
    //         icon: 'warning',
    //         background: '#333',
    //         color: '#fff',
    //         confirmButtonColor: '#1266dd',
    //         showDenyButton: true,
    //         denyButtonText: 'Deny',
    //         denyButtonColor: '#e81b1b',
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             try {
    //                 const res = await apiDeletePost(row.original.id);
    //                 console.log(res);
    //                 // res &&
    //                 Swal.fire({
    //                     title: 'Success...',
    //                     text: 'Xóa bài đăng thành công!',
    //                     icon: 'success',
    //                     confirmButtonColor: '#1266dd',
    //                     background: '#333',
    //                     color: '#fff',
    //                     confirmButtonColor: '#333',
    //                 }).then(function () {
    //                     dispatch(getListPost({}));
    //                 });
    //             } catch (error) {
    //                 console.log(error);
    //                 error &&
    //                     Swal.fire({
    //                         title: 'Oops...',
    //                         text: error.message,
    //                         icon: 'error',
    //                         confirmButtonColor: '#1266dd',
    //                         background: '#333',
    //                         color: '#fff',
    //                         confirmButtonColor: '#333',
    //                     });
    //             }
    //         } else if (result.isDenied) {
    //             Swal.fire({
    //                 title: 'Cancelled!',
    //                 text: 'Không có gì thay đổi!',
    //                 icon: 'error',
    //                 color: '#fff',
    //                 background: '#333',
    //             });
    //         }
    //     });
    // };
    const handleViewPost = (row) => {
        navigate(`${row.original.id}`);
    };
    //button click

    //tanstack table
    const postListTableColumn = [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'Title',
            accessorKey: 'title',
        },
        {
            header: 'Description',
            cell: ({ row }) => {
                return (
                    <p className='w-[300px] line-clamp-3'>
                        {row.original.desc}
                    </p>
                );
            },
        },
        {
            header: 'Price',
            accessorKey: 'price',
        },
        {
            header: 'Expires At',
            accessorKey: 'area',
            cell: ({ row }) => {
                return (
                    <div className='w-[120px]'>
                        <span className='w-full'>
                            {dayjs(row.original.expiresAt).format('DD-MM-YYYY')}
                        </span>
                    </div>
                );
            },
        },
        {
            header: 'Action',
            cell: ({ row }) => {
                return (
                    <div className='flex justify-center gap-2'>
                        {!isViewOnly && (
                            <div className='flex gap-2'>
                                {isBlockedPost ? (
                                    <button
                                        className='bg-emerald-500 flex items-center justify-center px-2 py-1 rounded'
                                        onClick={() => handleUnBlockPost(row)}
                                    >
                                        <icons.CgUnblock size={16} />
                                    </button>
                                ) : (
                                    <button
                                        className='bg-emerald-500 flex items-center justify-center px-2 py-1 rounded'
                                        onClick={() => handleBlockPost(row)}
                                    >
                                        <icons.ImBlocked size={16} />
                                    </button>
                                )}
                                <button
                                    className='bg-rose-500 flex items-center justify-center px-2 py-1 rounded'
                                    onClick={() => handleDeletePost(row)}
                                >
                                    <icons.MdDelete size={16} />
                                </button>
                            </div>
                        )}
                        {!isBlockedPost && (
                            <button
                                className='bg-green-500 flex items-center justify-center px-2 py-1 rounded'
                                onClick={() => handleViewPost(row)}
                            >
                                <icons.IoEyeSharp size={16} />
                            </button>
                        )}
                    </div>
                );
            },
        },
    ];
    const postTable = useReactTable({
        data: list?.items,
        columns: postListTableColumn,
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: () => undefined,
    });
    //tanstack table

    return (
        <div className='w-11/12 flex flex-col items-center justify-center gap-4'>
            <div className='w-full flex justify-between'>
                <div className='flex items-center gap-4'>
                    <input
                        type='text'
                        className='px-2 py-1 rounded bg-transparent focus:outline-none border border-main'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button
                        className='px-2 py-1 flex items-center justify-center gap-2 bg-secondary rounded'
                        onClick={handleSearchPost}
                    >
                        <icons.FiSearch size={16} />
                        Tìm kiếm
                    </button>
                    <button
                        className='px-2 py-1 flex items-center justify-center gap-2 bg-secondary rounded'
                        onClick={handleResetPost}
                    >
                        <icons.LiaUndoAltSolid size={16} />
                        Reset
                    </button>
                    <span className=''>
                        Tổng: <strong>{list?.meta.totalItems}</strong> kết quả
                    </span>
                </div>
            </div>
            <div className='w-full'>
                <table className='w-full rounded overflow-hidden'>
                    <thead className='bg-[#282d37]'>
                        {postTable.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className='px-6 py-3 text-left'
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {postTable.getRowModel().rows.map((row) => (
                            <tr key={row.id} className='border-b border-main'>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className='px-6 py-4'>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='w-full'>
                <ReactPaginate
                    breakLabel='...'
                    nextLabel='>'
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={list?.meta?.totalPages}
                    previousLabel='<'
                    renderOnZeroPageCount={null}
                    containerClassName='w-full flex items-center justify-center gap-1 mt-4'
                    pageClassName='border border-main flex items-center justify-center w-12 h-12 rounded cursor-pointer hover:bg-[#282d37]'
                    pageLinkClassName='w-full h-full flex items-center justify-center'
                    activeLinkClassName='w-full h-full flex items-center justify-center bg-secondary text-white'
                    breakClassName='border border-main flex items-center justify-center w-12 h-12 rounded cursor-pointer hover:bg-[#282d37]'
                    nextClassName='border border-main flex items-center justify-center w-12 px-1 h-12 rounded cursor-pointer hover:bg-[#282d37]'
                    previousClassName='border border-main flex items-center justify-center w-12 px-1 h-12 rounded cursor-pointer hover:bg-[#282d37]'
                    nextLinkClassName='w-full h-full flex items-center justify-center'
                    previousLinkClassName='w-full h-full flex items-center justify-center'
                />
            </div>
        </div>
    );
};

export default PostList;
