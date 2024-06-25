import React from 'react';
import { useSelector } from 'react-redux';
import { categorySelector } from '../redux/selectors/categorySelector';
import icons from '../utils/icons';

const CategoryModal = ({ closeModal, categorySearch, setCategorySearch }) => {
    const category = useSelector(categorySelector);

    const handleCloseModal = () => {
        closeModal(false);
    };
    const handleSearchCategory = (item) => {
        setCategorySearch(item);
        closeModal(false);
    };

    return (
        <div className='w-screen h-screen flex items-center justify-center fixed inset-0 z-50 bg-[#212631] bg-opacity-50 py-2'>
            <div className='w-2/5 h-3/5 flex flex-col rounded-md justify-between bg-white'>
                <div className='w-full h-11 flex items-center justify-center border-b'>
                    <h1 className='uppercase font-bold'>Chọn loại danh mục</h1>
                </div>
                <div className='w-full flex-1 px-6 py-3 overflow-y-auto scrollbar-thin'>
                    <ul>
                        <li
                            className={`${
                                categorySearch?.name == null
                                    ? 'font-semibold'
                                    : ''
                            } py-3 border-b hover:text-primary hover:cursor-pointer`}
                        >
                            Tất cả
                        </li>
                        {category.map((item) => (
                            <li
                                key={item.id}
                                className={`${
                                    categorySearch?.name == item.name
                                        ? 'font-semibold'
                                        : ''
                                } py-3 border-b hover:text-primary hover:cursor-pointer`}
                                onClick={() => handleSearchCategory(item)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div
                    className='w-full p-4 flex justify-center bg-orange-400 items-center gap-2 hover:cursor-pointer'
                    onClick={handleCloseModal}
                >
                    <h1 className='font-semibold'>Đóng</h1>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;
