import React from 'react';
import ProvinceButton from './ProvinceButton';

const location = [
    {
        id: 'hcm',
        name: 'TP Hồ Chí Minh',
        image: 'https://phongtro123.com/images/location_hcm.jpg',
    },
    {
        name: 'Hà Nội',
        image: 'https://phongtro123.com/images/location_hn.jpg',
        id: 'hn',
    },
    {
        name: 'Đà Nẵng',
        image: 'https://phongtro123.com/images/location_dn.jpg',
        id: 'dn',
    },
];

function BannerLocation() {
    return (
        <div className='w-full flex flex-col justify-center items-center my-3'>
            <h2 className='font-semibold mb-4'>Khu vực nổi bật</h2>
            <div className='w-full flex items-center justify-center gap-4'>
                {location.map((item) => {
                    return (
                        <ProvinceButton
                            key={item.id}
                            image={item.image}
                            name={item.name}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default BannerLocation;
