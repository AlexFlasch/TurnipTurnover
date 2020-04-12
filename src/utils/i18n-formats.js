import format from 'date-fns/format';

const mdyDateFormatString = 'MM/dd/y';
const dmyDateFormatString = 'dd/MM/y';
const ymdDateFormatString = 'y/MM/dd';
const ydmDateFormatString = 'y/dd/MM';
const time12hFormatString = 'hh:mm a';
const time24hFormatString = 'HH:mm';

// date/time/datetime formats
export const mdy12hDatetimeFormat = datetime =>
  format(datetime, `${mdyDateFormatString} ${time12hFormatString}`);

export const mdy24hDatetimeFormat = datetime =>
  format(datetime, `${mdyDateFormatString} ${time24hFormatString}`);

export const dmy12hDatetimeFormat = datetime =>
  format(datetime, `${dmyDateFormatString} ${time12hFormatString}`);

export const dmy24hDatetimeFormat = datetime =>
  format(datetime, `${dmyDateFormatString} ${time24hFormatString}`);

export const ymd12hDatetimeFormat = datetime =>
  format(datetime, `${ymdDateFormatString} ${time12hFormatString}`);

export const ymd24hDatetimeFormat = datetime =>
  format(datetime, `${ymdDateFormatString} ${time24hFormatString}`);

export const ydm12hDatetimeFormat = datetime =>
  format(datetime, `${ydmDateFormatString} ${time12hFormatString}`);

export const ydm24hDatetimeFormat = datetime =>
  format(datetime, `${ydmDateFormatString} ${time24hFormatString}`);
