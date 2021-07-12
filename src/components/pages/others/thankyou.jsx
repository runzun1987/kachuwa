import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Helmet } from 'react-helmet';
import { useHttpClient } from './../../../api/hooks/http-hook';
import { showModal } from '../../../actions';

// import Custom Components
import Breadcrumb from '../../common/breadcrumb';

function Thankyou(props) {
  const loginHandler = () => {
    props.showModal('login');
  };

  return (
    <div className="main">
      <Helmet>
        <title>Kachuwa Nepal's No 1 Shopping Site</title>
      </Helmet>

      <h1 className="d-none">Kachuwa Nepal's No 1 Shopping Site</h1>

      <Breadcrumb
        title="Thank-you"
        parent1={['pages', 'pages/about']}
        adClass="border-0 mb-0"
      />

      <div
        className="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/backgrounds/login-bg.jpg)`,
        }}
      >
        <div className="container">
          <div className="jumbotron text-center">
            <h1 className="display-3">Thank You!</h1>
            <p className="lead">
              <strong>Thank you for the order</strong> confirmation email has
              been send.
            </p>

            <p>
              Having trouble? <a href="">Contact us</a>
            </p>
            <p className="lead">
              <a className="btn btn-primary btn-sm" href="/" role="button">
                Continue to homepage
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Thankyou);
