// date masks
const monthMask = [/[01]/, /\d/];
const dayMask = [/[0-3]/, /\d/];
const yearMask = [/\d/, /\d/, /\d/, /\d/];

export const mdyDateMask = [...monthMask, '/', ...dayMask, '/', ...yearMask];
export const dmyDateMask = [...dayMask, '/', ...monthMask, '/', ...yearMask];
export const ymdDateMask = [...yearMask, '/', ...monthMask, '/', ...dayMask];
export const ydmDateMask = [...yearMask, '/', ...dayMask, '/', ...monthMask];

// time masks
const twelveHourMask = [/[01]/, /\d/];
const twentyFourHourMask = [/[0-2]/, /\d/];
const minuteMask = [/[0-5]/, /\d/];
const amPmMask = [/[AP]/, 'M'];

export const twelveHourTimeMask = [
  ...twelveHourMask,
  ':',
  ...minuteMask,
  ' ',
  ...amPmMask,
];
export const twentyFourHourTimeMask = [
  ...twentyFourHourMask,
  ':',
  ...minuteMask,
];

// datetime masks
export const mdy12hDatetimeMask = [...mdyDateMask, ' ', ...twelveHourTimeMask];

export const mdy24hDatetimeMask = [
  ...mdyDateMask,
  ' ',
  ...twentyFourHourTimeMask,
];

export const dmy12hDatetimeMask = [...dmyDateMask, ' ', ...twelveHourTimeMask];

export const dmy24hDatetimeMask = [
  ...dmyDateMask,
  ' ',
  ...twentyFourHourTimeMask,
];

export const ymd12hDatetimeMask = [...ymdDateMask, ' ', ...twelveHourTimeMask];

export const ymd24hDatetimeMask = [
  ...ymdDateMask,
  ' ',
  ...twentyFourHourTimeMask,
];

export const ydm12hDatetimeMask = [...ydmDateMask, ' ', ...twelveHourTimeMask];

export const ydm24hDatetimeMask = [
  ...ydmDateMask,
  ' ',
  ...twentyFourHourTimeMask,
];
