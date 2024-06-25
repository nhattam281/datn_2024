import React from 'react';

const SearchAreaModal = ({ closeModal }) => {
    const handleCloseModal = () => {
        closeModal(false);
    };

    return (
        <div className='w-screen h-screen flex items-center justify-center fixed inset-0 z-50 bg-[#212631] bg-opacity-50 py-2'>
            <div className='w-2/5 h-3/5 flex flex-col rounded justify-between overflow-y-auto bg-white scrollbar-none'>
                <div className='w-full h-11 flex items-center justify-center border-b'>
                    <h1 className='uppercase font-bold'>Chọn khu vực</h1>
                </div>
                <div className='w-full flex-1 px-6 py-3 overflow-y-auto scrollbar-thin'>
                    Dien tich
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

export default SearchAreaModal;
