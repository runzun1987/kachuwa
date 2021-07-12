import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import LoadingOverlay from '../components/features/loading-overlay';

import { scrollTop } from '../utils';
import { map } from 'jquery';

const ElementPages = React.lazy(() => import('./elements-route.js'));
const ProductPages = React.lazy(() => import('./products-route.js'));
const ShopPages = React.lazy(() => import('./shop-route.js'));
const BlogPages = React.lazy(() => import('./blogs-route.js'));
const OtherPages = React.lazy(() => import('./others-route.js'));
const HomePage = React.lazy(() => import('./home-route.js'));
const AdminPage = React.lazy(() => import('./admin-page.js'));

function AppRoot({ isLoggedIn }) {
  useEffect(() => {
    scrollTop();
  }, []);

  let route;

  if (isLoggedIn) {
    route = (
      <Switch>
        <Route path={`${process.env.PUBLIC_URL}/admin`} component={AdminPage} />
        <Route
          path={`${process.env.PUBLIC_URL}/elements`}
          component={ElementPages}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/product`}
          component={ProductPages}
        />
        <Route path={`${process.env.PUBLIC_URL}/shop`} component={ShopPages} />
        <Route path={`${process.env.PUBLIC_URL}/blog`} component={BlogPages} />
        <Route
          path={`${process.env.PUBLIC_URL}/pages`}
          component={OtherPages}
        />
        <Route path={`${process.env.PUBLIC_URL}/`} component={HomePage} />
      </Switch>
    );
  } else {
    route = (
      <Switch>
        
        <Route
          path={`${process.env.PUBLIC_URL}/elements`}
          component={ElementPages}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/product`}
          component={ProductPages}
        />
        <Route path={`${process.env.PUBLIC_URL}/shop`} component={ShopPages} />
        <Route path={`${process.env.PUBLIC_URL}/blog`} component={BlogPages} />
        <Route
          path={`${process.env.PUBLIC_URL}/pages`}
          component={OtherPages}
        />
        <Route path={`${process.env.PUBLIC_URL}/`} component={HomePage} />
      </Switch>
    );
  }

  return (
    <React.Suspense fallback={<LoadingOverlay />}>
      {route}
    </React.Suspense>
  );
}

export const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(AppRoot);
