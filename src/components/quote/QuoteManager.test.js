import QuoteManager from './QuoteManager';
import { sampleBrands, sampleSections, sampleSuppliers } from '../../helpers/sampleData';
import { assertComponentHasExpectedProps, findDataTest } from '../../helpers/jest_helpers/assert';
import { compareTab, customerTab, historyTab, quoteListTab } from './helpers/quoteManagerTabs';

const props = {
  bikes: [],
  brands: sampleBrands,
  sections: sampleSections,
  suppliers: sampleSuppliers,
  parts: [],
  frames: [],
  quoteId: 2,
  quotes: [{ id: 2 }],
  saveBrands: jest.fn(),
  getFrameList: jest.fn(),
  listParts: jest.fn(),
  getCustomerList: jest.fn(),
  getCustomerListPage: jest.fn(),
  getCustomer: jest.fn(),
  clearCustomerState: jest.fn(),
  createCustomer: jest.fn(),
  saveCustomer: jest.fn(),
  deleteCustomer: jest.fn(),
  removeCustomer: jest.fn(),
  createNote: jest.fn(),
  saveNote: jest.fn(),
  removeNote: jest.fn(),
  deleteNote: jest.fn(),
  isLoading: false,
};

describe('QuoteManager', () => {
  describe('basic rendering', () => {
    test('should render with tab 0 and relevant compoents when initially loaded', () => {
      const component = shallow(<QuoteManager {...props} />);
      const TabbedView = component.find('TabbedView');
      expect(TabbedView).toHaveLength(1);

      expect(findDataTest(component, 'customer-tab')).toHaveLength(0);
      expect(findDataTest(component, 'bike-quotes-tab')).toHaveLength(0);
      expect(findDataTest(component, 'quote-list-tab')).toHaveLength(0);
      expect(findDataTest(component, 'quote-detail-tab')).toHaveLength(1);
      expect(findDataTest(component, 'quote-history-tab')).toHaveLength(0);
    });
  });
  describe('tab handling with data', () => {
    let component;

    beforeEach(() => {
      component = shallow(<QuoteManager {...props} />);
    });
    test('should render with tab 1 and relevant components when second tab clicked', () => {
      let TabbedView = component.find('TabbedView');
      expect(TabbedView).toHaveLength(1);

      component.find('TabbedView').prop('changeTab')(quoteListTab.tabValue);
      component.update();
      TabbedView = component.find('TabbedView');
      expect(TabbedView).toHaveLength(1);
      assertComponentHasExpectedProps(TabbedView, {
        currentTab: quoteListTab.tabValue,
      });

      expect(findDataTest(component, 'customer-tab')).toHaveLength(0);
      expect(findDataTest(component, 'quote-list-tab')).toHaveLength(1);
      expect(findDataTest(component, 'bike-quotes-tab')).toHaveLength(0);
      expect(findDataTest(component, 'quote-detail-tab')).toHaveLength(0);
      assertComponentHasExpectedProps(component.find('QuoteDetail'), {
        quote: { id: 2 },
      });
      expect(findDataTest(component, 'quote-history-tab')).toHaveLength(0);
    });
    test('should render with tab 1 and relevant components when first tab clicked', () => {
      let TabbedView = component.find('TabbedView');
      expect(TabbedView).toHaveLength(1);
      component.find('TabbedView').prop('changeTab')(customerTab.tabValue);
      component.update();
      TabbedView = component.find('TabbedView');
      expect(TabbedView).toHaveLength(1);
      assertComponentHasExpectedProps(TabbedView, {
        currentTab: customerTab.tabValue,
      });

      expect(findDataTest(component, 'customer-tab')).toHaveLength(1);
      expect(findDataTest(component, 'bike-quotes-tab')).toHaveLength(0);
      expect(findDataTest(component, 'quote-detail-tab')).toHaveLength(0);
      expect(findDataTest(component, 'quote-list-tab')).toHaveLength(0);
    });
    test('should render with history and relevant components when fourth tab clicked', () => {
      component.find('TabbedView').prop('changeTab')(historyTab.tabValue);
      component.update();
      const TabbedView = component.find('TabbedView');
      expect(TabbedView).toHaveLength(1);
      assertComponentHasExpectedProps(TabbedView, {
        currentTab: historyTab.tabValue,
      });

      expect(findDataTest(component, 'customer-tab')).toHaveLength(0);
      expect(findDataTest(component, 'quote-list-tab')).toHaveLength(0);
      expect(findDataTest(component, 'quote-detail-tab')).toHaveLength(0);
      expect(findDataTest(component, 'quote-history-tab')).toHaveLength(1);
      expect(findDataTest(component, 'bike-quotes-tab')).toHaveLength(0);
    });
    test('should render with compare and relevant components when fourth tab clicked', () => {
      component.find('TabbedView').prop('changeTab')(compareTab.tabValue);
      component.update();
      const TabbedView = component.find('TabbedView');
      expect(TabbedView).toHaveLength(1);
      assertComponentHasExpectedProps(TabbedView, {
        currentTab: compareTab.tabValue,
      });

      expect(findDataTest(component, 'customer-tab')).toHaveLength(0);
      expect(findDataTest(component, 'quote-list-tab')).toHaveLength(0);
      expect(findDataTest(component, 'quote-detail-tab')).toHaveLength(0);
      expect(findDataTest(component, 'quote-history-tab')).toHaveLength(0);
      expect(findDataTest(component, 'bike-quotes-tab')).toHaveLength(1);
    });
  });
});
