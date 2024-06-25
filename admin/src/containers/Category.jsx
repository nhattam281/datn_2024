import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryList from '../components/CategoryList';
import Footer from '../components/Footer';
import { categorySelector } from '../redux/selectors/categorySelector';
import { getListCategory } from '../redux/slices/categorySlice';

const Category = () => {
    const category = useSelector(categorySelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListCategory({}));
    }, []);

    return (
        <div className='text-white flex-grow flex flex-col ml-64 overflow-y-auto bg-primary'>
            <div className='w-full px-6 py-4 flex items-center bg-main border-b border-main'>
                <h1>Quản lý danh mục</h1>
            </div>
            <div className='p-6'>
                <div className='rounded overflow-hidden bg-main'>
                    <div className='px-4 py-2 bg-[#282d37]'>
                        <h1>Thay đổi, thêm các danh mục của website</h1>
                    </div>
                    <div className='w-full flex items-center justify-center px-4 py-6'>
                        {category && <CategoryList list={category} />}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Category;
