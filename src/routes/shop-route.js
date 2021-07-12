import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import Layout from '../components/app';
import Sidebar from '../components/pages/shop/sidebar';
import NoSidebar from '../components/pages/shop/nosidebar';
import NoSidebarImage from '../components/pages/shop/nosidebar image';
import ProductCategory from '../components/pages/shop/product-category';
import MyAccount from '../components/pages/shop/dashboard';
import Wishlist from '../components/pages/shop/wishlist';
import Cart from '../components/pages/shop/cart';
import Checkout from '../components/pages/shop/checkout';
import Market from '../components/pages/shop/market';
import { cognitoSignInCheck } from '../actions';


function ShopRoute(props) {
  let routes;

  /***********Check for AUTHENTICATION*************/

  const checkForAuth = async () => {
   
    try {
      const result = await Auth.currentAuthenticatedUser();
      const isLoggedIn = true;
      const username = result.username;
      const email = result.attributes.email;
      const mobile = result.attributes.phone_number;
      props.cognitoSignInCheck({ isLoggedIn, username, email, mobile });
    } catch (err) {
      
      console.log(err);
      props.cognitoSignInCheck({ isLoggedIn: false });
      return (window.location = process.env.PUBLIC_URL + '/pages/404');
    }
  };
  useEffect(() => {
    checkForAuth();
  }, []);

  if (props.loaded && !props.isLoggedIn) {
    routes = (
      <Layout>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/shop/:grid/keyword/:keyword/:choice/:id`}
          component={NoSidebar}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/shop/boxed/kachuwa/image/:id`}
          component={NoSidebarImage}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/shop/category/:grid`}
          component={ProductCategory}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/shop/sidebar/:grid`}
          component={Sidebar}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/shop/market`}
          component={Market}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/shop/dashboard`}
          component={MyAccount}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/shop/wishlist`}
          component={Wishlist}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/shop/cart`}
          component={Cart}
        />
      </Layout>
    );
  } else {
    routes = (
      <Layout>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/shop/:grid/keyword/:keyword/:choice/:id`}
          component={NoSidebar}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/shop/boxed/kachuwa/image/:id`}
          component={NoSidebarImage}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/shop/category/:grid`}
          component={ProductCategory}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/shop/sidebar/:grid`}
          component={Sidebar}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/shop/market`}
          component={Market}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/shop/dashboard`}
          component={MyAccount}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/shop/wishlist`}
          component={Wishlist}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/shop/cart`}
          component={Cart}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/shop/checkout`}
          component={Checkout}
        />
      </Layout>
    );
  }
  return <Switch>{routes}</Switch>;
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.cognitoIsLoggedIn.isLoggedIn,
  loaded:state.cognitoIsLoggedIn.loaded || false
});

export default connect(mapStateToProps, { cognitoSignInCheck })(ShopRoute);
