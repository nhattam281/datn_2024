import React, { useState } from 'react';
import icons from '../utils/icons';

const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevios = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className='w-full h-full relative'>
            <div
                className='w-12 h-12 absolute top-2/4 translate-x-1/2 left-8 bg-transparent flex items-center justify-center rounded-full hover:cursor-pointer z-[1]'
                onClick={goToPrevios}
            >
                <icons.TbPlayerTrackPrevFilled size={40} />
            </div>
            <div
                className='w-12 h-12 absolute top-2/4 -translate-x-2/4 right-8 bg-transparent flex items-center justify-center rounded-full hover:cursor-pointer z-[1]'
                onClick={goToNext}
            >
                <icons.TbPlayerTrackNextFilled size={40} />
            </div>
            {slides && (
                <div className={'w-full h-full rounded overflow-hidden'}>
                    <img
                        src={slides[currentIndex]?.image?.url}
                        alt=''
                        className='w-full h-[400px] object-contain object-center'
                    />
                </div>
            )}
        </div>
    );
};

export default ImageSlider;
