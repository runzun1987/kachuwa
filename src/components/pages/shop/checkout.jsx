import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect, createSelectorHook } from 'react-redux';
import { Helmet } from 'react-helmet';
import jwt from 'jsonwebtoken';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import Lambda from 'aws-sdk/clients/lambda';

// import Custom Components
import PageHeader from '../../common/page-header';
import Breadcrumb from '../../common/breadcrumb';
import Accordion from '../../features/accordion/accordion';
import Card from '../../features/accordion/card';
import { useHttpClient } from '../../../api/hooks/http-hook';

import { getCartTotal } from '../../../services';
import { refreshStore, cognitoSignInCheck } from '../../../actions';
import { createOrder } from './../../../graphql/mutations';

function Checkout(props) {
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { cartlist, total } = props;
  const shippingPrice = { free: 0, standard: 100, express: 200 };
  const shippingObj = {
    free: 'Free shipping',
    standard: 'Standard',
    express: 'Express',
  };

  const [user, setUser] = useState('');
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState('');
  const [photo, setPhoto] = useState('');
  const [email, setEmail] = useState('');
  // const [orders, setOrders] = useState([]);

  const [street, setStreet] = useState('');
  const [town, setTown] = useState('Kathmandu');
  const [country, setCountry] = useState('Nepal');
  const [phone, setPhone] = useState('');
  // const [edit, setEdit] = useState(false);

  const [note, setNote] = useState('');
  const [innerTotal, setInnerTotal] = useState('');

  const testFunction = () => {
    Auth.currentCredentials().then((credentials) => {
      const lambda = new Lambda({
        credentials: Auth.essentialCredentials(credentials),
      });

      const result = lambda.invoke({
        FunctionName: 'kachuwaMailSender',
        Payload: JSON.stringify({ hello: 'world' }),
      });

      console.log(result, 'resuttttttttttttttttttt');
    });
  };

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
  }, [props.isLoggedIn]);

  useEffect(() => {
    setInnerTotal(total + shippingPrice[props.shipping]);
  }, []);

  useEffect(() => {
    const users = async () => {
      try {
        const result = await Auth.currentAuthenticatedUser();

        const info = result.attributes;
        console.log(info);

        setStreet(info['custom:street']);
        setTown(info['custom:town']);
        setCountry(info['custom:country']);
        setPhone(info['custom:phone']);

        setRole(info['custom:role']);
        setFirstName(info['custom:firstName']);
        setLastName(info['custom:lastName']);

        setPhoto(info.photo);
        setDisplayName(result.userName);
      } catch (err) {
        console.log(err, '------------');
      }
    };
    users();
  }, []);

  // const checkoutFormSubmitHandler = async (event) => {
  //   event.preventDefault();
  //   const innerFirstName = event.target.firstName.value;
  //   const innerLastName = event.target.lastName.value;
  //   const innerCountry = event.target.country.value;
  //   const innerStreet = event.target.street.value;
  //   const innerTown = event.target.town.value;
  //   const innerPhone = event.target.phone.value;
  //   const innerEmail = event.target.email.value;

  //   try {
  //     await sendRequest(
  //       process.env.REACT_APP_BACKEND_URL + '/users/updateMe',
  //       'PATCH',
  //       {
  //         firstName: firstName || innerFirstName,
  //         lastName: lastName || innerLastName,
  //       },
  //       { Authorization: 'Bearer ' + props.token }
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   try {
  //     const result = await sendRequest(
  //       process.env.REACT_APP_BACKEND_URL + '/users/updateAddress',
  //       'PATCH',
  //       {
  //         address: {
  //           street: street || innerStreet,
  //           town: town || innerTown,
  //           country: country || innerCountry,
  //           phone: phone || innerPhone,
  //         },
  //       },
  //       { Authorization: 'Bearer ' + props.token }
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   try {
  //     const responseData = await sendRequest(
  //       process.env.REACT_APP_BACKEND_URL + '/orders',
  //       'POST',
  //       {
  //         // id,
  //         firstName: firstName || innerFirstName,
  //         lastName: lastName || innerLastName,
  //         country: country || innerCountry,
  //         street: street || innerStreet,
  //         town: town || innerTown,
  //         phone: phone || innerPhone,
  //         email: email || innerEmail,
  //         note,
  //         cartList: props.cartlist,
  //         total: innerTotal,
  //       },
  //       { Authorization: 'Bearer ' + props.token }
  //     );

  //     props.refreshStore();
  //     const path = '/pages/thank-you';
  //     history.push(path);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const checkoutFormSubmitHandler = async (event) => {
    event.preventDefault();
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const country = event.target.country.value;
    const street = event.target.street.value;
    const town = event.target.town.value;
    const phone = event.target.phone.value;
    const email = event.target.email.value;

    const user = await Auth.currentAuthenticatedUser();
    try {
      const result = await Auth.updateUserAttributes(user, {
        'custom:firstName': firstName,
        'custom:lastName': lastName,
        'custom:country': country,
        'custom:street': street,
        'custom:town': town,
      });

      const cartList = props.cartlist.map((c) => ({
        bigImageUrl: c.bigImageUrl,
        smallImages: c.smallImages,
        title: c.title,
        price: c.price,
        stock: c.stock,
        description: c.description,
        qty: c.qty,
        sum: parseInt(c.sum),
        skus: c.skus,
        SkuId: c.skuId,
        totalPrice: c.totalPrice,
        skus_json: c.skus_json,
      }));

      const test = {
        date: Date.now(),
        status: 'Pending',
        firstName,
        lastName,
        country,
        street,
        town,
        phone,
        email,
        note,
        total: parseInt(total),
        cartList,
      };

      const data = await API.graphql(
        graphqlOperation(createOrder, {
          input: {
            date: Date.now(),
            status: 'Pending',
            firstName,
            lastName,
            country,
            street,
            town,
            phone,
            email,
            note,
            total: parseInt(total),
            cartList,
          },
        })
      );
      props.refreshStore();
       /**************Send Email USING SES *******************/
        /********************* OR ******************/
        /********** Invoke Lamda function ****************/ 
      const path = '/pages/thank-you';
      history.push(path);
        
      alert('Order Has been made');
      testFunction();
    } catch (er) {
      console.log(er, '44444444444444');
    }
  };

  const streetHandler = (e) => {
    setStreet(e.target.value);
  };
  const emailHandler = () => {
    console.log('You cannot change email');
  };

  return (
    <>
      <Helmet>
        <title>Kachuwa Nepal's No 1 Shopping Site</title>
      </Helmet>

      <h1 className="d-none">Kachuwa Nepal's No 1 Shopping Site</h1>

      <div className="main">
        <PageHeader title="Checkout" subTitle="Shop" />
        <Breadcrumb title="Checkout" parent1={['Shop', 'shop/sidebar/list']} />

        <div className="page-content">
          <div className="checkout">
            <div className="container">
              {/* <div className="checkout-discount">
                                <form action="#">
                                    <input type="text" className="form-control" required id="checkout-discount-input" />
                                    <label htmlFor="checkout-discount-input" className="text-truncate">Have a coupon? <span>Click here to enter your code</span></label>
                                </form>
                            </div> */}

              <form onSubmit={checkoutFormSubmitHandler}>
                <div className="row">
                  <div className="col-lg-9">
                    <h2 className="checkout-title">Billing Details</h2>
                    <div className="row">
                      <div className="col-sm-6">
                        <label>First Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setFirstName(e.target.value)}
                          name="firstName"
                          value={firstName}
                          required
                        />
                      </div>

                      <div className="col-sm-6">
                        <label>Last Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          onChange={(e) => setLastName(e.target.value)}
                          value={lastName}
                          required
                        />
                      </div>
                    </div>

                    {/* <label>Company Name (Optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setCompanyName(e.target.value)}
                      value={companyName}
                    /> */}

                    <label>Country *</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setCountry(e.target.value)}
                      name="country"
                      value={country}
                      required
                    />

                    <label>Street address *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="House number and Street name"
                      onChange={streetHandler}
                      name="street"
                      value={street}
                      required
                    />
                    {/* <input
                      type="text"
                      className="form-control"
                      placeholder="Appartments, suite, unit etc ..."
                      onChange={(e) => setAppSuiteUnit(e.target.value)}
                      value={appSuiteUnit}
                      required
                    /> */}

                    <div className="row">
                      <div className="col-sm-6">
                        <label>Town / City *</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setTown(e.target.value)}
                          name="town"
                          value={town}
                          required
                        />
                      </div>

                      <div className="col-sm-6">
                        <label>Phone *</label>
                        <input
                          type="tel"
                          className="form-control"
                          onChange={(e) => setPhone(e.target.value)}
                          name="phone"
                          value={props.userDetail.mobile}
                          required
                        />

                        {/* <label>State / County *</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setStateCountry(e.target.value)}
                          value={stateCountry}
                          required
                        /> */}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6">
                        {/* <label>Postcode / ZIP *</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setPostCodeZip(e.target.value)}
                          value={postCodeZip}
                          required
                        /> */}
                      </div>

                      {/* <div className="col-sm-6">
                        <label>Phone *</label>
                        <input
                          type="tel"
                          className="form-control"
                          onChange={(e) => setPhone(e.target.value)}
                          value={phone}
                          required
                        />
                      </div> */}
                    </div>

                    <label>Email address *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={props.userDetail.email}
                      required
                      onChange={emailHandler}
                    />

                    {/* <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="checkout-create-acc"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="checkout-create-acc"
                      >
                        Create an account?
                      </label>
                    </div> */}

                    {/* <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="checkout-diff-address"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="checkout-diff-address"
                      >
                        Ship to a different address?
                      </label>
                    </div> */}

                    <label>Order notes (optional)</label>
                    <textarea
                      className="form-control"
                      cols="30"
                      rows="4"
                      placeholder="Notes about your order, e.g. special notes for delivery"
                      onChange={(e) => setNote(e.target.value)}
                      value={note}
                    ></textarea>
                  </div>

                  <aside className="col-lg-3">
                    <div className="summary">
                      <h3 className="summary-title">Your Order</h3>

                      <table className="table table-summary">
                        <thead>
                          <tr>
                            <th>Product</th>

                            <th>Total</th>
                          </tr>
                        </thead>

                        <tbody>
                          {cartlist.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <Link to="#">{item.title}</Link>
                                {item.detail.map((i) => (
                                  <div key={i.name}>
                                    {
                                      <strong style={{ color: '#FCB953' }}>
                                        {i.name}
                                      </strong>
                                    }
                                    :
                                    {i.pic_url ? (
                                      <img
                                        style={{
                                          width: '40px',
                                          height: '40px',
                                        }}
                                        src={i.pic_url + '_100x100.jpg'}
                                        alt={i.value}
                                        className="cart-product-quantity"
                                      />
                                    ) : (
                                      i.value
                                    )}{' '}
                                  </div>
                                ))}
                              </td>

                              <td>
                                Rs
                                {item.sum === null
                                  ? 0
                                  : item.sum.toLocaleString(undefined, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                              </td>
                            </tr>
                          ))}
                          <tr className="summary-subtotal">
                            <td>Subtotal:</td>
                            <td>
                              Rs
                              {total.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </td>
                          </tr>
                          <tr>
                            <td>Shipping:</td>

                            <td>{shippingObj[props.shipping]}</td>
                          </tr>
                          <tr className="summary-total">
                            <td>Total:</td>
                            <td>
                              Rs
                              {(
                                total + shippingPrice[props.shipping]
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <Accordion type="checkout">
                        {/* <Card title="Direct bank transfer" expanded={true}>
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
                          Your order will not be shipped until the funds have
                          cleared in our account.
                        </Card> */}

                        {/* <Card title="Check payments">
                          Ipsum dolor sit amet, consectetuer adipiscing elit.
                          Donec odio. Quisque volutpat mattis eros. Nullam
                          malesuada erat ut turpis.
                        </Card> */}

                        <Card title="Cash on delivery">
                          Pay cash on delivery
                        </Card>

                        {/* <Card title="PayPal">
                          <small className="float-right paypal-link">
                            What is PayPal?
                          </small>
                          Nullam malesuada erat ut turpis. Suspendisse urna
                          nibh, viverra non, semper suscipit, posuere a, pede.
                          Donec nec justo eget felis facilisis fermentum.
                        </Card> */}

                        {/* <Card title="Credit Card (Stripe)">
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/payments-summary.png`}
                            alt="payments cards"
                          />
                          Donec nec justo eget felis facilisis fermentum.Lorem
                          ipsum dolor sit amet, consectetuer adipiscing elit.
                          Donec odio. Quisque volutpat mattis eros. Lorem ipsum
                          dolor sit ame.
                        </Card> */}
                      </Accordion>

                      {isLoading ? (
                        <p> Please Wait... </p>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-outline-primary-2 btn-order btn-block"
                        >
                          <span className="btn-text">Place Order</span>
                          <span className="btn-hover-text">
                            Proceed to Checkout
                          </span>
                        </button>
                      )}
                    </div>
                  </aside>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const mapStateToProps = (state) => ({
  cartlist: state.cartlist.cart,
  total: getCartTotal(state.cartlist.cart),
  shipping: state.cartlist.shipping,
  isLoggedIn: state.cognitoIsLoggedIn.isLoggedIn,
  token: state.auth.token,
  userDetail: state.cognitoIsLoggedIn,
});

export default connect(mapStateToProps, { refreshStore, cognitoSignInCheck })(
  Checkout
);
