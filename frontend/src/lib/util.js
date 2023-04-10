import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInWeeks,
  format,
} from 'date-fns';

const formatCommentTimestamp = (timestamp) => {
  const now = Date.now();
  const mins = differenceInMinutes(now, timestamp);
  const hours = differenceInHours(now, timestamp);
  const days = differenceInDays(now, timestamp);
  const weeks = differenceInWeeks(now, timestamp);
  const formatTimestamp =
    mins > 60 ? (hours > 24 ? (days > 7 ? `${weeks}w` : `${days}d`) : `${hours}h`) : `${mins}m`;
  return formatTimestamp;
};

const formatPostTimestamp = (timestamp) => {
  const now = Date.now();
  const mins = differenceInMinutes(now, timestamp);
  const hours = differenceInHours(now, timestamp);
  const days = differenceInDays(now, timestamp);

  const formatTimestamp =
    mins > 60
      ? hours > 24
        ? days > 7
          ? format(timestamp, 'MMMM d')
          : `${days}d`
        : `${hours}h`
      : `${mins}m`;
  return formatTimestamp;
};

const isGCSUri = (file) =>
  typeof file === 'string' && file.includes('https://storage.googleapis.com');

export { formatCommentTimestamp, formatPostTimestamp, isGCSUri };
