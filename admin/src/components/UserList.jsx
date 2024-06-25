import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getListUser, getListUserBlocked } from '../redux/slices/usersSlice';
import {
    apiDeleteUser,
    apiUnBlockUser,
    apiUpdateUser,
} from '../services/users';
import { path } from '../utils/constant';
import icons from '../utils/icons';

const UserList = ({ list, isBlockedUser = false, isRecommend = false }) => {
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //button click
    const handlePageClick = (event) => {
        const page = event.selected + 1;
        try {
            dispatch(getListUser({ page, searchText }));
        } catch (error) {
            console.log(error);
        }
    };
    const handleSearchUser = () => {
        try {
            dispatch(getListUser({ searchText }));
        } catch (error) {
            console.log(error);
        }
    };
    const handleResetUser = () => {
        setSearchText('');
        try {
            dispatch(getListUser({}));
        } catch (error) {
            console.log(error);
        }
    };
    const handleUnBlockUser = (row) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Bạn chắc chắn muốn mở khóa tài khoản ${row.original.name}?`,
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
                    const res = await apiUnBlockUser(row.original.id);
                    console.log(res);
                    // res &&
                    Swal.fire({
                        title: 'Success...',
                        text: 'Mở khóa người dùng thành công!',
                        icon: 'success',
                        confirmButtonColor: '#1266dd',
                        background: '#333',
                        color: '#fff',
                        confirmButtonColor: '#333',
                    }).then(function () {
                        dispatch(getListUserBlocked({}));
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
    const handleUpdateUser = (row) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Bạn chắc chắn muốn khóa tài khoản ${row.original.name}?`,
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
                    const res = await apiUpdateUser(row.original.id);
                    console.log(res);
                    // res &&
                    Swal.fire({
                        title: 'Success...',
                        text: 'Khóa người dùng thành công!',
                        icon: 'success',
                        confirmButtonColor: '#1266dd',
                        background: '#333',
                        color: '#fff',
                        confirmButtonColor: '#333',
                    }).then(function () {
                        dispatch(getListUser({}));
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
    const handleDeleteUser = (row) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Bạn chắc chắn xóa ${row.original.name} khỏi danh sách user?`,
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
                    const res = await apiDeleteUser(row.original.id);
                    console.log(res);
                    // res &&
                    Swal.fire({
                        title: 'Success...',
                        text: 'Xóa người dùng thành công!',
                        icon: 'success',
                        confirmButtonColor: '#1266dd',
                        background: '#333',
                        color: '#fff',
                        confirmButtonColor: '#333',
                    }).then(function () {
                        dispatch(getListUser({}));
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
    const handleViewUser = (row) => {
        if (isRecommend) {
            navigate(`${row.original.id}/${path.USER_POST_SAVED}`);
        } else {
            navigate(`${row.original.id}`);
        }
    };

    //button click

    //tanstack table
    const userListTableColumn = [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'Avatar',
            // accessorKey: 'avatar',
            cell: ({ row }) => {
                return (
                    <div className='w-full flex items-center justify-center'>
                        <img
                            src={row.original.avatar}
                            alt={''}
                            className='object-cover w-10 h-10 rounded-full'
                        />
                    </div>
                );
            },
        },
        {
            header: 'Email',
            accessorKey: 'email',
        },
        {
            header: 'Name',
            accessorKey: 'name',
        },
        {
            header: 'Phone Number',
            accessorKey: 'phoneNumber',
        },
        {
            header: 'Facebook',
            accessorKey: 'facebook',
        },
        {
            header: 'Action',
            cell: ({ row }) => {
                return (
                    <div className='flex justify-center gap-2'>
                        {!isRecommend && (
                            <div className='flex gap-2'>
                                {isBlockedUser ? (
                                    <button
                                        className='bg-emerald-500 flex items-center justify-center px-2 py-1 rounded'
                                        onClick={() => handleUnBlockUser(row)}
                                    >
                                        <icons.CgUnblock size={16} />
                                    </button>
                                ) : (
                                    <button
                                        className='bg-emerald-500 flex items-center justify-center px-2 py-1 rounded'
                                        onClick={() => handleUpdateUser(row)}
                                    >
                                        <icons.ImBlocked size={16} />
                                    </button>
                                )}
                                <button
                                    className='bg-rose-500 flex items-center justify-center px-2 py-1 rounded'
                                    onClick={() => handleDeleteUser(row)}
                                >
                                    <icons.MdDelete size={16} />
                                </button>
                            </div>
                        )}
                        {!isBlockedUser && (
                            <button
                                className='bg-green-500 flex items-center justify-center px-2 py-1 rounded'
                                onClick={() => handleViewUser(row)}
                            >
                                <icons.IoEyeSharp size={16} />
                            </button>
                        )}
                    </div>
                );
            },
        },
    ];
    const userTable = useReactTable({
        data: list?.items,
        columns: userListTableColumn,
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
                        onClick={handleSearchUser}
                    >
                        <icons.FiSearch size={16} />
                        Tìm kiếm
                    </button>
                    <button
                        className='px-2 py-1 flex items-center justify-center gap-2 bg-secondary rounded'
                        onClick={handleResetUser}
                    >
                        <icons.LiaUndoAltSolid size={16} />
                        Reset
                    </button>
                    <span className=''>
                        Tổng: <strong>{list?.meta.totalItems}</strong> kết quả
                    </span>
                </div>
                {/* <div>
                    <button
                        className='px-2 flex items-center justify-center gap-2 py-1 bg-secondary rounded'
                        onClick={handleAddNewUser}
                    >
                        <icons.RiUserAddFill size={16} />
                        Add
                    </button>
                </div> */}
            </div>
            <div className='w-full'>
                <table className='w-full rounded overflow-hidden'>
                    <thead className='bg-[#282d37]'>
                        {userTable.getHeaderGroups().map((headerGroup) => (
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
                        {userTable.getRowModel().rows.map((row) => (
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

export default UserList;
