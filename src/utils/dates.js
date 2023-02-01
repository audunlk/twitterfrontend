import { formatDistance } from 'date-fns';

export function getFormattedDate(date) {
    return formatDistance(new Date(date), new Date(), { addSuffix: true });
}