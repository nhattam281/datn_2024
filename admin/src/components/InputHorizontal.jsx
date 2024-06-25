import React from 'react';

const InputHorizontal = ({
    text,
    id,
    name,
    type = 'text',
    placeholder,
    labelClassName,
    wrapperClassName,
    className,
    error = '',
    errorClassName,
    ...formiks
}) => {
    return (
        <div className={`${wrapperClassName}`}>
            <div
                className={`flex items-center justify-center w-full box-border`}
            >
                {text && (
                    <label
                        htmlFor={name}
                        className={`font-semibold w-1/2 ${labelClassName}`}
                    >
                        {text}
                    </label>
                )}
                <input
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    className={`flex-1 rounded-md py-2 px-2 ${className} focus:outline-none bg-transparent border border-solid border-main text-white`}
                    {...formiks}
                />
                {/* {error.length > 0 && (
            <span className='font-medium text-xs text-[#f14550]'>
                {error}
            </span>
        )} */}
            </div>
            <div className='w-full flex h-3 justify-end mt-1'>
                <span
                    className={`font-medium text-xs h-3 text-white ${errorClassName}`}
                >
                    {error}
                </span>
            </div>
        </div>
    );
};

export default InputHorizontal;
