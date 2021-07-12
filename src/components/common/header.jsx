import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import { useHttpClient } from '../../api/hooks/http-hook';
import $ from 'jquery';
import { Auth, Storage } from 'aws-amplify';
// import ImageResizer from 'react-native-image-resizer';
import Compressing from 'react-image-file-resizer';
import ReactTooltip from 'react-tooltip';
// Common Header Components
import ScrollingMsg from './partials/ScrollingMsg';
import CartMenu from './partials/cart-menu';
import CategoryMenu from './partials/category-menu';
import LoginModal from '../features/modal/login-modal';
import './style.css';

import {
  showModal,
  whichList,
  signIn,
  signOut,
  searchImageProducts,
  storeImage,
  cognitoSignInCheck,
  LOAD,
  CHOICE,
} from '../../actions';

function Header(props) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  let history = useHistory();
  const imageInput = useRef();

  const { container = 'container' } = props;
  const [id, setId] = useState('');
  const [search, setSearch] = useState('');
  const [displayName, setDisplayName] = useState();

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
      props.cognitoSignInCheck({ isLoggedIn: false });
      console.log(err);
    }
  };
  useEffect(() => {
    checkForAuth();
  }, []);

  /************* STEP 1. Redirecting keyword to noSidebar ***************/
  const formSubmitHandler = (e) => {
    e.preventDefault();
    history.push(`/shop/boxed/keyword/${search}/default/` + Math.random());
  };

  /********************* Sign Out *****************/

  const signOutHandler = async () => {
    try {
      await Auth.signOut();
      checkForAuth();
    } catch (error) {
      console.log('error signing out: ', error);
      checkForAuth();
    }
  };

  /*************** Unorganized ***************/

  function openLoginModal(e) {
    props.showModal('login');
    e.preventDefault();
  }

  const inputChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const check = (e) => {
    e.target.value = null;
  };

  /*************** IMAGE UP LOAD TO S3 *******************/
  const onChangeHandler = async (event) => {
    const file = event.target.files[0];
    try {
      const result = await Storage.put(file.name, file, {
        contentType: 'image/png', // contentType is optional
      });

      console.log(result,'111111111111')
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
    // Compressing.imageFileResizer(
    //   imageFile, // the file from input
    //   480, // width
    //   480, // height
    //   'JPG', // compress format WEBP, JPEG, PNG
    //   70, // quality
    //   0, // rotation
    //   (uri) => {
    //     // You upload logic goes here
    //     props.storeImage(uri);
    //     history.push('/shop/boxed/kachuwa/image/' + Math.random());
    //   },
    //   'base64' // blob or base64 default base64
    // );
  };

  const somethingtohappen = () => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  };

  useEffect(() => {
    let tooltip = document.querySelectorAll(
      `[data-tip][data-for="happyFace"]`
    )[0];
    ReactTooltip.show(tooltip);
  }, []);

  useEffect(() => {
    if (props.token) {
      jwt.verify(props.token, process.env.REACT_APP_JWT_KEY, (err, decode) => {
        if (err) {
          props.signOut();
        } else {
          setId(decode.id);
        }
      });
    }
  }, [props.isLoggedIn]);

  useEffect(() => {
    const users = async () => {
      // try {
      //   const responseData = await sendRequest(
      //     process.env.REACT_APP_BACKEND_URL + `/users/${id}`,
      //     'GET',
      //     {},
      //     { Authorization: 'Bearer ' + props.token }
      //   );
      //   let user;
      //   if (responseData.data.user) {
      //     user = responseData.data.user;
      //     setRole(user.role);
      //     setPhoto(user.photo);
      //     setDisplayName(user.displayName);
      //   }
      // } catch (err) {
      //   props.signOut();
      // }
    };
    users();
  }, [id]);
  const cartSaveHandler = async (e) => {
    const cart = props.cart;
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/cart`,
        'POST',
        {
          cart: cart,
        },
        { 'Content-Type': 'application/json' }
      );
    } catch (err) {
      console.log(err, '---');
    }
  };

  const cartLoadHandler = async (e) => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/cart/load`,
        'GET',
        {},
        { 'Content-Type': 'application/json' }
      );
      const x = responseData.data.data.cart.cart;
      props.LOAD(x);
    } catch (err) {
      console.log(err, '---');
    }
  };
  return (
    <header className="header header-14">
      <div className="header-top center-text">
        <div className={container}>
          <div className="header-left">
            <div className="mobile-header-top">
              <button className="mobile-menu-toggler">
                <span className="sr-only">Toggle mobile menu</span>
                <i className="icon-bars"></i>
              </button>
              <button>
                <a href="tel:#">
                  <i className="icon-phone"></i>
                  <span>Call: +977 9843813046</span>
                </a>
              </button>
              {/* 
              <Link to={`${process.env.PUBLIC_URL}/`} className="header-logo">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                  alt="kachuwa Logo"
                />
              </Link> */}
            </div>
          </div>
          <Link to={`${process.env.PUBLIC_URL}/`} className="header-logo">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
              alt="kachuwa Logo"
            />
          </Link>
          <div className="header-right">
            <ul className="top-menu">
              <li>
                {/* <Link to="#">Links</Link> */}
                <ul className="menus">
                  {props.isLoggedIn && (
                    <li>
                      <div className="header">
                        <Link to="/shop/dashboard">
                          {displayName || 'profile'}
                        </Link>
                        {/* <div className="header-menu">
                      
                        </div> */}
                      </div>
                    </li>
                  )}

                  {/* <li>
                                        <div className="header-dropdown">
                                            <Link to="#">USD</Link>
                                            <div className="header-menu">
                                                <ul>
                                                    <li><Link to="#">Eur</Link></li>
                                                    <li><Link to="#">Usd</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li> */}

                  {/* <li>
                                        <div className="header-dropdown">
                                            <Link to="#">English</Link>
                                            <div className="header-menu">
                                                <ul>
                                                    <li><Link to="#">English</Link></li>
                                                    <li><Link to="#">French</Link></li>
                                                    <li><Link to="#">Spanish</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li> */}

                  {!props.isLoggedIn && (
                    <li className="login">
                      <Link
                        to="/auth"
                        data-toggle="modal"
                        id="runzun"
                        onClick={openLoginModal}
                      >
                        <i className="fa fa-user"></i>
                        Sign in
                      </Link>
                    </li>
                  )}

                  {props.isLoggedIn && (
                    <li className="login">
                      <Link to="/" data-toggle="modal" onClick={signOutHandler}>
                        Log Out
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </div>

          {/* <div onClick={cartSaveHandler}>Save</div> */}

          {/* <div onClick={cartLoadHandler}>load</div> */}
        </div>
      </div>
      <div className="header-middle sticky-header">
        <div className={container}>
          <div className="row">
            <div className="col-auto col-lg-3 col-xl-3 col-xxl-2">
              <button className="mobile-menu-toggler">
                <span className="sr-only">Toggle mobile menu</span>
                <i className="icon-bars"></i>
              </button>
              <Link to={`${process.env.PUBLIC_URL}/`} className="logo">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                  alt="kachuwa Logo"
                />
              </Link>
            </div>
            <div className="col col-lg-9 col-xl-9 col-xxl-10 header-middle-right">
              <div className="row">
                <div className="col-lg-8 col-xxl-4-5col d-block">
                  <div className="header-search header-search-extended header-search-visible header-search-no-radius d-block">
                    <Link to="#" className="search-toggle" role="button">
                      <i className="icon-search"></i>
                    </Link>

                    <form method="get" onSubmit={formSubmitHandler}>
                      <div className="header-search-wrapper search-wrapper-wide">
                        {/* <div className="select-custom">
                          <select id="cat" name="cat">
                            <option value="">All Departments</option>
                            <option value="1">Fashion</option>
                            <option value="2">- Women</option>
                            <option value="3">- Men</option>
                            <option value="4">- Jewellery</option>
                            <option value="5">- Kids Fashion</option>
                            <option value="6">Electronics</option>
                            <option value="7">- Smart TVs</option>
                            <option value="8">- Cameras</option>
                            <option value="9">- Games</option>
                            <option value="10">Home &amp; Garden</option>
                            <option value="11">Motors</option>
                            <option value="12">- Cars and Trucks</option>
                            <option value="15">- Boats</option>
                            <option value="16">
                              - Auto Tools &amp; Supplies
                            </option>
                          </select>
                        </div> */}
                        <label htmlFor="q" className="sr-only">
                          Search
                        </label>
                        <input
                          onChange={inputChangeHandler}
                          type="search"
                          className="form-control"
                          name="q"
                          id="q"
                          placeholder="Search product ..."
                          value={search}
                          required
                        />

                        <button className="btn btn-primary" type="submit">
                          <i className="icon-search"></i>
                        </button>

                        <input
                          onClick={check}
                          className="input-image"
                          style={{ display: 'none' }}
                          type="file"
                          name="file"
                          onInput={onChangeHandler}
                          ref={imageInput}
                        />

                        <div
                          className="btn btn-outline-primary"
                          onClick={somethingtohappen}
                        >
                          <a data-tip data-for="happyFace">
                            <i className="fa fa-camera"></i>
                          </a>

                          <ReactTooltip
                            className="opaque"
                            id="happyFace"
                            type="info"
                            effect="solid"
                            place="bottom"
                          >
                            <span>Try Our New Image Search Feature</span>
                          </ReactTooltip>
                        </div>
                      </div>
                      {/* </form> */}

                      {/* <form method="get" onSubmit={formSubmitHandler} style={{marginTop:"5px"}}> */}
                      <div
                        className="d-flex justify-content-center"
                        style={{ marginTop: '5px' }}
                      >
                        <label
                          style={{ marginRight: '10px', fontSize: 'small' }}
                        >
                          <input
                            type="checkbox"
                            className="radio"
                            value="cheap"
                            name="choice"
                            style={{ marginRight: '2px' }}
                          />
                          I'm Feeling Lucky
                        </label>
                        {/* <label
                          style={{ marginRight: '10px', fontSize: 'small' }}
                        >
                          <input
                            type="checkbox"
                            class="radio"
                            value="expensive"
                            name="choice"
                            style={{ marginRight: '2px' }}
                          />
                          Expensive
                        </label>
                        <label
                          style={{ marginRight: '10px', fontSize: 'small' }}
                        >
                          <input
                            type="checkbox"
                            class="radio"
                            value="cheap-popu"
                            name="choice"
                            style={{ marginRight: '2px' }}
                          />
                          Cheapest Popular item
                        </label>
                        <label
                          style={{ marginRight: '10px', fontSize: 'small' }}
                        >
                          <input
                            type="checkbox"
                            class="radio"
                            value="expensive-popu"
                            name="choice"
                            style={{ marginRight: '2px' }}
                          />
                          Expensive Popular item
                        </label> */}
                      </div>
                    </form>
                  </div>
                </div>

                <div className="col-lg-4 col-xxl-5col d-flex justify-content-end align-items-center">
                  <div className="header-dropdown-link">
                    {/* <CompareMenu /> */}
                    <Link
                      to={`${process.env.PUBLIC_URL}/shop/wishlist`}
                      className="wishlist-link"
                    >
                      <i className="icon-heart-o"></i>
                      <span className="wishlist-count">
                        {props.wishlist.length}
                      </span>
                      <span className="wishlist-txt">Wishlist</span>
                    </Link>
                    <CartMenu />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header-bottom">
        <div className={container}>
          <div className="row">
            <div className="col-auto col-lg-3 col-xl-3 col-xxl-2 header-left">
              <CategoryMenu />
            </div>

            <div className="col col-lg-6 col-xl-6 col-xxl-8 header-center">
              {/* <MainMenu /> */}
              <ScrollingMsg />
            </div>

            <div className="col col-lg-3 col-xl-3 col-xxl-2 header-right">
              <i className="la la-lightbulb-o"></i>
              <p>Clearance Up to 30% Off</p>
            </div>
          </div>
        </div>
      </div>
      <LoginModal />
    </header>
  );
}

function mapStateToProps(state) {
  return {
    wishlist: state.wishlist.list,
    isLoggedIn: state.cognitoIsLoggedIn.isLoggedIn,
    token: state.auth.token,
    cart: state.cartlist,
    searchError: state.search.error,
    choiceInner: state.choice.userChoice,
  };
}

export default connect(mapStateToProps, {
  searchImageProducts,
  showModal,
  cognitoSignInCheck,
  whichList,
  signIn,
  signOut,
  storeImage,
  LOAD,
  CHOICE,
})(Header);
