import React from 'react';
import HeaderContainer from './HeaderContainer';
import NotFound from '../404';
import Home from '../home';

import QuoteCopyContainer from '../quote/QuoteCopyContainer';
import QuoteManagerContainer from '../quote/QuoteManagerContainer';
import QuoteListContainer from '../quote/QuoteListContainer';
import QuoteCreateContainer from '../quote/QuoteCreateContainer';
import SupplierProductReviewContainer from '../supplierProduct/SupplierProductReviewContainer';
import SupplierProductUploadContainer from '../supplierProduct/SupplierProductUploadContainer';
import BikeReviewContainer from '../bike/BikeReviewContainer';
import BikeReviewListContainer from '../bike/BikeReviewListContainer';
import BikeUploadContainer from '../bike/BikeUploadContainer';
import BrandsContainer from '../brand/BrandsContainer';
import CustomerEditContainer from '../customer/CustomerEditContainer';
import PasswordChangeContainer from '../user/PasswordChangeContainer';
import UserDetailChangeContainer from '../user/UserDetailChangeContainer';
import LoginContainer from '../user/LoginContainer';
import FrameworkContainer from '../framework/FrameworkContainer';
import CustomerListContainer from '../customer/CustomerListContainer';
import { CUSTOMER_SEARCH_URL, CUSTOMER_URL } from '../../components/menus/helpers/menu';
import { Switch,  Route } from 'react-router';

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
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/change-user-detail" component={UserDetailChangeContainer} />
        <Route exact path="/change-password" component={PasswordChangeContainer} />
        <Route exact path={CUSTOMER_URL} component={CustomerEditContainer} />
        <Route exact path={CUSTOMER_SEARCH_URL} component={CustomerListContainer} />
        <Route exact path="/framework" component={FrameworkContainer} />
        <Route exact path="/brands" component={BrandsContainer} />
        <Route exact path="/bike-upload" component={BikeUploadContainer} />
        <Route exact path="/bike-review-list" component={BikeReviewListContainer} />
        <Route exact path="/bike-review" component={BikeReviewContainer} />
        <Route exact path="/product-upload" component={SupplierProductUploadContainer} />
        <Route exact path="/product-review" component={SupplierProductReviewContainer} />
        <Route exact path="/quote-create" component={QuoteCreateContainer} />
        <Route exact path="/quote-list" component={QuoteListContainer} />
        <Route exact path="/quote" component={QuoteManagerContainer} />
        <Route exact path="/quote-copy" component={QuoteCopyContainer} />
      </Switch>
    </main>
  </div>
);
export default App;
