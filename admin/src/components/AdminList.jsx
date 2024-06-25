import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { adminsSelector } from '../redux/selectors/adminsSelector';
import { getListAdmin } from '../redux/slices/adminsSlice';
import { deleteAdmin } from '../services/admins';
import icons from '../utils/icons';
import AddNewAdminModal from './AddNewAdminModal';
import UpdateAdminModal from './UpdateAdminModal';

const AdminList = ({ list }) => {
    const [openModal, setOpenModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [adminUpdateInfo, setAdminUpdateInfo] = useState(null);
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();

    const handlePageClick = async (event) => {
        // event.preventDefault();
        // console.log(event.selected);
        const page = event.selected + 1;
        try {
            console.log('searchText', searchText);
            dispatch(getListAdmin({ page, searchText }));
            // console.log(list);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateAdmin = (row) => {
        setAdminUpdateInfo(row.original);
        setOpenUpdateModal(true);
        setSearchText('');
    };
    const handleDeleteAdmin = (row) => {
        Swal.fire({
            title: 'Success...',
            text: `Bạn chắc chắn xóa ${row.original.name} khỏi danh sách admin?`,
            icon: 'success',
            background: '#333',
            color: '#fff',
            confirmButtonColor: '#1266dd',
            showDenyButton: true,
            denyButtonText: 'Deny',
            denyButtonColor: '#e81b1b',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await deleteAdmin(row.original.id);
                    console.log(res);
                    // res &&
                    Swal.fire({
                        title: 'Success...',
                        text: 'Xóa admin thành công!',
                        icon: 'success',
                        confirmButtonColor: '#1266dd',
                        background: '#333',
                        color: '#fff',
                        confirmButtonColor: '#333',
                    }).then(function () {
                        dispatch(getListAdmin({}));
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
    const handleAddNewAdmin = () => {
        // e.preventDefault();
        setSearchText('');
        setOpenModal(true);
    };
    const handleSearchAdmin = () => {
        try {
            dispatch(getListAdmin({ searchText }));
            // setSearchText('');
        } catch (error) {
            console.log(error);
        }
    };

    const handleResetAdmin = () => {
        setSearchText('');
        try {
            dispatch(getListAdmin({}));
        } catch (error) {
            console.log(error);
        }
    };

    // const adminList = useSelector(adminsSelector) || [];
    // const adminList = [];

    const adminListTableColumn = [
        {
            header: 'ID',
            accessorKey: 'id',
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
            header: 'Role',
            accessorKey: 'role',
        },
        {
            header: 'Action',
            cell: ({ row }) => {
                return (
                    <div className='flex gap-2'>
                        <button
                            className='bg-emerald-500 flex items-center justify-center px-2 py-1 rounded'
                            onClick={() => handleUpdateAdmin(row)}
                        >
                            <icons.FaPenToSquare size={16} />
                        </button>
                        <button
                            className='bg-rose-500 flex items-center justify-center px-2 py-1 rounded'
                            onClick={() => handleDeleteAdmin(row)}
                        >
                            <icons.MdDelete size={16} />
                        </button>
                    </div>
                );
            },
        },
    ];

    // const [sorting, setSorting] = useState([]);

    const adminTable = useReactTable({
        data: list?.items,
        columns: adminListTableColumn,
        getCoreRowModel: getCoreRowModel(),
        // state: {
        //     openModal,
        // },
        // onStateChange: setOpenModal,
        onPaginationChange: () => undefined,
    });

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
                        onClick={handleSearchAdmin}
                    >
                        <icons.FiSearch size={16} />
                        Tìm kiếm
                    </button>
                    <button
                        className='px-2 py-1 flex items-center justify-center gap-2 bg-secondary rounded'
                        onClick={handleResetAdmin}
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
                        onClick={handleAddNewAdmin}
                    >
                        <icons.RiUserAddFill size={16} />
                        Add
                    </button>
                </div>
            </div>
            <div className='w-full'>
                <table className='w-full rounded overflow-hidden'>
                    <thead className='bg-[#282d37]'>
                        {adminTable.getHeaderGroups().map((headerGroup) => (
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
                        {adminTable.getRowModel().rows.map((row) => (
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

            {openModal && <AddNewAdminModal closeModal={setOpenModal} />}
            {openUpdateModal && (
                <UpdateAdminModal
                    closeModal={setOpenUpdateModal}
                    adminInfo={adminUpdateInfo}
                />
            )}
        </div>
    );
};

export default AdminList;
