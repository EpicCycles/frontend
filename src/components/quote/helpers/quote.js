import { getNameForValue } from '../../app/model/helpers/model';
import { findObjectWithId } from '../../../helpers/utils';
import { formattedDate } from '../../app/model/helpers/display';
import { bikeFullName } from '../../bike/helpers/bike';

export const QUOTE_INITIAL = '1';
export const QUOTE_ISSUED = '2';
export const QUOTE_ARCHIVED = '3';
export const QUOTE_ORDERED = '4';
export const QUOTE_STATUS_CHOICES = [
  { value: QUOTE_INITIAL, name: 'New' },
  { value: QUOTE_ISSUED, name: 'Issued' },
  { value: QUOTE_ARCHIVED, name: 'Archived' },
  { value: QUOTE_ORDERED, name: 'Order Created' },
];

export const getQuoteStatus = quote_status => {
  return getNameForValue(quote_status, QUOTE_STATUS_CHOICES);
};

export const quoteDescription = (customer, bike, customers, frames, bikes, brands) => {
  let quote_desc;
  let bikeObject;
  const customerObject = findObjectWithId(customers, customer);
  const customerName = customerObject
    ? `${customerObject.first_name} ${customerObject.last_name}/`
    : '';
  if (bike) {
    bikeObject = findObjectWithId(bikes, bike);
  }
  if (bikeObject) {
    quote_desc = bikeFullName(bikeObject, frames, brands);
  } else if (bike) {
    quote_desc = 'Bike';
  } else {
    quote_desc = 'Parts only';
  }
  return `${customerName}${quote_desc} - ${formattedDate(new Date())}`;
};
