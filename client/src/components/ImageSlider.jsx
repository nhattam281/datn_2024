import React, { useState } from 'react';
import icons from '../utils/icons';

const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevios = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides?.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const goToNext = () => {
        const isLastSlide = currentIndex === slides?.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className='w-full rounded-t overflow-hidden min-h-[325px] bg-black relative'>
            <div
                className='p-2 absolute top-[40%] left-4 bg-[#FEBB02] flex items-center justify-center hover:cursor-pointer z-[1] rounded-full'
                onClick={goToPrevios}
            >
                <icons.MdNavigateBefore size={34} />
            </div>
            <div
                className='p-2 absolute top-[40%] right-4 bg-[#FEBB02] flex items-center justify-center rounded-full hover:cursor-pointer z-[1]'
                onClick={goToNext}
            >
                <icons.MdNavigateNext size={34} />
            </div>
            {slides && (
                <div className={'w-full h-full overflow-hidden'}>
                    <img
                        src={slides[currentIndex]?.image?.url}
                        alt=''
                        className='w-full h-[325px] object-contain object-center'
                    />
                </div>
            )}
        </div>
    );
};

export default ImageSlider;
