import React from 'react';

function Input({
    text,
    id,
    name,
    type = 'text',
    placeholder,
    className,
    error = '',
    errorClass,
    ...formiks
}) {
    return (
        <div className='flex flex-col gap-2 mb-6 w-full box-border'>
            {text && (
                <label htmlFor={name} className='font-semibold mb-2'>
                    {text}
                </label>
            )}
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                className={`rounded-lg py-2 px-2 ${className} focus:outline-none bg-[#e8f0fe]`}
                {...formiks}
            />
            {/* {error.length > 0 && (
                <span className='font-medium text-xs text-[#f14550]'>
                    {error}
                </span>
            )} */}
            <span className={`font-medium text-xs h-3 ${errorClass}`}>
                {error}
            </span>
        </div>
    );
}

export default Input;
