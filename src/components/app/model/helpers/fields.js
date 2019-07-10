import {
  ADDRESS_MISSING,
  BRAND_MISSING,
  BRAND_NAME_MISSING,
  COUNTRY_MISSING,
  FRAME_NAME_MISSING,
  MODEL_NAME_MISSING,
  PART_NAME_MISSING,
  PART_TYPE_MISSING,
  SELECT_ONE_MISSING,
  SUPPLIER_MISSING,
  VALUE_MISSING,
} from './error';
import {
  validateEmailFormat,
  validatePostcodeAndReturnError,
  validateURLAndReturnError,
} from './validators';
import { COUNTRIES, NUMBER_TYPE_CHOICES } from '../../../address/helpers/address';
import { QUOTE_STATUS_CHOICES } from '../../../quote/helpers/quote';

export const CHECKBOX = 'checkbox';
export const RADIO = 'radio';
export const DATE_TIME = 'date_time';
export const SELECT_ONE = 'select_one';
export const SELECT_MULTIPLE = 'select_multiple';
export const CURRENCY = 'currency';
export const NUMBER = 'number';
export const TEXT = 'text';
export const PASSWORD = 'password';
export const USER = 'user';
export const TEXT_AREA = 'textArea';

export const ADD_DATE = 'add_date';
export const ADDRESS1 = 'address1';
export const ADDRESS2 = 'address2';
export const ADDRESS3 = 'address3';
export const ADDRESS4 = 'address4';
export const ARCHIVED = 'archived';
export const ATTRIBUTE_VALUE = 'attribute_value';
export const OPTION_NAME = 'option_name';
export const BIKE = 'bike';
export const BILLING = 'billing';
export const BIKE_PRICE = 'bike_price';
export const BIKE_BRAND = 'bike_brand';
export const BRAND = 'brand';
export const BRAND_NAME = 'brand_name';
export const CHECK_DATE = 'check_date';
export const CLUB_PRICE = 'club_price';
export const CLUB_MEMBER = 'club_member';
export const COLOUR = 'colour';
export const COLOUR_PRICE = 'colour_price';
export const COLOURS = 'colours';
export const COUNTRY = 'country';
export const CREATED_BY = 'created_by';
export const CREATED_DATE = 'created_date';
export const CUSTOMER = 'customer';
export const CUSTOMER_VISIBLE = 'customer_visible';
export const DESCRIPTION = 'description';
export const EMAIL = 'email';
export const EPIC_PRICE = 'epic_price';
export const FIRST_NAME = 'first_name';
export const FITTED_PRICE = 'fitted_price';
export const FRAME_NAME = 'frame_name';
export const FRAME_SIZE = 'frame_size';
export const IN_USE = 'in_use';
export const ISSUED_DATE = 'issued_date';
export const LAST_NAME = 'last_name';
export const NOTE_TEXT = 'note_text';
export const NUMBER_TYPE = 'number_type';
export const LINK = 'link';
export const MODEL_NAME = 'model_name';
export const PART_NAME = 'part_name';
export const PART_TYPE = 'partType';
export const POSTCODE = 'postcode';
export const PREFERRED = 'preferred';
export const PREFERRED_SUPPLIER = 'preferred_supplier';
export const PRODUCT_CODE = 'product_code';
export const QUANTITY = 'quantity';
export const QUOTE_DESC = 'quote_desc';
export const QUOTE_PRICE = 'quote_price';
export const CALCULATED_PRICE = 'calculated_price';
export const QUOTE_STATUS = 'quote_status';
export const SELL_PRICE = 'rrp';
export const SIZES = 'sizes';
export const STANDARD = 'standard';
export const STOCKED = 'stocked';
export const SUPPLIER = 'supplier';
export const SUPPLIER_NAME = 'supplier_name';
export const TELEPHONE = 'telephone';
export const TICKET_PRICE = 'ticket_price';
export const TRADE_IN_PRICE = 'trade_in_price';
export const TRADE_PRICE = 'trade_price';
export const UPD_DATE = 'upd_date';
export const VERSION = 'version';

export const ADD_DATE_FIELD = {
  fieldName: ADD_DATE,
  type: DATE_TIME,
  header: 'Added',
  readOnly: true,
};

export const ADDRESS1_FIELD = {
  fieldName: ADDRESS1,
  type: TEXT,
  maxLength: 100,
  displaySize: 30,
  header: 'Address',
  required: true,
  error: ADDRESS_MISSING,
};
export const ADDRESS2_FIELD = {
  fieldName: ADDRESS2,
  type: TEXT,
  maxLength: 100,
  displaySize: 30,
  header: 'Line 2',
};
export const ADDRESS3_FIELD = {
  fieldName: ADDRESS3,
  type: TEXT,
  maxLength: 100,
  displaySize: 30,
  header: 'Line 3',
};
export const ADDRESS4_FIELD = {
  fieldName: ADDRESS4,
  type: TEXT,
  maxLength: 100,
  displaySize: 30,
  header: 'Line 4',
};
export const POSTCODE_FIELD = {
  fieldName: POSTCODE,
  type: TEXT,
  maxLength: 20,
  displaySize: 10,
  header: 'Postcode',
  validator: validatePostcodeAndReturnError,
  validatorAdditionalFields: [COUNTRY],
};

