import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';

import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Auth } from 'aws-amplify';
import { useHttpClient } from '../../../api/hooks/http-hook';
import Axios from 'axios';

import {
  closeModal,
  signIn,
  authSuccess,
  authFail,
  authStart,
  signOut,
  cognitoSignInCheck,
} from '../../../actions';
import { ForgotPassword } from 'aws-amplify-react/dist/Auth';

const customStyles = {
  content: {
    top: '50%',
    transform: 'translateY(-50%)',
  },
  overlay: {
    backgroundColor: 'rgba(77,77,77,0.6)',
    zIndex: '10000',
  },
};

Modal.setAppElement('#root');

function LoginModal(props) {
  const { showModal, modal } = props;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  let timer;

  function closeModal() {
    document
      .getElementById('login-modal')
      .classList.remove('ReactModal__Content--after-open');

    timer = setTimeout(() => {
      props.closeModal('login');
    }, 200);
  }

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [signUpUserName, setSignUpUserName] = useState('');
  const [signUpEmailId, setSignUpEmailId] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpPhoneNumber, setSignUpPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [domain, setDomain] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [template, setTemplate] = useState({
    signInSignUp: true,
    codeTrue: false,
    resetPassword: false,
    newPasswordForm: false,
  });

  const [code, setCode] = useState('');

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  });

  /**************Sign In **************/

  const signInFormHandler = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setInfoMessage('');

    try {
      const result = await Auth.signIn(userName, password);
      const isLoggedIn = true;
      const username = result.username;
      const email = result.attributes.email;
      const mobile = result.attributes.phone_number;
      props.cognitoSignInCheck({ isLoggedIn, username, email, mobile });
      props.closeModal('login');
    } catch (err) {
      props.authFail(err.message);
      setErrorMessage(err.message);
      if (err.code === 'UserNotConfirmedException') {
        setTemplate({
          signInSignUp: false,
          codeTrue: true,
          resetPassword: false,
          newPasswordForm: false,
        });
      }
    }
  };

  /*********************** Sign Up *********************************/

  const signUpFormHandler = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setInfoMessage('');

    try {
      const { user } = await Auth.signUp({
        username: signUpUserName,
        password: signUpPassword,
        attributes: {
          email: signUpEmailId, // optional
          phone_number: signUpPhoneNumber, // optional - E.164 number convention
          // other custom attributes
        },
      });
      if (user) {
        setTemplate({
          signInSignUp: false,
          codeTrue: true,
          resetPassword: false,
          newPasswordForm: false,
        });
      }
    } catch (error) {
      console.log('error signing up:', error);
    }
  };

  /**********************Confirm Sign Up Code Verification**********************************/
  const codeConformationHandler = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setInfoMessage('');
    const codeUserName = e.target.code.value;
    try {
      const result = await Auth.confirmSignUp(codeUserName, code);
      console.log(result);
      setInfoMessage('sign up confirmed');
      setTemplate({
        signInSignUp: true,
        codeTrue: false,
        resetPassword: false,
        newPasswordForm: false,
      });
    } catch (error) {
      setErrorMessage(error.message);
      console.log('error confirming sign up', error);
    }
  };

  /********************** Resend Code ************************/

  const resendConfirmationCode = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setInfoMessage('');

    try {
      await Auth.resendSignUp(signUpUserName || userName);
      setInfoMessage('code resent successfully');
    } catch (err) {
      setErrorMessage(err.message);
      console.log('error resending code: ', err);
    }
  };

  /****************** Forget Password *******************/

  const forgetPasswordHandler = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setInfoMessage('');
    setTemplate({
      signInSignUp: false,
      codeTrue: false,
      resetPassword: true,
      newPasswordForm: false,
    });
  };

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setInfoMessage('');

    // Send confirmation code to user's email
    try {
      const data = await Auth.forgotPassword(signUpUserName);
      setInfoMessage('code has been sent to your email');
      setTemplate({
        signInSignUp: false,
        codeTrue: false,
        resetPassword: false,
        newPasswordForm: true,
      });
    } catch (err) {
      setErrorMessage(err.message);
      console.log(err);
    }
  };

  /***************** Back to sign In handler**************/

  const backToSignInHandler = (e) => {
    setTemplate({
      signInSignUp: true,
      codeTrue: false,
      resetPassword: false,
      newPasswordForm: false,
    });
  };

  /******************* New Password  Handler  **************/

  const newPasswordSubmitHandler = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setInfoMessage('');

    // Collect confirmation code and new password, then
    try {
      const data = await Auth.forgotPasswordSubmit(
        signUpUserName,
        code,
        newPassword
      );
      console.log(data);
      setInfoMessage('New Password Updated');
      setTemplate({
        signInSignUp: true,
        codeTrue: false,
        resetPassword: false,
        newPasswordForm: false,
      });
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
    }
  };

  const resendHandler = async (e) => {
    setErrorMessage('');
    setInfoMessage('');
    try {
      const result = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/users/resend',
        'POST',
        {
          // email: emailId,
        },
        { 'Content-Type': 'application/json' }
      );

      setDomain(result.data.domain);
      setInfoMessage(result.data.message);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const signInInputEmailHandler = (e) => {
    setUserName(e.target.value);
  };

  const signInInputPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const signUpUserNameHandler = (e) => {
    setSignUpUserName(e.target.value);
  };

  const signUpInputPasswordHandler = (e) => {
    setSignUpPassword(e.target.value);
  };
  const signUpInputEmailHandler = (e) => {
    setSignUpEmailId(e.target.value);
  };
  const signUpInputPhoneNumberHandler = (e) => {
    setSignUpPhoneNumber(e.target.value);
  };

  const signUpCodeHandler = (e) => {
    setCode(e.target.value);
  };

  const newPasswordHandler = (e) => {
    setNewPassword(e.target.value);
  };

  const responseFacebook = async (e) => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/users/facebook-login',
        'POST',
        { accessToken: e.accessToken, userID: e.userID },
        { 'Content-Type': 'application/json' }
      );

      props.authSuccess(
        responseData.data.token,
        responseData.data.data.user._id,
        responseData.data.expires
      );
      // props.signIn(userId, email, token);
      props.closeModal('login');
    } catch (err) {
      props.authFail(err.message);
      setErrorMessage(err.message);
    }
  };

  const responseSuccessGoogle = async (e) => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/users/google-login',
        'POST',
        { tokenId: e.tokenId },
        { 'Content-Type': 'application/json' }
      );

      props.authSuccess(
        responseData.data.token,
        responseData.data.data.user._id,
        responseData.data.expires
      );
      // props.signIn(userId, email, token);
      props.closeModal('login');
    } catch (err) {
      props.authFail(err.message);
      setErrorMessage(err.message);
    }
  };
  const responseErrorGoogle = (e) => {};

  const resendEmailHandler = (e) => {
    resendHandler();
  };

  return (
    <Modal
      isOpen={showModal && 'login' === modal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Login Modal"
      className="modal-dialog modal-dialog-centered"
      id="login-modal"
    >
      <div className="modal-content">
        <div className="modal-body">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={closeModal}
          >
            <span aria-hidden="true">
              <i className="icon-close"></i>
            </span>
          </button>
          <div className="form-box">
            <div className="form-tab">
              <Tabs selectedTabClassName="show" defaultIndex={0}>
                <TabList className="nav nav-pills nav-fill">
                  {template.signInSignUp && (
                    <Tab className="nav-item">
                      <span className="nav-link">Sign In</span>
                    </Tab>
                  )}

                  {template.signInSignUp && (
                    <Tab className="nav-item">
                      <span className="nav-link">Register</span>
                    </Tab>
                  )}

                  {template.codeTrue && (
                    <Tab className="nav-item">
                      <span className="nav-link">Confirm Sign Up</span>
                    </Tab>
                  )}

                  {template.resetPassword && (
                    <Tab className="nav-item">
                      <span className="nav-link">Reset your password</span>
                    </Tab>
                  )}

                  {template.newPasswordForm && (
                    <Tab className="nav-item">
                      <span className="nav-link">Reset your password</span>
                    </Tab>
                  )}
                </TabList>

                <div className="tab-content">
                  {template.signInSignUp && (
                    <TabPanel style={{ paddingTop: '2rem' }}>
                      <div>
                        <form onSubmit={signInFormHandler}>
                          <div className="form-group">
                            {isLoading ? (
                              <div style={{ color: 'blue' }}>
                                <div className="spinner-grow text-success"></div>
                                loading...
                              </div>
                            ) : (
                              ''
                            )}
                            {errorMessage && (
                              <div
                                className="error-message"
                                style={{ color: 'red' }}
                              >
                                {errorMessage ===
                                'Pending Account. Please Verify Your Email!' ? (
                                  <div
                                    className="error-message"
                                    style={{ color: 'blue' }}
                                  >
                                    {
                                      'Pending Account. Please Verify Your Email!'
                                    }
                                    <Link onClick={resendEmailHandler}>
                                      {' '}
                                      Resend Email
                                    </Link>
                                  </div>
                                ) : (
                                  errorMessage
                                )}
                              </div>
                            )}

                            {infoMessage && (
                              <div
                                className="error-message"
                                style={{ color: 'blue' }}
                              >
                                {infoMessage}
                                <a href={`https://${domain}`} target="_blank">
                                  {' '}
                                  Check Mail
                                </a>
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="singin-email-2">
                              Username or email address *
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="singin-email-2"
                              name="singin-email"
                              onChange={signInInputEmailHandler}
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="singin-password-2">
                              Password *
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="singin-password-2"
                              name="singin-password"
                              onChange={signInInputPasswordHandler}
                              required
                            />
                          </div>

                          <div className="form-footer">
                            <button
                              type="submit"
                              className="btn btn-outline-primary-2"
                            >
                              <span>LOG IN</span>
                              <i className="icon-long-arrow-right"></i>
                            </button>

                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="signin-remember-2"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="signin-remember-2"
                              >
                                Remember Me
                              </label>
                            </div>
                            <button onClick={forgetPasswordHandler}>
                              <Link to={'#'} className="forgot-link">
                                Forgot Your Password?
                              </Link>
                            </button>
                          </div>
                        </form>
                        <div className="form-choice">
                          <p className="text-center">or sign in with</p>
                          <div className="row">
                            <div className="col-sm-6">
                              <GoogleLogin
                                clientId={
                                  process.env.REACT_APP_GOOGLE_CLIENT_ID
                                }
                                render={(renderProps) => (
                                  <div
                                    to="#"
                                    className="btn btn-login btn-g"
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                  >
                                    <i className="icon-google"></i>
                                    Login With Google
                                  </div>
                                )}
                                buttonText="Login with Google"
                                onSuccess={responseSuccessGoogle}
                                onFailure={responseErrorGoogle}
                                cookiePolicy={'single_host_origin'}
                              />
                            </div>
                            <div className="col-sm-6">
                              <FacebookLogin
                                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                                autoLoad={false}
                                fields="name,email,picture"
                                render={(renderProps) => (
                                  <div
                                    to="#"
                                    className="btn btn-login btn-f"
                                    onClick={renderProps.onClick}
                                  >
                                    <i className="icon-facebook-f"></i>
                                    Login With Facebook
                                  </div>
                                )}
                                // onClick={componentClicked}
                                callback={responseFacebook}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                  )}

                  {template.signInSignUp && (
                    <TabPanel>
                      <form onSubmit={signUpFormHandler}>
                        <div className="form-group">
                          {isLoading ? (
                            <div style={{ color: 'blue' }}>
                              <div className="spinner-grow text-success"></div>
                              loading...
                            </div>
                          ) : (
                            ''
                          )}
                          {errorMessage && (
                            <div
                              className="error-message"
                              style={{ color: 'red' }}
                            >
                              {errorMessage}
                            </div>
                          )}
                          {infoMessage && (
                            <div
                              className="error-message"
                              style={{ color: 'blue' }}
                            >
                              {infoMessage}
                              <a href={`https://${domain}`} target="_blank">
                                {' '}
                                Check Mail
                              </a>
                            </div>
                          )}
                          <div className="form-group">
                            <label htmlFor="register-confirm-password-2">
                              Username *
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="register-password-2"
                              name="register-password-2"
                              onChange={signUpUserNameHandler}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="register-password-2">
                              Password *
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="register-password-2"
                              name="register-password"
                              onChange={signUpInputPasswordHandler}
                              required
                            />
                          </div>
                          <label htmlFor="register-email-2">
                            Your email address *
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="register-email-2"
                            name="register-email"
                            onChange={signUpInputEmailHandler}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="register-confirm-password-2">
                            Phone
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="register-password-2"
                            name="register-password-2"
                            onChange={signUpInputPhoneNumberHandler}
                            required
                          />
                        </div>

                        <div className="form-footer">
                          <button
                            type="submit"
                            className="btn btn-outline-primary-2"
                          >
                            <span>SIGN UP</span>
                            <i className="icon-long-arrow-right"></i>
                          </button>

                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="register-policy-2"
                              required
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="register-policy-2"
                            >
                              I agree to the <Link to="#">privacy policy</Link>{' '}
                              *
                            </label>
                          </div>
                        </div>
                      </form>
                      <div className="form-choice">
                        <p className="text-center">or sign in with</p>
                        <div className="row">
                          <div className="col-sm-6">
                            <Link to="#" className="btn btn-login btn-g">
                              <i className="icon-google"></i>
                              Login With Google
                            </Link>
                          </div>
                          <div className="col-sm-6">
                            <Link to="#" className="btn btn-login  btn-f">
                              <i className="icon-facebook-f"></i>
                              Login With Facebook
                            </Link>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                  )}
                  {template.codeTrue && (
                    <TabPanel style={{ paddingTop: '2rem' }}>
                      <div>
                        <form onSubmit={codeConformationHandler}>
                          <div className="form-group">
                            {isLoading ? (
                              <div style={{ color: 'blue' }}>
                                <div className="spinner-grow text-success"></div>
                                loading...
                              </div>
                            ) : (
                              ''
                            )}
                            {errorMessage && (
                              <div
                                className="error-message"
                                style={{ color: 'red' }}
                              >
                                {errorMessage ===
                                'Pending Account. Please Verify Your Email!' ? (
                                  <div
                                    className="error-message"
                                    style={{ color: 'blue' }}
                                  >
                                    {
                                      'Pending Account. Please Verify Your Email!'
                                    }
                                    <Link onClick={resendEmailHandler}>
                                      {' '}
                                      Resend Email
                                    </Link>
                                  </div>
                                ) : (
                                  errorMessage
                                )}
                              </div>
                            )}

                            {infoMessage && (
                              <div
                                className="error-message"
                                style={{ color: 'blue' }}
                              >
                                {infoMessage}
                                <a href={`https://${domain}`} target="_blank">
                                  {' '}
                                  Check Mail
                                </a>
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="singin-email-2">Username *</label>
                            <input
                              type="text"
                              className="form-control"
                              id="code"
                              name="code"
                              value={signUpUserName || userName}
                              // onChange={signUpUserNameHandler}
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="singin-password-2">
                              Enter Code Here *
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="singin-password-2"
                              name="singin-password"
                              onChange={signUpCodeHandler}
                              required
                            />
                          </div>

                          <div className="form-footer">
                            <button
                              type="submit"
                              className="btn btn-outline-primary-2"
                            >
                              <span>Submit</span>
                              <i className="icon-long-arrow-right"></i>
                            </button>
                          </div>
                          {'Lost Your code? '}

                          <button onClick={resendConfirmationCode}>
                            ReSend code
                          </button>
                        </form>
                      </div>
                    </TabPanel>
                  )}
                  {template.resetPassword && (
                    <TabPanel style={{ paddingTop: '2rem' }}>
                      <div>
                        <form onSubmit={resetPasswordHandler}>
                          <div className="form-group">
                            {isLoading ? (
                              <div style={{ color: 'blue' }}>
                                <div className="spinner-grow text-success"></div>
                                loading...
                              </div>
                            ) : (
                              ''
                            )}
                            {errorMessage && (
                              <div
                                className="error-message"
                                style={{ color: 'red' }}
                              >
                                {errorMessage ===
                                'Pending Account. Please Verify Your Email!' ? (
                                  <div
                                    className="error-message"
                                    style={{ color: 'blue' }}
                                  >
                                    {
                                      'Pending Account. Please Verify Your Email!'
                                    }
                                    <Link onClick={resendEmailHandler}>
                                      {' '}
                                      Resend Email
                                    </Link>
                                  </div>
                                ) : (
                                  errorMessage
                                )}
                              </div>
                            )}

                            {infoMessage && (
                              <div
                                className="error-message"
                                style={{ color: 'blue' }}
                              >
                                {infoMessage}
                                <a href={`https://${domain}`} target="_blank">
                                  {' '}
                                  Check Mail
                                </a>
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="singin-email-2">Username *</label>
                            <input
                              type="text"
                              className="form-control"
                              id="code"
                              name="code"
                              onChange={signUpUserNameHandler}
                              required
                            />
                          </div>

                          <div className="form-footer">
                            <button
                              type="submit"
                              className="btn btn-outline-primary-2"
                            >
                              <span>Send Code</span>
                              <i className="icon-long-arrow-right"></i>
                            </button>
                          </div>
                          {'Lost Your code? '}

                          <button onClick={backToSignInHandler}>
                            Back To SignIn
                          </button>
                        </form>
                      </div>
                    </TabPanel>
                  )}

                  {template.newPasswordForm && (
                    <TabPanel style={{ paddingTop: '2rem' }}>
                      <div>
                        <form onSubmit={newPasswordSubmitHandler}>
                          <div className="form-group">
                            {isLoading ? (
                              <div style={{ color: 'blue' }}>
                                <div className="spinner-grow text-success"></div>
                                loading...
                              </div>
                            ) : (
                              ''
                            )}
                            {errorMessage && (
                              <div
                                className="error-message"
                                style={{ color: 'red' }}
                              >
                                {errorMessage ===
                                'Pending Account. Please Verify Your Email!' ? (
                                  <div
                                    className="error-message"
                                    style={{ color: 'blue' }}
                                  >
                                    {
                                      'Pending Account. Please Verify Your Email!'
                                    }
                                    <Link onClick={resendEmailHandler}>
                                      {' '}
                                      Resend Email
                                    </Link>
                                  </div>
                                ) : (
                                  errorMessage
                                )}
                              </div>
                            )}

                            {infoMessage && (
                              <div
                                className="error-message"
                                style={{ color: 'blue' }}
                              >
                                {infoMessage}
                                <a href={`https://${domain}`} target="_blank">
                                  {' '}
                                  Check Mail
                                </a>
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="singin-email-2">Code *</label>
                            <input
                              type="text"
                              className="form-control"
                              id="reset-code"
                              name="reset-code"
                              onChange={signUpCodeHandler}
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="singin-email-2">
                              New Password *
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="new-password"
                              name="new-password"
                              onChange={newPasswordHandler}
                              required
                            />
                          </div>

                          <div className="form-footer">
                            <button
                              type="submit"
                              className="btn btn-outline-primary-2"
                            >
                              <span>Submit</span>
                              <i className="icon-long-arrow-right"></i>
                            </button>
                          </div>
                          {'Lost Your code? '}

                          <button onClick={backToSignInHandler}>
                            Resend Code
                          </button>
                        </form>
                      </div>
                    </TabPanel>
                  )}
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function mapStateToProps(state) {
  return {
    showModal: state.modal.showModal,
    modal: state.modal.modal,
  };
}

export default connect(mapStateToProps, {
  closeModal,
  signIn,
  authSuccess,
  authFail,
  authStart,
  signOut,
  cognitoSignInCheck,
})(LoginModal);
