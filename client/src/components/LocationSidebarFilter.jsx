import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPosts } from '../redux/slices/postSlice';
import { apiProvince } from '../services/province';

const LocationSidebarFilter = () => {
    const [provinces, setprovinces] = useState();
    const dispatch = useDispatch();

    const handleSearchLocation = (item) => {
        dispatch(getAllPosts({ provinceId: item.id }));
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const fetchProvince = async () => {
            const res = await apiProvince();
            if (res) {
                setprovinces(res);
            }
        };
        fetchProvince();
    }, []);

    return (
        <div>
            <div className='p-5 mb-5 bg-white rounded-lg shadow-md border border-solid'>
                <h3 className='text-xl font-semibold'>
                    Xem theo tỉnh/thành phố
                </h3>
                <div className='w-full h-[500px] overflow-y-auto scrollbar-none'>
                    <ul className='w-full mt-2 h-full list-none text-base'>
                        {provinces?.map((item) => (
                            <li
                                key={item.id}
                                className={`py-3 border-b hover:text-primary hover:cursor-pointer`}
                                onClick={() => handleSearchLocation(item)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LocationSidebarFilter;
