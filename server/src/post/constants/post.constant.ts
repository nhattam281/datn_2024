import dayjs from 'dayjs';

export const POST_EXPIRATION_IN_HOURS = dayjs.duration({ days: 5 }).asHours();
