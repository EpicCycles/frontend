import React from 'react';
import HeaderContainer from './HeaderContainer';
import NotFound from '../404';
import Home from '../home';

import { CUSTOMER_SEARCH_URL, CUSTOMER_URL } from '../../components/menus/helpers/menu';
import { Switch, Route } from 'react-router';
import asyncComponent from '../../components/AsyncComponent';

const AsyncLoginContainer = asyncComponent(() => import('../user/LoginContainer'));
const AsyncQuoteCopyContainer = asyncComponent(() => import('../quote/QuoteCopyContainer'));
const AsyncQuoteListContainer = asyncComponent(() => import('../quote/QuoteListContainer'));
const AsyncQuoteCreateContainer = asyncComponent(() => import('../quote/QuoteCreateContainer'));
const AsyncQuoteManagerContainer = asyncComponent(() => import('../quote/QuoteManagerContainer'));
const AsyncSupplierProductReviewContainer = asyncComponent(() =>
  import('../supplierProduct/SupplierProductReviewContainer'),
);
const AsyncSupplierProductUploadContainer = asyncComponent(() =>
  import('../supplierProduct/SupplierProductUploadContainer'),
);
const AsyncBikeReviewContainer = asyncComponent(() => import('../bike/BikeReviewContainer'));
const AsyncBikeReviewListContainer = asyncComponent(() =>
  import('../bike/BikeReviewListContainer'),
);
const AsyncBikeUploadContainer = asyncComponent(() => import('../bike/BikeUploadContainer'));
const AsyncBrandsContainer = asyncComponent(() => import('../brand/BrandsContainer'));
const AsyncCustomerEditContainer = asyncComponent(() =>
  import('../customer/CustomerEditContainer'),
);
const AsyncPasswordChangeContainer = asyncComponent(() =>
  import('../user/PasswordChangeContainer'),
);
const AsyncUserDetailChangeContainer = asyncComponent(() =>
  import('../user/UserDetailChangeContainer'),
);
const AsyncFrameworkContainer = asyncComponent(() => import('../framework/FrameworkContainer'));
const AsyncCustomerListContainer = asyncComponent(() =>
  import('../customer/CustomerListContainer'),
);
const AsyncNotFound = asyncComponent(() => import('../404'));
const App = () => (
  <div>
    <HeaderContainer />
    <main
      className="grid-container"
      style={{ height: `${window.innerHeight - 50}px`, width: `${window.innerWidth}px` }}
    >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sales" component={Home} />
        <Route exact path="/404" component={NotFound} />
        <Route exact path="/login" component={AsyncLoginContainer} />
        <Route exact path="/change-user-detail" component={AsyncUserDetailChangeContainer} />
        <Route exact path="/change-password" component={AsyncPasswordChangeContainer} />
        <Route exact path={CUSTOMER_URL} component={AsyncCustomerEditContainer} />
        <Route exact path={CUSTOMER_SEARCH_URL} component={AsyncCustomerListContainer} />
        <Route exact path="/framework" component={AsyncFrameworkContainer} />
        <Route exact path="/brands" component={AsyncBrandsContainer} />
        <Route exact path="/bike-upload" component={AsyncBikeUploadContainer} />
        <Route exact path="/bike-review-list" component={AsyncBikeReviewListContainer} />
        <Route exact path="/bike-review" component={AsyncBikeReviewContainer} />
        <Route exact path="/product-upload" component={AsyncSupplierProductUploadContainer} />
        <Route exact path="/product-review" component={AsyncSupplierProductReviewContainer} />
        <Route exact path="/quote-create" component={AsyncQuoteCreateContainer} />
        <Route exact path="/quote-list" component={AsyncQuoteListContainer} />
        <Route exact path="/quote" component={AsyncQuoteManagerContainer} />
        <Route exact path="/quote-copy" component={AsyncQuoteCopyContainer} />
        {/* Finally, catch all unmatched routes */}
        <Route component={AsyncNotFound} />
      </Switch>
    </main>
  </div>
);
export default App;
