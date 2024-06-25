import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPostSaved, getAllPosts } from '../redux/slices/postSlice';

function ProvinceButton({ name, image }) {
    const dispatch = useDispatch();
    const handleFilterProvince = (name) => {
        switch (name) {
            case 'TP Hồ Chí Minh':
                dispatch(getAllPosts({ provinceId: 50 }));
                dispatch(getAllPostSaved({}));
                break;
            case 'Hà Nội':
                dispatch(getAllPosts({ provinceId: 1 }));
                dispatch(getAllPostSaved({}));
                break;
            case 'Đà Nẵng':
                dispatch(getAllPosts({ provinceId: 32 }));
                dispatch(getAllPostSaved({}));
                break;
            default:
                console.log('Tên không hợp lệ');
        }
    };

    return (
        <div
            className='shadow-md rounded-bl-md text-blue-700 rounded-br-md cursor-pointer hover:text-orange-600'
            onClick={() => handleFilterProvince(name)}
        >
            <img
                src={image}
                alt={name}
                className='w-[220px] h-[110px] object-cover rounded-tl-md rounded-tr-md'
            />
            <div className='font-medium p-2 text-center'>{name}</div>
        </div>
    );
}

export default memo(ProvinceButton);
