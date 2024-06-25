import React from 'react';
import { useSelector } from 'react-redux';
import { categorySelector } from '../redux/selectors/categorySelector';
import { currentUserSelector } from '../redux/selectors/currentUserSelector';
import Select from './Select';

const target = [
    { code: 'MALE', value: 'Nam' },
    { code: 'FEMALE', value: 'Nữ' },
];

function CreatePostDetail({ payload, setPayload }) {
    const category = useSelector(categorySelector);
    const currentUser = useSelector(currentUserSelector);
    return (
        <div className='w-full mb-12'>
            <h2 className='text-2xl font-semibold mb-4'>Thông tin mô tả</h2>
            <div className='w-1/2 flex flex-col gap-2 mb-4'>
                <Select
                    value={payload.categoryId}
                    setValue={setPayload}
                    keyPayload='categoryId'
                    label={'Loại chuyên mục'}
                    options={category}
                />
            </div>
            <div className='flex flex-col gap-2 mb-4'>
                <label htmlFor='tieude' className='font-medium'>
                    Tiêu đề
                </label>
                <input
                    type='text'
                    id='tieude'
                    className='p-2 border border-solid focus:outline-none border-[#ced4da] rounded'
                    value={payload.title}
                    onChange={(e) => {
                        setPayload((prev) => ({
                            ...prev,
                            title: e.target.value,
                        }));
                    }}
                />
            </div>
            <div className='flex flex-col gap-2 mb-4'>
                <label htmlFor='content' className='font-medium'>
                    Nội dung mô tả
                </label>
                <textarea
                    name='content'
                    id='content'
                    rows={5}
                    className='p-2 focus:outline-none border border-solid border-[#ced4da] rounded'
                    value={payload.desc}
                    onChange={(e) => {
                        setPayload((prev) => ({
                            ...prev,
                            desc: e.target.value,
                        }));
                    }}
                ></textarea>
            </div>
            <div className='w-1/2 flex flex-col gap-2 mb-4'>
                <label htmlFor='contact' className='font-medium'>
                    Thông tin liên hệ
                </label>
                <input
                    type='text'
                    id='contact'
                    disabled
                    value={currentUser?.name}
                    className='p-2 border border-solid border-[#ced4da] rounded'
                />
            </div>
            <div className='w-1/2 flex flex-col gap-2 mb-4'>
                <label htmlFor='phoneNumber' className='font-medium'>
                    Điện thoại
                </label>
                <input
                    type='text'
                    id='phoneNumber'
                    disabled
                    value={currentUser?.phoneNumber}
                    className='p-2 border border-solid border-[#ced4da] rounded'
                />
            </div>
            <div className='w-1/2 flex flex-col gap-2 mb-4'>
                <label htmlFor='price' className='font-medium'>
                    Giá cho thuê
                </label>
                <div className='flex items-center justify-center'>
                    <input
                        type='text'
                        id='price'
                        className='w-full p-2 rounded-l border border-solid focus:outline-none border-[#ced4da]'
                        value={payload.price}
                        onChange={(e) => {
                            setPayload((prev) => ({
                                ...prev,
                                price: parseInt(e.target.value),
                            }));
                        }}
                    />
                    <span className='bg-slate-500 text-white p-2 rounded-r'>
                        Đồng
                    </span>
                </div>
                <small>
                    Vui lòng nhập đầy đủ số, ví dụ 1 triệu thì nhập 1000000.
                </small>
            </div>
            <div className='w-1/2 flex flex-col gap-2 mb-4'>
                <label htmlFor='dientich' className='font-medium'>
                    Diện tích
                </label>
                <div className='flex items-center justify-center'>
                    <input
                        type='number'
                        id='price'
                        className='w-full p-2 rounded-l border border-solid focus:outline-none border-[#ced4da]'
                        value={payload.area}
                        onChange={(e) => {
                            setPayload((prev) => ({
                                ...prev,
                                area: parseInt(e.target.value),
                            }));
                        }}
                    />
                    <span className='bg-slate-500 text-white p-2 rounded-r'>
                        m2
                    </span>
                </div>
            </div>
            <div className='w-1/2 flex flex-col gap-2 mb-4'>
                <label htmlFor='target' className='font-medium'>
                    Đối tượng cho thuê
                </label>
                <select
                    value={payload.gender}
                    onChange={(e) => {
                        setPayload((prev) => ({
                            ...prev,
                            gender: e.target.value,
                        }));
                    }}
                    id='target'
                    className='outline-none border border-gray-300 p-2 rounded'
                >
                    <option value=''>--Chọn đối tượng cho thuê--</option>
                    {target?.map((item) => {
                        return (
                            <option key={item.code} value={item.code}>
                                {item.value}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
}

export default CreatePostDetail;
