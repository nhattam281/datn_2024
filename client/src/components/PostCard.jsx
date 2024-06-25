import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import React from 'react';
import { convertCurrency } from '../utils/convertCurrency';

const PostCard = ({ item }) => {
    dayjs.extend(relativeTime);
    const postDate = dayjs(item?.createdAt).fromNow();

    dayjs.extend(updateLocale);
    dayjs.updateLocale('en', {
        relativeTime: {
            future: 'in %s',
            past: '%s trước',
            s: 'vài giây',
            m: '1 phút',
            mm: '%d phút',
            h: '1 giờ',
            hh: '%d giờ',
            d: '1 ngày',
            dd: '%d ngày',
            M: '1 tháng',
            MM: '%d tháng',
            y: '1 năm',
            yy: '%d năm',
        },
    });

    return (
        <div className='w-full flex gap-4 border-b py-2'>
            <div className='rounded overflow-hidden'>
                <img
                    src={item?.postImages[0]?.image?.url}
                    alt=''
                    className='object-cover object-center w-[80px] h-[80px]'
                />
            </div>
            <div className='flex-1 flex flex-col'>
                <h3 className='text-primary flex-1 mb-1 line-clamp-2'>
                    {item?.title}
                </h3>
                <div className='flex items-center justify-between'>
                    <p className='text-green-500 font-semibold'>{`${convertCurrency(
                        item?.price
                    )}/tháng`}</p>
                    <span className='text-xs'>{postDate}</span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
