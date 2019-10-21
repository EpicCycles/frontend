/* eslint-disable max-len */
import { INVALID_EMAIL, INVALID_POSTCODE, INVALID_URL } from './error';
import { POSTCODE_RULES } from './constants';
const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateEmailFormat = email => {
  if (!email) return;
  if (!emailPattern.test(email)) return INVALID_EMAIL;
};
export const validateURLAndReturnError = url => {
  if (url) {
    if (!urlPattern.test(url)) return INVALID_URL;
  }
};
export const validatePostcodeAndReturnError = (postcode = '', model = {}) => {
  let error;
  const postcodeRule = POSTCODE_RULES.filter(rule => rule.countryCode === model.country);
  if (postcodeRule[0]) {
    const OK = RegExp(postcodeRule[0].regex).exec(postcode.toUpperCase());
    if (!OK) error = INVALID_POSTCODE + postcodeRule[0].display;
  }
  return error;
};