export const BIKE_FIELD = {
  fieldName: BIKE,
  header: 'Bike',
  readOnly: true,
  type: BIKE,
};
export const BILLING_FIELD = {
  fieldName: BILLING,
  header: 'Billing Address',
  type: CHECKBOX,
};
export const BIKE_PRICE_FIELD = {
  fieldName: BIKE_PRICE,
  header: 'Bike Price',
  type: CURRENCY,
  maxLength: 7,
  displaySize: 10,
};
export const BIKE_BRAND_FIELD = {
  fieldName: BIKE_BRAND,
  header: 'Bike Brand',
  type: CHECKBOX,
};
export const BRAND_FIELD = {
  fieldName: BRAND,
  header: 'Brand',
  synonyms: [BRAND, 'manufacturer'],
  required: true,
  error: BRAND_MISSING,
  type: BRAND,
};

export const CHECK_DATE_FIELD = {
  fieldName: CHECK_DATE,
  type: DATE_TIME,
  header: 'Date Checked',
  readOnly: true,
};
export const COLOUR_FIELD = {
  fieldName: COLOUR,
  header: 'Colour',
  type: TEXT,
  maxLength: 100,
  displaySize: 20,
};
export const COLOURS_FIELD = {
  fieldName: COLOURS,
  header: 'Colours',
  synonyms: [COLOURS, 'colour', 'colors', 'color'],
  type: TEXT,
  maxLength: 100,
  displaySize: 30,
};
export const CLUB_PRICE_FIELD = {
  fieldName: CLUB_PRICE,
  header: 'Club Price',
  type: CURRENCY,
  maxLength: 6,
  displaySize: 10,
};
export const CLUB_MEMBER_FIELD = {
  fieldName: CLUB_MEMBER,
  header: 'Club Member?',
  type: CHECKBOX,
};
export const COLOUR_PRICE_FIELD = {
  fieldName: COLOUR_PRICE,
  header: 'Colour Price',
  type: CURRENCY,
  displaySize: 5,
  maxLength: 10,
};
export const COUNTRY_FIELD = {
  fieldName: COUNTRY,
  header: 'Country',
  type: SELECT_ONE,
  selectList: COUNTRIES,
  required: true,
  error: COUNTRY_MISSING,
};
export const CREATED_BY_FIELD = {
  fieldName: CREATED_BY,
  type: USER,
  header: 'Created By',
  readOnly: true,
};
export const CREATED_DATE_FIELD = {
  fieldName: CREATED_DATE,
  type: DATE_TIME,
  header: 'Date Created',
  readOnly: true,
};
export const CUSTOMER_FIELD = {
  fieldName: CUSTOMER,
  type: CUSTOMER,
  header: 'Customer',
  readOnly: true,
};
export const CUSTOMER_VISIBLE_FIELD = {
  fieldName: CUSTOMER_VISIBLE,
  type: CHECKBOX,
  header: 'Customer View',
  readOnly: true,
};
export const DESCRIPTION_FIELD = {
  fieldName: DESCRIPTION,
  header: 'Description',
  synonyms: [DESCRIPTION, 'desc'],
  type: TEXT_AREA,
  displaySize: 400,
};
export const EMAIL_FIELD = {
  fieldName: EMAIL,
  type: TEXT,
  header: 'email',
  validator: validateEmailFormat,
};
export const EPIC_PRICE_FIELD = {
  fieldName: EPIC_PRICE,
  header: 'Epic Price',
  synonyms: [],
  type: CURRENCY,
  displaySize: 6,
  maxLength: 10,
};
export const FIRST_NAME_FIELD = {
  fieldName: FIRST_NAME,
  type: TEXT,
  displaySize: 20,
  maxLength: 60,
  header: 'First Name',
  synonyms: [],
  required: true,
  error: VALUE_MISSING,
};
export const FITTED_PRICE_FIELD = {
  fieldName: FITTED_PRICE,
  header: 'Fitted Price',
  synonyms: [],
  type: CURRENCY,
  displaySize: 10,
  maxLength: 10,
};

