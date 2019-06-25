export const CUSTOMER_SEARCH_URL = '/customer-search';
export const CUSTOMER_URL = '/customer';
export const LOGIN_URL = '/login';
export const menuStructure = [
  {
    sectionPos: 1,
    sectionContents: [
      {
        groupHeader: 'Customer',
        groupPos: 10,
        groupLinks: [
          { displayText: 'Find Customer', linkRoute: CUSTOMER_SEARCH_URL, linkNumber: 101 },
          { displayText: 'New Customer', linkRoute: CUSTOMER_URL, linkNumber: 102 },
        ],
      },
    ],
  },
  {
    sectionPos: 2,
    sectionContents: [
      {
        groupHeader: 'Quotes',
        groupPos: 20,
        groupLinks: [
          { displayText: 'New Quote', linkRoute: '/quote-create', linkNumber: 201 },
          { displayText: 'Find Quote', linkRoute: '/quote-list', linkNumber: 202 },
        ],
      },
    ],
  },
  {
    sectionPos: 3,
    sectionContents: [
      {
        groupHeader: 'Bikes',
        groupPos: 30,
        groupLinks: [
          { displayText: 'Bike Upload', linkRoute: '/bike-upload', linkNumber: 301 },
          { displayText: 'Bike Review', linkRoute: '/bike-review-list', linkNumber: 302 },
        ],
      },
      {
        groupHeader: 'Core Data',
        groupPos: 31,
        groupLinks: [
          { displayText: 'Quote Sections', linkRoute: '/framework', linkNumber: 311 },
          { displayText: 'Brands', linkRoute: '/brands', linkNumber: 312 },
        ],
      },
      {
        groupHeader: 'Products',
        groupPos: 32,
        groupLinks: [
          { displayText: 'Product Upload', linkRoute: '/product-upload', linkNumber: 321 },
          { displayText: 'Product Review', linkRoute: '/product-review', linkNumber: 322 },
        ],
      },
    ],
  },
  {
    sectionPos: 4,
    sectionContents: [
      {
        groupHeader: 'User',
        groupPos: 40,
        groupLinks: [
          { displayText: 'Edit User', linkRoute: '/change-user-detail', linkNumber: 401 },
          { displayText: 'Change Password', linkRoute: '/change-password', linkNumber: 402 },
          { displayText: 'Login', linkRoute: LOGIN_URL, linkNumber: 403 },
        ],
      },
    ],
  },
];
