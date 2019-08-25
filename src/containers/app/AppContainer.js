import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router';

import HeaderContainer from './HeaderContainer';
import NotFound from '../404';
import Home from '../home';

import { CUSTOMER_SEARCH_URL, CUSTOMER_URL, LOGIN_URL, QUESTION_URL } from '../../components/menus/helpers/menu';

const LazyLoginContainer = lazy(() => import('../user/LoginContainer'));
const LazyQuoteCopyContainer = lazy(() => import('../quote/QuoteCopyContainer'));
const LazyQuoteIssueContainer = lazy(() => import('../quote/QuoteIssueContainer'));
const LazyQuoteListContainer = lazy(() => import('../quote/QuoteListContainer'));
const LazyQuoteCreateContainer = lazy(() => import('../quote/QuoteCreateContainer'));
const LazyQuoteManagerContainer = lazy(() => import('../quote/QuoteManagerContainer'));
const LazySupplierProductReviewContainer = lazy(() =>
  import('../supplierProduct/SupplierProductReviewContainer'),
);
const LazySupplierProductUploadContainer = lazy(() =>
  import('../supplierProduct/SupplierProductUploadContainer'),
);
const LazyBikeReviewContainer = lazy(() => import('../bike/BikeReviewContainer'));
const LazyBikeReviewListContainer = lazy(() => import('../bike/BikeReviewListContainer'));
const LazyBikeUploadContainer = lazy(() => import('../bike/BikeUploadContainer'));
const LazyBrandsContainer = lazy(() => import('../brand/BrandsContainer'));
const LazyCustomerEditContainer = lazy(() => import('../customer/CustomerEditContainer'));
const LazyPasswordChangeContainer = lazy(() => import('../user/PasswordChangeContainer'));
const LazyUserDetailChangeContainer = lazy(() => import('../user/UserDetailChangeContainer'));
const LazyFrameworkContainer = lazy(() => import('../framework/FrameworkContainer'));
const LazyCustomerListContainer = lazy(() => import('../customer/CustomerListContainer'));
const LazyChargesContainer = lazy(() => import('../charge/ChargesContainer'));
const LazyQuestionsContainer = lazy(() => import('../question/QuestionsContainer'));
const App = () => (
  <div>
    <HeaderContainer />
    <main
      className="grid-container"
      style={{ height: `${window.innerHeight - 50}px`, width: `${window.innerWidth}px` }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/sales" component={Home} />
          <Route exact path="/404" component={NotFound} />
          <Route exact path={LOGIN_URL} component={LazyLoginContainer} />
          <Route exact path="/change-user-detail" component={LazyUserDetailChangeContainer} />
          <Route exact path="/change-password" component={LazyPasswordChangeContainer} />
          <Route exact path={CUSTOMER_URL} component={LazyCustomerEditContainer} />
          <Route exact path={CUSTOMER_SEARCH_URL} component={LazyCustomerListContainer} />
          <Route exact path="/framework" component={LazyFrameworkContainer} />
          <Route exact path="/brands" component={LazyBrandsContainer} />
          <Route exact path="/bike-upload" component={LazyBikeUploadContainer} />
          <Route exact path="/bike-review-list" component={LazyBikeReviewListContainer} />
          <Route exact path="/bike-review" component={LazyBikeReviewContainer} />
          <Route exact path="/product-upload" component={LazySupplierProductUploadContainer} />
          <Route exact path="/product-review" component={LazySupplierProductReviewContainer} />
          <Route exact path="/quote-create" component={LazyQuoteCreateContainer} />
          <Route exact path="/quote-list" component={LazyQuoteListContainer} />
          <Route exact path="/quote" component={LazyQuoteManagerContainer} />
          <Route exact path="/quote-copy" component={LazyQuoteCopyContainer} />
          <Route exact path="/quote-issue" component={LazyQuoteIssueContainer} />
          <Route exact path="/charges" component={LazyChargesContainer} />
          <Route exact path={QUESTION_URL} component={LazyQuestionsContainer} />
          {/* Finally, catch all unmatched routes */}
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </main>
  </div>
);
export default App;
