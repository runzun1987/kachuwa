import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Layout from '../components/app';
import AdminHomePage from '../components/pages/admin/homepage';
// import AdminDash from '../components/pages/admin/test/dash';

export default function BlogsRoute() {
  return (
    <Switch>
      {/* <Layout> */}
      <Route
        exact
        path={`${process.env.PUBLIC_URL}/admin`}
        component={AdminHomePage}
      />
      {/* <Route
        exact
        path={`${process.env.PUBLIC_URL}/admin/dash`}
        component={AdminDash}
      /> */}

      {/* </Layout> */}
    </Switch>
  );
}
