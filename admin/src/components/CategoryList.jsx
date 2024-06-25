import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { getListCategory } from '../redux/slices/categorySlice';
import { deleteCategory } from '../services/category';
import icons from '../utils/icons';
import AddNewCategoryModal from './AddNewCategoryModal';
import UpdateCategoryModal from './UpdateCategoryModal';

const CategoryList = ({ list }) => {
    const [searchText, setSearchText] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [categoryUpdateInfo, setCategoryUpdateInfo] = useState(null);

    const dispatch = useDispatch();

    // button click
    const handleSearchCategory = () => {
        try {
            dispatch(getListCategory({ searchText }));
        } catch (error) {
            console.log(error);
        }
    };
    const handleAddNewCategory = () => {
        setOpenModal(true);
    };

    const handlePageClick = (event) => {
        const page = event.selected + 1;
        try {
            dispatch(getListCategory({ page, searchText }));
        } catch (error) {
            console.log(error);
        }
    };

    const handleResetCategory = () => {
        setSearchText('');
        try {
            dispatch(getListCategory({}));
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateCategory = (row) => {
        // alert(row.original.name);
        setCategoryUpdateInfo(row.original);
        console.log('categoryUpdateInfo', categoryUpdateInfo);
        setOpenUpdateModal(true);
    };
    const handleDeleteCategory = (row) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Bạn chắc chắn xóa ${row.original.name} khỏi danh sách category?`,
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
                    const res = await deleteCategory(row.original.id);
                    console.log(res);
                    Swal.fire({
                        title: 'Success...',
                        text: 'Xóa danh mục thành công!',
                        icon: 'success',
                        confirmButtonColor: '#1266dd',
                        background: '#333',
                        color: '#fff',
                        confirmButtonColor: '#333',
                    }).then(function () {
                        dispatch(getListCategory({}));
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

    // button click

    // tanstack table
    const categoryListTableColumn = [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'Name',
            accessorKey: 'name',
        },
        {
            header: 'Description',
            accessorKey: 'desc',
        },
        {
            header: 'Action',
            cell: ({ row }) => {
                return (
                    <div className='flex gap-2'>
                        <button
                            className='bg-emerald-500 flex items-center justify-center px-2 py-1 rounded'
                            onClick={() => handleUpdateCategory(row)}
                        >
                            <icons.FaPenToSquare size={16} />
                        </button>
                        <button
                            className='bg-rose-500 flex items-center justify-center px-2 py-1 rounded'
                            onClick={() => handleDeleteCategory(row)}
                        >
                            <icons.MdDelete size={16} />
                        </button>
                    </div>
                );
            },
        },
    ];

    const categoryTable = useReactTable({
        data: list?.items,
        columns: categoryListTableColumn,
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: () => undefined,
    });
    // tanstack table
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
                        onClick={handleSearchCategory}
                    >
                        <icons.FiSearch size={16} />
                        Tìm kiếm
                    </button>
                    <button
                        className='px-2 py-1 flex items-center justify-center gap-2 bg-secondary rounded'
                        onClick={handleResetCategory}
                    >
                        <icons.LiaUndoAltSolid size={16} />
                        Reset
                    </button>
                    <span className=''>
                        Tổng: <strong>{list?.meta.totalItems}</strong> kết quả
                    </span>
                </div>
                <div>
                    <button
                        className='px-2 flex items-center justify-center gap-2 py-1 bg-secondary rounded'
                        onClick={handleAddNewCategory}
                    >
                        <icons.RiUserAddFill size={16} />
                        Add
                    </button>
                </div>
            </div>
            <div className='w-full'>
                <table className='w-full rounded overflow-hidden'>
                    <thead className='bg-[#282d37]'>
                        {categoryTable.getHeaderGroups().map((headerGroup) => (
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
                        {categoryTable.getRowModel().rows.map((row) => (
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
            {openModal && <AddNewCategoryModal closeModal={setOpenModal} />}
            {openUpdateModal && (
                <UpdateCategoryModal
                    closeModal={setOpenUpdateModal}
                    categoryInfo={categoryUpdateInfo}
                />
            )}
        </div>
    );
};

export default CategoryList;
