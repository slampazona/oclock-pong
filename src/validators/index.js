import dayjs from 'dayjs';

export const isDayjsDate = (format = 'YYYY-MM-DD') => (date) => dayjs(date, format).format(format) === date;