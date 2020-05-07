export const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isValidEmail = value => emailPattern.test(value);

export const isValidPassword = value => value.length >= 8;

export const isValidDodoCode = value => /^[A-Za-z0-9]{5}$/.test(value);

export const isNumeric = value => !/\D/.test(value);
