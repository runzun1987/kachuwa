import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Helmet } from 'react-helmet';
import { useHttpClient } from './../../../api/hooks/http-hook';
import { showModal } from '../../../actions';
import { Link } from 'react-router-dom';

// import Custom Components
import Breadcrumb from '../../common/breadcrumb';

function LoginOne(props) {
  const token = props.match.params.token;

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [insideError, setInSideError] = useState(error);
  const [insideLoading, setInsideLoading] = useState(true);
  const [message, setMessage] = useState();

  const code = props.match.params.token;

  useEffect(() => {
    if (error) {
      setInSideError(error.message);
    }
  }, [error]);

  const resendHandler = async (e) => {
    e.preventDefault();
 
    try {
      const result = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/users/resetPassword/${token}`,
        'PATCH',
        {
          password: e.target.newPassword.value,
          passwordConfirm: e.target.confirmPassword.value,
        },
        { 'Content-Type': 'application/json' }
      );

   
      if (result.data) {
        setMessage(result.data.status);
      }
      setInsideLoading(false);
    } catch (err) {
      // setInSideError(err.response.data)
      // setInSideError(err.response.data);
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
        title="forget-password"
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
              {isLoading ? <p>Loading...</p> : message}
              {insideError ? insideError : ''}
              <form onSubmit={resendHandler}>
                <div>
                  <label>New Password </label>
                  {'   '}
                  <input type="password" name="newPassword" />
                </div>
                <div>
                  <label>Confirm Password</label>
                  {'   '}
                  <input type="password" name="confirmPassword" />
                </div>

                <button class="btn btn-warning">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { showModal })(React.memo(LoginOne));
