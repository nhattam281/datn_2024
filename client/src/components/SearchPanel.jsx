import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPosts } from '../redux/slices/postSlice';
import icons from '../utils/icons';
import CategoryModal from './CategoryModal';
import SearchAreaModal from './SearchAreaModal';
import SearchLocationModal from './SearchLocationModal';
import SearchPriceModal from './SearchPriceModal';

function SearchPanel() {
    const dispatch = useDispatch();

    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [openLocationModal, setOpenLocationModal] = useState(false);
    const [openPriceModal, setOpenPriceModal] = useState(false);
    const [openAreaModal, setOpenAreaModal] = useState(false);

    const [categorySearch, setCategorySearch] = useState(null);
    const [locationSearch, setLocationSearch] = useState();
    const [priceSearch, setPriceSearch] = useState();
    const [areaSearch, setAreaSearch] = useState();

    const handleSearchCategory = () => {
        setOpenCategoryModal(true);
    };
    const handleSearchLocation = () => {
        setOpenLocationModal(true);
    };
    const handleSearchPrice = () => {
        setOpenPriceModal(true);
    };
    const handleSearchArea = () => {
        setOpenAreaModal(true);
    };
    const handleSearch = () => {
        // console.log('category', categorySearch?.id);
        // const categoryId = categorySearch?.id;
        dispatch(
            getAllPosts({
                // categoryId,
                provinceId: locationSearch.id,
            })
        );
    };

    return (
        <div className='w-full flex justify-center items-center mt-3'>
            <div className='w-[1100px] p-2 flex items-center h-14 rounded-lg bg-[#febb02] gap-2'>
                <div className='flex-1 flex items-center justify-center gap-2'>
                    <div
                        className='flex-1 px-2 flex items-center gap-1 bg-white rounded h-10 hover:cursor-pointer'
                        onClick={handleSearchCategory}
                    >
                        <icons.BiCategoryAlt size={16} />
                        <span className='line-clamp-1'>{`${
                            categorySearch
                                ? categorySearch.name
                                : 'Chọn danh mục'
                        }`}</span>
                    </div>
                    <div
                        className='flex-1 px-2 flex items-center gap-1 bg-white rounded h-10 hover:cursor-pointer'
                        onClick={handleSearchLocation}
                    >
                        <icons.IoLocationOutline size={16} />
                        <span className='line-clamp-1'>{`${
                            locationSearch ? locationSearch.name : 'Toàn quốc'
                        }`}</span>
                    </div>
                    <div
                        className='flex-1 px-2 flex items-center gap-1 bg-white rounded h-10 hover:cursor-pointer'
                        onClick={handleSearchPrice}
                    >
                        <icons.IoPricetagsOutline size={16} />
                        <span>Chọn giá</span>
                    </div>
                    <div
                        className='flex-1 px-2 flex items-center gap-1 bg-white rounded h-10 hover:cursor-pointer'
                        onClick={handleSearchArea}
                    >
                        <icons.SiZedindustries size={16} />
                        <span>Chọn diện tích</span>
                    </div>
                </div>
                <div
                    className='w-[210px] h-10 rounded-lg text-white bg-secondary flex items-center justify-center gap-1 cursor-pointer'
                    onClick={handleSearch}
                >
                    <icons.IoIosSearch className='w-[28px] h-[28px]' />
                    Tìm kiếm
                </div>
            </div>
            {openCategoryModal && (
                <CategoryModal
                    closeModal={setOpenCategoryModal}
                    categorySearch={categorySearch}
                    setCategorySearch={setCategorySearch}
                />
            )}
            {openLocationModal && (
                <SearchLocationModal
                    closeModal={setOpenLocationModal}
                    locationSearch={locationSearch}
                    setLocationSearch={setLocationSearch}
                />
            )}
            {openPriceModal && (
                <SearchPriceModal closeModal={setOpenPriceModal} />
            )}
            {openAreaModal && <SearchAreaModal closeModal={setOpenAreaModal} />}
        </div>
    );
}

export default SearchPanel;
