export const LOG_TYPES = {
  PRICE_CHECK: 'PRICE_CHECK',
  BUY: 'BUY',
  SELL: 'SELL',
};

export const LOG_TYPES_OPTIONS = [
  { value: LOG_TYPES.PRICE_CHECK, label: 'Price Check' },
  { value: LOG_TYPES.BUY, label: 'Bought Turnips' },
  { value: LOG_TYPES.SELL, label: 'Sold Turnips' },
];

export const TURNIP_INPUT_MODES = {
  STACKS: 'STACKS',
  TOTAL: 'TOTAL',
};

export const TURNIP_INPUT_MODE_OPTIONS = [
  { value: TURNIP_INPUT_MODES.TOTAL, label: 'Total' },
  { value: TURNIP_INPUT_MODES.STACKS, label: 'Stacks' },
];