export const FRAME_NAME_FIELD = {
  fieldName: FRAME_NAME,
  type: TEXT,
  header: 'Frame Name',
  synonyms: [],
  required: true,
  error: FRAME_NAME_MISSING,
};
export const FRAME_SIZE_FIELD = {
  fieldName: FRAME_SIZE,
  header: 'Frame Size',
  type: TEXT,
};
export const IN_USE_FIELD = {
  fieldName: IN_USE,
  type: CHECKBOX,
  header: 'In Use',
  default: true,
};
export const ISSUED_DATE_FIELD = {
  fieldName: ISSUED_DATE,
  type: DATE_TIME,
  header: 'Date Issued',
  readOnly: true,
};
export const LAST_NAME_FIELD = {
  fieldName: LAST_NAME,
  header: 'Last Name',
  displaySize: 20,
  maxLength: 60,
  type: TEXT,
  synonyms: [],
  required: true,
  error: VALUE_MISSING,
};

export const NOTE_TEXT_FIELD = {
  fieldName: NOTE_TEXT,
  header: 'Note',
  type: TEXT_AREA,
  displaySize: 400,
};
export const NUMBER_TYPE_FIELD = {
  fieldName: NUMBER_TYPE,
  header: 'Type',
  type: SELECT_ONE,
  selectList: NUMBER_TYPE_CHOICES,
  required: true,
  error: SELECT_ONE_MISSING,
};

export const LINK_FIELD = {
  fieldName: LINK,
  header: 'URL',
  type: TEXT,
  maxLength: 100,
  displaySize: 40,
  validator: validateURLAndReturnError,
};
export const MODEL_NAME_FIELD = {
  fieldName: MODEL_NAME,
  header: 'Model Name',
  synonyms: [],
  required: true,
  error: MODEL_NAME_MISSING,
  type: TEXT,
  displaySize: 40,
  maxLength: 100,
};
export const PREFERRED_FIELD = {
  fieldName: PREFERRED,
  type: CHECKBOX,
  header: 'Preferred',
};
export const PREFERRED_SUPPLIER_FIELD = {
  fieldName: PREFERRED_SUPPLIER,
  type: CHECKBOX,
  header: 'Preferred',
};
export const QUANTITY_FIELD = {
  fieldName: QUANTITY,
  type: NUMBER,
  header: 'Qty',
  displaySize: 4,
  maxLength: 6,
};
export const QUOTE_DESC_FIELD = {
  fieldName: QUOTE_DESC,
  type: TEXT,
  displaySize: 40,
  maxLength: 60,
  required: true,
  maxWidth: '250px',
  header: 'Description',
};
export const QUOTE_STATUS_FIELD = {
  fieldName: QUOTE_STATUS,
  type: SELECT_ONE,
  readOnly: true,
  header: 'Status',
  selectList: QUOTE_STATUS_CHOICES,
};

export const SUPPLIER_FIELD = {
  fieldName: SUPPLIER,
  header: 'Supplier',
  synonyms: [SUPPLIER],
  required: true,
  error: SUPPLIER_MISSING,
  type: SUPPLIER,
};
export const SUPPLIER_FIELD_OPTIONAL = {
  fieldName: SUPPLIER,
  header: 'Supplier',
  synonyms: [SUPPLIER],
  type: SUPPLIER,
};

export const QUOTE_PRICE_FIELD = {
  fieldName: QUOTE_PRICE,
  header: 'Quote £',
  synonyms: [],
  type: CURRENCY,
  displaySize: 7,
  maxLength: 10,
};
export const CALCULATED_PRICE_FIELD = {
  fieldName: CALCULATED_PRICE,
  header: 'Total £',
  readOnly: true,
  type: CURRENCY,
  displaySize: 6,
  maxLength: 10,
};
export const BRAND_NAME_FIELD = {
  fieldName: BRAND_NAME,
  header: 'Brand Name',
  synonyms: [],
  required: true,
  displaySize: 20,
  maxLength: 50,
  error: BRAND_NAME_MISSING,
};
export const PRODUCT_CODE_FIELD = {
  fieldName: PRODUCT_CODE,
  header: 'Product Code',
  synonyms: [PRODUCT_CODE],
  type: TEXT,
  displaySize: 10,
  maxLength: 30,
};
export const SELL_PRICE_FIELD = {
  fieldName: SELL_PRICE,
  header: 'RRP',
  synonyms: ['price', 'selling price', 'srp', 'rrp', 'sell price', 'retail price'],
  type: CURRENCY,
  displaySize: 6,
  maxLength: 10,
};

export const TELEPHONE_FIELD = {
  fieldName: TELEPHONE,
  header: 'Phone',
  type: TEXT,
  required: true,
  error: VALUE_MISSING,
  displaySize: 20,
  maxLength: 60,
};
export const TICKET_PRICE_FIELD = {
  fieldName: TICKET_PRICE,
  header: 'Ticket Price',
  synonyms: [],
  type: CURRENCY,
  displaySize: 6,
  maxLength: 10,
};

