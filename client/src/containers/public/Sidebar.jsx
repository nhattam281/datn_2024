import React from 'react';
import { useDispatch } from 'react-redux';
import LocationSidebarFilter from '../../components/LocationSidebarFilter';
import { getAllPostSaved, getAllPosts } from '../../redux/slices/postSlice';
import icons from '../../utils/icons';

function Sidebar() {
    const dispatch = useDispatch();
    const handleFilterPrice = (minPrice, maxPrice) => {
        dispatch(getAllPosts({ minPrice, maxPrice }));
        dispatch(getAllPostSaved({}));
    };
    const handleFilterAcreage = (minArea, maxArea) => {
        dispatch(getAllPosts({ minArea, maxArea }));
        dispatch(getAllPostSaved({}));
    };

    return (
        <div className='flex-1'>
            <div className='p-5 mb-5 bg-white rounded-lg shadow-md border border-solid'>
                <h3 className='text-xl font-semibold'>Xem theo giá</h3>
                <ul className='w-full mt-2 h-full list-none columns-2'>
                    <li
                        className='py-1 hover:text-red-500  flex items-centertext-gray-700 cursor-pointer'
                        onClick={() => handleFilterPrice(0, 1000000)}
                    >
                        <icons.MdOutlineNavigateNext />
                        Dưới 1 triệu
                    </li>
                    <li
                        className='py-1 hover:text-red-500 flex items-center text-gray-700 cursor-pointer'
                        onClick={() => handleFilterPrice(1000000, 2000000)}
                    >
                        <icons.MdOutlineNavigateNext />
                        Từ 1 - 2 triệu
                    </li>
                    <li
                        className='py-1 hover:text-red-500 flex items-center text-gray-700 cursor-pointer'
                        onClick={() => handleFilterPrice(2000000, 3000000)}
                    >
                        <icons.MdOutlineNavigateNext />
                        Từ 2 - 3 triệu
                    </li>
                    <li
                        className='py-1 hover:text-red-500 flex items-center text-gray-700 cursor-pointer'
                        onClick={() => handleFilterPrice(3000000, 5000000)}
                    >
                        <icons.MdOutlineNavigateNext />
                        Từ 3 - 5 triệu
                    </li>
                    <li
                        className='py-1 hover:text-red-500 flex items-center text-gray-700 cursor-pointer'
                        onClick={() => handleFilterPrice(5000000, 7000000)}
                    >
                        <icons.MdOutlineNavigateNext />
                        Từ 5 - 7 triệu
                    </li>
                    <li
                        className='py-1 hover:text-red-500 flex items-center text-gray-700 cursor-pointer'
                        onClick={() => handleFilterPrice(7000000, 10000000)}
                    >
                        <icons.MdOutlineNavigateNext />
                        Từ 7 - 10 triệu
                    </li>
                    <li
                        className='py-1 hover:text-red-500 flex items-center text-gray-700 cursor-pointer'
                        onClick={() => handleFilterPrice(10000000, 15000000)}
                    >
                        <icons.MdOutlineNavigateNext />
                        Từ 10 - 15 triệu
                    </li>
                    <li
                        className='py-1 hover:text-red-500 flex items-center text-gray-700 cursor-pointer'
                        onClick={() => handleFilterPrice(15000000, 100000000)}
                    >
                        <icons.MdOutlineNavigateNext />
                        Trên 15 triệu
                    </li>
                </ul>
            </div>
            <div className='h-48 p-5 mb-5 bg-white rounded-lg shadow-md border border-solid'>
                <h3 className='text-xl font-semibold'>Xem theo diện tích</h3>
                <ul className='w-full mt-2 h-full list-none columns-2'>
                    <li
                        className='py-1 hover:text-red-500 flex items-center text-gray-700 cursor-pointer'
                        onClick={() => handleFilterAcreage(0, 20)}
                    >
                        <icons.MdOutlineNavigateNext />
                        Dưới 20 m<sup>2</sup>
                    </li>
                    <li
                        className='py-1 hover:text-red-500 flex items-center text-gray-700 cursor-pointer'
                        onClick={() => handleFilterAcreage(20, 30)}
                    >
                        <icons.MdOutlineNavigateNext />
                        Từ 20 - 30m<sup>2</sup>
                    </li>
                    <li
                        className='py-1 hover:text-red-500 flex items-center text-gray-700 cursor-pointer'
                        onClick={() => handleFilterAcreage(30, 50)}
                    >
                        <icons.MdOutlineNavigateNext />
                        Từ 30 - 50m<sup>2</sup>
                    </li>
                    <li
                        className='py-1 hover:text-red-500 flex items-center text-gray-700 cursor-pointer'
                        onClick={() => handleFilterAcreage(50, 70)}
                    >
                        <icons.MdOutlineNavigateNext />
                        Từ 50 - 70m<sup>2</sup>
                    </li>
                    <li
                        className='py-1 hover:text-red-500 flex items-center text-gray-700 cursor-pointer'
                        onClick={() => handleFilterAcreage(70, 90)}
                    >
                        <icons.MdOutlineNavigateNext />
                        Từ 70 - 90m<sup>2</sup>
                    </li>
                    <li
                        className='py-1 hover:text-red-500 flex items-center text-gray-700 cursor-pointer'
                        onClick={() => handleFilterAcreage(90, 1000)}
                    >
                        <icons.MdOutlineNavigateNext />
                        Trên 90m<sup>2</sup>
                    </li>
                </ul>
            </div>
            <LocationSidebarFilter />
            <div className='h-48 p-5 mb-5 bg-white rounded-lg shadow-md border border-solid'>
                <h3 className='text-xl font-semibold'>Có thể bạn quan tâm</h3>
                <ul className='w-full mt-2 h-full list-none text-base'>
                    <li className='py-1 hover:text-red-500 flex items-center text-gray-700 cursor-pointer'>
                        <icons.MdOutlineNavigateNext />
                        Mẫu hợp đồng cho thuê phòng trọ
                    </li>
                    <li className='py-1 hover:text-red-500 flex text-gray-700 cursor-pointer'>
                        <icons.MdOutlineNavigateNext className='h-6' />
                        Cẩn thận các kiểu lừa đảo khi thuê trọ
                    </li>
                    <li className='py-1 hover:text-red-500 flex items-center text-gray-700 cursor-pointer'>
                        <icons.MdOutlineNavigateNext />
                        Kinh nghiệm thuê phòng trọ sinh viên
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
