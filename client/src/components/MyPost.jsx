import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { getMyPost } from '../redux/slices/postSlice';
import { apiDeleteMyPostWithId } from '../services/post';
import icons from '../utils/icons';
import PostDetailModal from './PostDetailModal';
import UpdatePostModal from './UpdatePostModal';

const MyPost = ({ list }) => {
    const [searchText, setSearchText] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [postInfo, setPostInfo] = useState(null);

    const dispatch = useDispatch();
    //button click
    const handlePageClick = (event) => {
        const page = event.selected + 1;
        try {
            dispatch(getMyPost({ page }));
        } catch (error) {
            console.log(error);
        }
    };
    const handeUpdatePost = (row) => {
        setOpenUpdateModal(true);
        setPostInfo(row.original);
    };
    const handleDeletePost = (row) => {
        Swal.fire({
            title: 'Are you sure...',
            text: `Bạn chắc chắn xóa bài đăng có id ${row.original.id}?`,
            icon: 'warning',
            confirmButtonColor: '#1266dd',
            showDenyButton: true,
            denyButtonText: 'Deny',
            denyButtonColor: '#e81b1b',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await apiDeleteMyPostWithId(row.original.id);
                    console.log(res);
                    // res &&
                    Swal.fire({
                        title: 'Success...',
                        text: 'Xóa bài đăng thành công!',
                        icon: 'success',
                        confirmButtonColor: '#1266dd',
                    }).then(function () {
                        dispatch(getMyPost({}));
                    });
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
            } else if (result.isDenied) {
                Swal.fire({
                    title: 'Cancelled!',
                    text: 'Không có gì thay đổi!',
                    icon: 'error',
                });
            }
        });
    };
    const handleViewPost = (row) => {
        setOpenModal(true);
        setPostInfo(row.original);
    };

    const handleSearchPost = () => {
        try {
            dispatch(getMyPost({ searchText }));
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
    const handleResetPost = () => {
        setSearchText('');
        try {
            dispatch(getMyPost({}));
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
    //button click

    //tanstack table
    const postListTableColumn = [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'Title',
            cell: ({ row }) => {
                return (
                    <p className='w-[120px] line-clamp-3'>
                        {row.original.title}
                    </p>
                );
            },
        },
        {
            header: 'Description',
            cell: ({ row }) => {
                return (
                    <p className='w-[280px] line-clamp-3'>
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
            header: 'Status',
            cell: ({ row }) => {
                return (
                    <p className='line-clamp-2'>
                        {dayjs().isAfter(dayjs(row.original.expiresAt))
                            ? 'Hết hạn'
                            : 'Chưa hết hạn'}
                    </p>
                );
            },
        },
        {
            header: 'Expires At',
            accessorKey: 'area',
            cell: ({ row }) => {
                return (
                    <div className='w-[120px] flex flex-col'>
                        <span className='w-full text-wrap'>
                            {dayjs(row.original.expiresAt).format('HH:mm:ss')}
                        </span>
                        <span className='w-full text-wrap'>
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
                    <div className='flex justify-center gap-2 text-white'>
                        <button
                            className='bg-blue-500 flex items-center justify-center px-2 py-2 rounded'
                            onClick={() => handeUpdatePost(row)}
                        >
                            <icons.FaPenToSquare size={16} />
                        </button>
                        <button
                            className='bg-rose-500 flex items-center justify-center px-2 py-2 rounded'
                            onClick={() => handleDeletePost(row)}
                        >
                            <icons.MdDeleteForever size={16} />
                        </button>

                        <button
                            className='bg-green-500 flex items-center justify-center px-2 py-2 rounded'
                            onClick={() => handleViewPost(row)}
                        >
                            <icons.IoEyeSharp size={16} />
                        </button>
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
        <div className='w-full flex flex-col items-center justify-center gap-4'>
            <div className='w-full flex justify-between mt-8'>
                <div className='flex items-center'>
                    <span>
                        Tổng: <strong>{list.meta.totalItems}</strong> kết quả
                    </span>
                </div>
                <div className='flex-1 gap-4 flex items-center justify-end'>
                    <input
                        type='text'
                        className='border-2 border-black rounded px-2 py-1'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button
                        className='bg-secondary  flex items-center justify-center rounded px-2 py-2 text-white gap-2'
                        onClick={handleSearchPost}
                    >
                        <icons.FiSearch size={16} />
                        Tìm kiếm
                    </button>
                    <button
                        className='bg-secondary  flex items-center justify-center rounded px-2 py-2 gap-2 text-white'
                        onClick={handleResetPost}
                    >
                        <icons.LiaUndoAltSolid size={16} />
                        Reset
                    </button>
                </div>
            </div>
            <div className='w-full border rounded'>
                <table className='w-full rounded overflow-hidden'>
                    <thead className=''>
                        {postTable.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className='px-6 py-3 text-left border'
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
                                    <td
                                        key={cell.id}
                                        className='px-6 py-4 border'
                                    >
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
            {openModal && (
                <PostDetailModal
                    closeModal={setOpenModal}
                    postInfo={postInfo}
                />
            )}
            {openUpdateModal && (
                <UpdatePostModal
                    closeModal={setOpenUpdateModal}
                    postInfo={postInfo}
                />
            )}
        </div>
    );
};

export default MyPost;
