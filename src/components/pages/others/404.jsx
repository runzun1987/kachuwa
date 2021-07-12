import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// import Custom Components
import Breadcrumb from '../../common/breadcrumb';

function ErrorPage() {
  return (
    <div className="main">
      <Helmet>
        <title>Kachuwa Nepal's No 1 Shopping Site</title>
      </Helmet>

      <h1 className="d-none">Kachuwa Nepal's No 1 Shopping Site</h1>

      <Breadcrumb
        title="404"
        parent1={['Pages', 'pages/about']}
        adClass="border-0 mb-0"
      />

      <div
        className="error-content text-center"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/backgrounds/error-bg.jpg)`,
        }}
      >
        <div className="container">
          <h1 className="error-title">Error 404</h1>

          <p>We are sorry, the page you've requested is not available.</p>
          <Link to="" className="btn btn-outline-primary-2 btn-minwidth-lg">
            <span>BACK TO HOMEPAGE</span>
            <i className="icon-long-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ErrorPage);
