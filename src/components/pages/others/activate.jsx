import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useHttpClient } from './../../../api/hooks/http-hook';
import { showModal, closeModal } from '../../../actions';

// import Custom Components
import Breadcrumb from '../../common/breadcrumb';

function LoginOne(props) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [insideError, setInSideError] = useState();
  const [insideLoading, setInsideLoading] = useState(true);

  const code = props.match.params.token;

  useEffect(() => {
    props.closeModal();
  }, []);

  useEffect(() => {
    const test = async () => {
      try {
        const result = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + '/users/activate/' + code,
          'GET',
          {},
          { 'Content-Type': 'application/json' }
        );

       
        setInsideLoading(false);
      } catch (err) {
        // setInSideError(err.response.data)
        setInsideLoading(false);
      }
    };
    test();
  }, []);

  useEffect(() => {
    if (error) {
      setInSideError(error.message);
    }
  }, [error]);

  const resendHandler = async (e) => {
    e.preventDefault();

    try {
      const result = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/users/resend',
        'POST',
        {
          email: e.target.email.value,
        },
        { 'Content-Type': 'application/json' }
      );

  
      setInsideLoading(false);
    } catch (err) {
      // setInSideError(err.response.data)
      setInsideLoading(false);
    }
  };

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
        title="Login"
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
          <div className="form-box">
            <div className="form-tab">
              {insideError && (
                <>
                  {' '}
                  <div className="alert alert-danger" role="alert">
                    {insideError}
                  </div>
                  <p>Resend Email</p>
                  <form onSubmit={resendHandler}>
                    <input type="email" name="email" />
                    <button>Submit</button>
                  </form>
                </>
              )}

              {!insideLoading && !insideError && (
                <p>
                  <div className="alert alert-primary" role="alert">
                    <p>Account Confirmed!</p>
                  </div>
                   <Link>
                  <button onClick={loginHandler}>Login</button>
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { showModal, closeModal })(React.memo(LoginOne));