export const SIZES_FIELD = {
  fieldName: SIZES,
  header: 'Sizes',
  synonyms: [SIZES, 'size', 'frame sizes', 'frame size'],
  type: TEXT,
  displaySize: 50,
  maxLength: 100,
};
export const PART_TYPE_FIELD = {
  fieldName: PART_TYPE,
  header: 'Part Type',
  required: true,
  error: PART_TYPE_MISSING,
  type: PART_TYPE,
};
export const PART_NAME_FIELD = {
  fieldName: PART_NAME,
  header: 'Part Name',
  required: true,
  error: PART_NAME_MISSING,
  displaySize: 40,
  maxLength: 200,
  maxWidth: '250px',
};
export const TRADE_IN_PRICE_FIELD = {
  fieldName: TRADE_IN_PRICE,
  header: 'Trade In £',
  type: CURRENCY,
  displaySize: 5,
  maxLength: 10,
};
export const TRADE_PRICE_FIELD = {
  fieldName: TRADE_PRICE,
  header: 'Trade Price £',
  type: CURRENCY,
  displaySize: 5,
  maxLength: 10,
};
export const STOCKED_FIELD = {
  fieldName: STOCKED,
  header: 'Stocked',
  type: CHECKBOX,
};
export const STANDARD_FIELD = {
  fieldName: STANDARD,
  header: 'Core',
  type: CHECKBOX,
};
export const SUPPLIER_NAME_FIELD = {
  fieldName: SUPPLIER_NAME,
  header: 'Supplier',
  type: TEXT,
  displaySize: 20,
  maxLength: 100,
  required: true,
  error: VALUE_MISSING,
};
export const UPD_DATE_FIELD = {
  fieldName: UPD_DATE,
  type: DATE_TIME,
  header: 'Updated',
  readOnly: true,
};
export const VERSION_FIELD = {
  fieldName: VERSION,
  type: NUMBER,
  header: 'Version',
  readOnly: true,
};
// Model fields include only fields that are shown

export const bikeFields = [
  MODEL_NAME_FIELD,
  DESCRIPTION_FIELD,
  COLOURS_FIELD,
  SELL_PRICE_FIELD,
  EPIC_PRICE_FIELD,
  CLUB_PRICE_FIELD,
  SIZES_FIELD,
];
export const brandFields = [
  BRAND_NAME_FIELD,
  BIKE_BRAND_FIELD,
  LINK_FIELD,
  SUPPLIER_FIELD_OPTIONAL,
];
export const customerFields = [
  FIRST_NAME_FIELD,
  LAST_NAME_FIELD,
  EMAIL_FIELD,
  CLUB_MEMBER_FIELD,
  ADD_DATE_FIELD,
  UPD_DATE_FIELD,
];
export const customerAddressFields = [
  ADDRESS1_FIELD,
  ADDRESS2_FIELD,
  ADDRESS3_FIELD,
  ADDRESS4_FIELD,
  COUNTRY_FIELD,
  POSTCODE_FIELD,
  BILLING_FIELD,
  ADD_DATE_FIELD,
  UPD_DATE_FIELD,
];

export const customerPhoneFields = [
  NUMBER_TYPE_FIELD,
  TELEPHONE_FIELD,
  PREFERRED_FIELD,
  ADD_DATE_FIELD,
  UPD_DATE_FIELD,
];
export const customerNoteFields = [
  NOTE_TEXT_FIELD,
  CUSTOMER_VISIBLE_FIELD,
  CREATED_DATE_FIELD,
  CREATED_BY_FIELD,
];
export const frameFields = [BRAND, FRAME_NAME];

export const partFieldsComplete = [
  PART_TYPE_FIELD,
  BRAND_FIELD,
  PART_NAME_FIELD,
  TRADE_IN_PRICE_FIELD,
  STANDARD_FIELD,
  STOCKED_FIELD,
];
export const partFields = [
  PART_TYPE_FIELD,
  BRAND_FIELD,
  PART_NAME_FIELD,
  TRADE_IN_PRICE_FIELD,
  STANDARD_FIELD,
];
export const partFieldsNoPartType = [
  BRAND_FIELD,
  PART_NAME_FIELD,
  TRADE_IN_PRICE_FIELD,
  STANDARD_FIELD,
];

export const supplierFields = [SUPPLIER_NAME_FIELD, PREFERRED_SUPPLIER_FIELD, LINK_FIELD];
export const supplierProductFields = [
  SUPPLIER_FIELD,
  PRODUCT_CODE_FIELD,
  FITTED_PRICE_FIELD,
  TICKET_PRICE_FIELD,
  SELL_PRICE_FIELD,
  TRADE_PRICE_FIELD,
  CLUB_PRICE_FIELD,
  CHECK_DATE_FIELD,
];

export const userFields = [FIRST_NAME_FIELD, LAST_NAME_FIELD, EMAIL_FIELD];
