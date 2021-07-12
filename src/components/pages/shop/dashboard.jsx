import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// import Custom Components
import PageHeader from '../../common/page-header';
import Breadcrumb from '../../common/breadcrumb';
import Profile from '../../features/profile/profile-one';
import { useHttpClient } from '../../../api/hooks/http-hook';
import Products from './products';
import NewProducts from './newProducts';
import { signOut } from '../../../actions';

function DashBoard(props) {
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [id, setId] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [displayName, setDisplayName] = useState();
  const [role, setRole] = useState();
  const [photo, setPhoto] = useState();
  const [email, setEmail] = useState();
  const [orders, setOrders] = useState([]);

  const [street, setStreet] = useState();
  const [town, setTown] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [edit, setEdit] = useState(false);

  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const checkOrders = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + '/orders/check-orders',
          'POST',
          {},
          { Authorization: 'Bearer ' + props.token }
        );

        setOrders(responseData.data.data.orders);
      } catch (err) {
        console.log(err);
      }
    };
    checkOrders();
  }, []);

  useEffect(() => {
    if (props.token) {
      jwt.verify(props.token, process.env.REACT_APP_JWT_KEY, (err, decode) => {
        if (err) {
          console.log(err);
          props.signOut();
        } else {
          setId(decode.id);
        }
      });
    } else {
      return (window.location = process.env.PUBLIC_URL + '/pages/404');
    }
  }, [props.isLoggedIn]);

  useEffect(() => {
    const users = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/users/${id}`,
          'GET',
          {},
          { Authorization: 'Bearer ' + props.token }
        );
        const user = responseData.data.user;
        const address = responseData.data.user.address;
        if (address) {
          setStreet(address.street);
          setTown(address.town);
          setCountry(address.country);
          setPhone(address.phone);
        }

        setRole(user.role);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setPhoto(user.photo);
        setDisplayName(user.displayName);
      } catch (err) {
        console.log(err, '------------');
      }
    };
    users();
  }, [id]);

  const editAddress = () => {
    setEdit(!edit);
  };

  const changePasswordHandler = async (e) => {
    try {
      const result = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/users/updateMyPassword',
        'PATCH',
        {
          passwordCurrent: currentPassword,
          password: newPassword,
          passwordConfirm: confirmPassword,
        },
        { Authorization: 'Bearer ' + props.token }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const addressHandler = async (e) => {
    e.preventDefault();
    setEdit(!edit);
    const street = e.target.street.value;
    const town = e.target.town.value;
    const country = e.target.country.value;
    const phone = e.target.phone.value;
    console.log(street, town, country, phone);

    try {
      const result = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/users/updateAddress',
        'PATCH',
        {
          address: {
            street,
            town,
            country,
            phone,
          },
        },
        { Authorization: 'Bearer ' + props.token }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const updateMe = async (e) => {
    e.preventDefault();

    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/users/updateMe',
        'PATCH',
        {
          firstName,
          lastName,
          displayName,
        },
        { Authorization: 'Bearer ' + props.token }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const streetHandler = (e) => {
    setStreet(e.target.value);
  };
  const townHandler = (e) => {
    setTown(e.target.value);
  };
  const countryHandler = (e) => {
    setCountry(e.target.value);
  };
  const phoneHandler = (e) => {
    setPhone(e.target.value);
  };

  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
  };

  const lastNameHandler = (e) => {
    setLastName(e.target.value);
  };

  const displayNameHandler = (e) => {
    setDisplayName(e.target.value);
  };

  const currentPasswordHandler = (e) => {
    setCurrentPassword(e.target.value);
  };

  const newPasswordHandler = (e) => {
    setNewPassword(e.target.value);
  };
  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };
  const signOutHandler = (e) => {
    props.signOut();
    const path = '/';
    history.push(path);
  };

  const recentOrderHandler = (e) => {
    if (role === 'admin') {
      setSelectedIndex(2);
    } else {
      setSelectedIndex(1);
    }
  };

  const shippingBillingHandler = (e) => {
    if (role === 'admin') {
      setSelectedIndex(4);
    } else {
      setSelectedIndex(3);
    }
  };

  const accoutDetailHandler = (e) => {
    if (role === 'admin') {
      setSelectedIndex(5);
    } else {
      setSelectedIndex(4);
    }
  };

  const passwordChangeHandler = (e) => {
    if (role === 'admin') {
      setSelectedIndex(6);
    } else {
      setSelectedIndex(5);
    }
  };

  const emailHandler = (e) => {
    console.log('You are not allowed to change email');
  };

  // const goToAdminPageHandler = () => {
  //   var win = window.open(`http://localhost:4000/:${props.token}`, '_blank');
  //   win.focus();
  // };
  return (
    <>
      <Helmet>
        <title>Kachuwa Nepal's No 1 Shopping Site</title>
      </Helmet>

      <h1 className="d-none">Kachuwa Nepal's No 1 Shopping Site</h1>

      <div className="main">
        <PageHeader title="My Account" subTitle="Shop" />
        <Breadcrumb
          title="My Account"
          parent1={['Shop', 'shop/sidebar/list']}
          adClass="mb-3"
        />

        <div className="page-content">
          <div className="dashboard">
            <div className="container">
              <ul
                className="nav nav-dashboard flex-column mb-3 mb-md-0"
                role="tablist"
              >
                <Tabs
                  selectedTabClassName="active show"
                  selectedIndex={selectedIndex}
                  onSelect={(index) => setSelectedIndex(index)}
                >
                  <div className="row">
                    <aside className="col-md-4 col-lg-3">
                      <TabList>
                        <Tab className="nav-item">
                          <span className="nav-link">Dashboard</span>
                        </Tab>
                        {role === 'admin' && (
                          <Tab className="nav-item">
                            <span className="nav-link">Admin</span>
                          </Tab>
                        )}

                        <Tab className="nav-item">
                          <span className="nav-link">Orders</span>
                        </Tab>

                        <Tab className="nav-item">
                          <span className="nav-link">Downloads</span>
                        </Tab>

                        <Tab className="nav-item">
                          <span className="nav-link">Addresses</span>
                        </Tab>

                        <Tab className="nav-item">
                          <span className="nav-link">Account Details</span>
                        </Tab>

                        <Tab className="nav-item">
                          <span className="nav-link">Change Password</span>
                        </Tab>

                        <Tab className="nav-item">
                          <Link to="#" className="nav-link">
                            <div onClick={signOutHandler}>Sign Out</div>
                          </Link>
                        </Tab>
                      </TabList>
                    </aside>

                    <div
                      className="col-md-8 col-lg-9"
                      style={{ marginTop: '1rem' }}
                    >
                      <div className="tab-pane">
                        <TabPanel>
                          <div>
                            Hello{' '}
                            <span className="font-weight-normal text-dark">
                              {displayName ? displayName : 'User'}
                            </span>{' '}
                            (not{' '}
                            <span className="font-weight-normal text-dark">
                              {displayName ? displayName : 'User'}
                            </span>
                            ?{' '}
                            <Link to="#" onClick={signOutHandler}>
                              Log out
                            </Link>
                            )
                            <br />
                            <div className="row">
                              <div className="col-md-4">
                                {photo ? (
                                  <Profile
                                    image={photo}
                                    name={firstName}
                                    content="Sed pretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nunc."
                                  />
                                ) : (
                                  <span>No photo uploaded</span>
                                )}
                              </div>
                            </div>
                            From your account dashboard you can view your{' '}
                            <Link
                              to="#tab-orders"
                              className="tab-trigger-link link-underline"
                              onClick={recentOrderHandler}
                            >
                              recent orders
                            </Link>
                            , manage your{' '}
                            <Link
                              to="#tab-address"
                              className="tab-trigger-link"
                              onClick={shippingBillingHandler}
                            >
                              shipping and billing addresses
                            </Link>
                            , and{' '}
                            <Link
                              to="#tab-account"
                              className="tab-trigger-link"
                              onClick={accoutDetailHandler}
                            >
                              edit your account details{' '}
                            </Link>
                            or{' '}
                            <Link
                              to="#tab-account"
                              className="tab-trigger-link"
                              onClick={passwordChangeHandler}
                            >
                              edit your password
                            </Link>
                            .
                          </div>
                        </TabPanel>
                        {role === 'admin' && (
                          <TabPanel>
                            <Link
                              to={`${process.env.PUBLIC_URL}/admin`}
                              className="btn btn-outline-primary-2"
                            >
                              <span>GO TO ADMIN PAGE</span>
                              <i className="icon-long-arrow-right"></i>
                            </Link>

                            {/* <Link
                              to="#"
                              className="btn btn-outline-primary-2"
                              onClick={goToAdminPageHandler}
                            >
                              <span>GO TO ADMIN PAGE</span>
                              <i className="icon-long-arrow-right"></i>
                            </Link> */}
                          </TabPanel>
                        )}
                        <TabPanel>
                          <div>
                            {orders.map((order, index) => {
                              const mydate = new Date(order.date);
                              const checkDate = new Date(
                                '4/25/2021, 7:45:27 AM'
                              );
                              if (mydate.getTime() >= checkDate.getTime()) {
                                return (
                                  <div className="kachuwa-products" key={index}>
                                    <div className="date-status">
                                      <p className="date">{order.date}</p>
                                      <p className="status">
                                        Status: {order.status}
                                      </p>
                                    </div>
                                    <NewProducts products={order.products} />
                                    <p className="total">
                                      Total: {order.total}
                                    </p>
                                  </div>
                                );
                              } else {
                                return (
                                  <div className="kachuwa-products" key={index}>
                                    <div className="date-status">
                                      <p className="date">{order.date}</p>
                                      <p className="status">
                                        Status: {order.status}
                                      </p>
                                    </div>
                                    <Products products={order.products} />
                                    <p className="total">
                                      Total: {order.total}
                                    </p>
                                  </div>
                                );
                              }
                            })}
                          </div>
                          <Link
                            to={`${process.env.PUBLIC_URL}/`}
                            className="btn btn-outline-primary-2"
                          >
                            <span>GO SHOP</span>
                            <i className="icon-long-arrow-right"></i>
                          </Link>
                        </TabPanel>

                        <TabPanel>
                          <p>No downloads available yet.</p>
                          <Link
                            to={`${process.env.PUBLIC_URL}/shop/sidebar/list`}
                            className="btn btn-outline-primary-2"
                          >
                            <span>GO SHOP</span>
                            <i className="icon-long-arrow-right"></i>
                          </Link>
                        </TabPanel>

                        <TabPanel>
                          <p>
                            The following addresses will be used on the checkout
                            page by default.
                          </p>

                          <div className="row">
                            {/* <div className="col-lg-6">
                              <div className="card card-dashboard">
                                <div className="card-body">
                                  <h3 className="card-title">
                                    Billing Address
                                  </h3>

                                  <p>
                                    User Name
                                    <br />
                                    User Company
                                    <br />
                                    John str
                                    <br />
                                    New York, NY 10001
                                    <br />
                                    1-234-987-6543
                                    <br />
                                    yourmail@mail.com
                                    <br />
                                    <Link to="#">
                                      Edit <i className="icon-edit"></i>
                                    </Link>
                                  </p>
                                </div>
                              </div>
                            </div> */}

                            <div className="col-lg-6">
                              <div className="card card-dashboard">
                                <div className="card-body">
                                  <h3 className="card-title">
                                    Shipping Address
                                  </h3>
                                  {isLoading ? (
                                    <p>loading...</p>
                                  ) : (
                                    <form onSubmit={addressHandler}>
                                      <p>
                                        Street:{'  '}
                                        {edit ? (
                                          <input
                                            value={street}
                                            name="street"
                                            onChange={streetHandler}
                                          />
                                        ) : (
                                          street || 'Not set'
                                        )}
                                      </p>
                                      <p>
                                        Town:{'  '}
                                        {edit ? (
                                          <input
                                            value={town}
                                            name="town"
                                            onChange={townHandler}
                                          />
                                        ) : (
                                          town || 'Not set'
                                        )}
                                      </p>
                                      <p>
                                        Country:{'  '}
                                        {edit ? (
                                          <input
                                            value={country}
                                            name="country"
                                            onChange={countryHandler}
                                          />
                                        ) : (
                                          country || 'Not set'
                                        )}
                                      </p>
                                      <p>
                                        Phone:{'  '}
                                        {edit ? (
                                          <input
                                            value={phone}
                                            name="phone"
                                            onChange={phoneHandler}
                                          />
                                        ) : (
                                          phone || 'Not set'
                                        )}
                                      </p>

                                      {edit ? (
                                        <button>save</button>
                                      ) : (
                                        <div onClick={editAddress}>Edit</div>
                                      )}
                                    </form>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabPanel>

                        <TabPanel>
                          {isLoading ? (
                            <p>loading...</p>
                          ) : (
                            <form onSubmit={updateMe}>
                              <div className="row">
                                <div className="col-sm-6">
                                  <label>First Name *</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={firstName}
                                    onChange={firstNameHandler}
                                    required
                                  />
                                </div>

                                <div className="col-sm-6">
                                  <label>Last Name *</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={lastName}
                                    onChange={lastNameHandler}
                                    required
                                  />
                                </div>
                              </div>

                              <label>Display Name *</label>
                              <input
                                type="text"
                                className="form-control"
                                value={displayName}
                                onChange={displayNameHandler}
                                required
                              />
                              <small className="form-text">
                                This will be how your name will be displayed in
                                the account section and in reviews
                              </small>

                              <label>Email address *</label>
                              <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={emailHandler}
                                required
                              />
                              {/* 
                            <label>
                              Current password (leave blank to leave unchanged)
                            </label>
                            <input type="password" className="form-control" />

                            <label>
                              New password (leave blank to leave unchanged)
                            </label>
                            <input type="password" className="form-control" />

                            <label>Confirm new password</label>
                            <input
                              type="password"
                              className="form-control mb-2"
                            /> */}

                              <button
                                type="submit"
                                className="btn btn-outline-primary-2"
                              >
                                <span>SAVE CHANGES</span>
                                <i className="icon-long-arrow-right"></i>
                              </button>
                            </form>
                          )}
                        </TabPanel>
                        <TabPanel>
                          <form onSubmit={changePasswordHandler}>
                            <label>
                              Current password (leave blank to leave unchanged)
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              onChange={currentPasswordHandler}
                            />

                            <label>
                              New password (leave blank to leave unchanged)
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              onChange={newPasswordHandler}
                            />

                            <label>Confirm new password</label>
                            <input
                              type="password"
                              className="form-control mb-2"
                              onChange={confirmPasswordHandler}
                            />
                            <button
                              type="submit"
                              className="btn btn-outline-primary-2"
                            >
                              <span>SUBMIT</span>
                              <i className="icon-long-arrow-right"></i>
                            </button>
                          </form>
                        </TabPanel>
                        <TabPanel></TabPanel>
                      </div>
                    </div>
                  </div>
                </Tabs>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

export default connect(mapStateToProps, { signOut })(React.memo(DashBoard));
