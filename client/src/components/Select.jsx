import React, { memo } from 'react';

function Select({ label, options, value, setValue, reset, keyPayload }) {
    return (
        <div className='w-full flex flex-col gap-2 mb-4'>
            <label htmlFor='select' className='font-medium'>
                {label}
            </label>
            <select
                value={reset ? '' : parseInt(value)}
                onChange={(e) => {
                    !keyPayload
                        ? setValue(parseInt(e.target.value))
                        : setValue((prev) => ({
                              ...prev,
                              [keyPayload]: parseInt(e.target.value),
                          }));
                }}
                id='select'
                className='outline-none border border-gray-300 p-2 rounded'
            >
                <option value=' '>{`--Chọn ${label}--`}</option>
                {options?.map((item) => {
                    return (
                        <option key={item.id} value={parseInt(item.id)}>
                            {item.name}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

export default memo(Select);
