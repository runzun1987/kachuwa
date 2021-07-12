import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import jwt from 'jsonwebtoken';

// import Custom Components
import PageHeader from '../../common/page-header';
import Breadcrumb from '../../common/breadcrumb';

import { getCartTotal } from '../../../services';
import { quantityInputs, isIEBrowser } from '../../../utils';
import {
  changeQty,
  removeFromCart,
  changeShipping,
  showModal,
  signOut,
} from '../../../actions';
import auth from '../../../reducers/auth';

function Cart(props) {
  let history = useHistory();
  const { cartlist, total, removeFromCart, prevShip } = props;

  const [shipping, setShipping] = useState(prevShip);
  const shippingPrice = { free: 0, standard: 100, express: 20 };

  useEffect(() => {
    quantityInputs();
  });

  useEffect(() => {
    setShipping('standard');
    cartlist.map((item, index) => {
      if (
        document.querySelector(
          `#quantity-input-wrapper-${index} .input-group input`
        )
      ) {
        document.querySelector(
          `#quantity-input-wrapper-${index} .input-group input`
        ).value = item.qty;
        document.querySelector('.custom-control-input').checked = true;
      }
      return item;
    });
  }, [cartlist]);

  function onChangeShipping(val) {
    setShipping('standard');
  }

  function onChangeQty(e, skuId, price) {
    props.changeQty(
      skuId,
      e.currentTarget.querySelector('input[type="number"]').value,
      price
    );
  }

  function goToCheckout() {
    props.changeShipping(shipping);

    if (!props.isLoggedIn) {
      props.showModal('login');
      return;
    } else {
      history.push('/shop/checkout');
    }
  }

  return (
    <>
      <Helmet>
        <title>Kachuwa Nepal's No 1 Shopping Site</title>
      </Helmet>

      <h1 className="d-none">Kachuwa Nepal's No 1 Shopping Site</h1>

      <div className="main">
        <PageHeader title="Shopping Cart " subTitle="Shop" />
        <Breadcrumb
          title="Shopping Cart"
          parent1={['Shop', 'shop/sidebar/list']}
        />

        <div className="page-content">
          <div className="cart">
            <div className="container">
              <div className="row">
                <div className="col-lg-9">
                  <table className="table table-cart table-mobile">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Details</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {cartlist.length > 0 ? (
                        cartlist.map((item, index) => (
                          <tr key={'cart-item-' + index}>
                            <td className="product-col">
                              <div className="product">
                                <figure className="product">
                                  <Link
                                    to={`${process.env.PUBLIC_URL}/product/extended/${item.itemInfo.num_iid}`}
                                  >
                                    <img
                                      src={item.bigImageUrl + '_200x200.jpg'}
                                      data-oi={item.bigImageUrl}
                                      alt="product"
                                    />
                                  </Link>
                                </figure>

                                <h3 className="product-title">
                                  <Link
                                    to={`${process.env.PUBLIC_URL}/product/extended/${item.itemInfo.num_iid}`}
                                  >
                                    {item.title}
                                  </Link>
                                </h3>
                              </div>
                            </td>
                            <td className="price-col">
                              {item.detail.map((i, index) => (
                                <div key={index}>
                                  {
                                    <strong style={{ color: '#FCB953' }}>
                                      {i.name}
                                    </strong>
                                  }
                                  :
                                  {i.pic_url ? (
                                    <img
                                      style={{ width: '50px', height: '50px' }}
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

                            <td className="price-col">
                              Rs
                              {0 < item.discount
                                ? item.salePrice.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })
                                : item.price.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                            </td>

                            <td
                              className="quantity-col"
                              id={'quantity-input-wrapper-' + index}
                            >
                              <div
                                className="cart-product-quantity"
                                onClick={(e) => onChangeQty(e, item.skuId)}
                              >
                                <input
                                  type="number"
                                  className="form-control"
                                  defaultValue={item.qty}
                                  min="1"
                                  max={item.stock}
                                  step="1"
                                  data-decimals="0"
                                  required
                                />
                              </div>
                            </td>

                            <td className="total-col">
                              Rs
                              {item.sum === null
                                ? 0
                                : item.sum.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                            </td>

                            <td className="remove-col">
                              <button
                                className="btn-remove"
                                onClick={(e) => removeFromCart(item.skuId)}
                              >
                                <i className="icon-close"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td>
                            <p className="pl-2 pt-1 pb-1">
                              {' '}
                              No Products in Cart{' '}
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {/* <div className="cart-bottom">
                                        <div className="cart-discount" style={ { minHeight: isIEBrowser() ? '40px' : 'auto' } }>
                                            <form action="#">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" required="" placeholder="coupon code" />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-outline-primary-2" type="submit"><i className="icon-long-arrow-right"></i></button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                        <button className="btn btn-outline-dark-2"><span>UPDATE CART</span><i className="icon-refresh"></i></button>
                                    </div> */}
                </div>
                <aside className="col-lg-3">
                  <div className="summary summary-cart">
                    <h3 className="summary-title">Cart Total</h3>

                    <table className="table table-summary">
                      <tbody>
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
                        {/* <tr className="summary-shipping">
                                                    <td>Shipping:</td>
                                                    <td>&nbsp;</td>
                                                </tr> */}

                        {/* <tr className="summary-shipping-row">
                                                    <td>
                                                        <div className="custom-control custom-radio">
                                                            <input type="radio"
                                                                id="free-shipping"
                                                                name="shipping"
                                                                className="custom-control-input"
                                                                onChange={ ( e ) => onChangeShipping( "free" ) }
                                                                defaultChecked={ "free" === prevShip ? true : false }
                                                            />
                                                            <label className="custom-control-label" htmlFor="free-shipping">Free Shipping</label>
                                                        </div>
                                                    </td>
                                                    <td>$0.00</td>
                                                </tr> */}

                        <tr className="summary-shipping-row">
                          <td>
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                id="standard-shipping"
                                name="shipping"
                                className="custom-control-input"
                                onChange={(e) => onChangeShipping('standard')}
                                defaultChecked={
                                  'standard' === prevShip ? true : false
                                }
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="standard-shipping"
                              >
                                Standard:
                              </label>
                            </div>
                          </td>
                          <td>Rs 100.00</td>
                        </tr>

                        {/* <tr className="summary-shipping-row">
                                                    <td>
                                                        <div className="custom-control custom-radio">
                                                            <input type="radio"
                                                                id="express-shipping"
                                                                name="shipping"
                                                                className="custom-control-input"
                                                                onChange={ ( e ) => onChangeShipping( "express" ) }
                                                                defaultChecked={ "express" === prevShip ? true : false }
                                                            />
                                                            <label className="custom-control-label" htmlFor="express-shipping">Express:</label>
                                                        </div>
                                                    </td>
                                                    <td>$20.00</td>
                                                </tr> */}

                        {/* <tr className="summary-shipping-estimate">
                                                    <td>Estimate for Your Country<br /> <a href={ `${process.env.PUBLIC_URL}/shop/dashboard` }>Change address</a></td>
                                                    <td>&nbsp;</td>
                                                </tr> */}

                        <tr className="summary-total">
                          <td>Total:</td>
                          <td>
                            Rs
                            {(total + shippingPrice[shipping]).toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <button
                      className="btn btn-outline-primary-2 btn-order btn-block"
                      onClick={goToCheckout}
                    >
                      PROCEED TO CHECKOUT
                    </button>
                  </div>

                  <Link
                    to={`${process.env.PUBLIC_URL}`}
                    className="btn btn-outline-dark-2 btn-block mb-3"
                  >
                    <span>CONTINUE SHOPPING</span>
                    <i className="icon-refresh"></i>
                  </Link>
                </aside>
              </div>
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
  prevShip: state.cartlist.shipping,
  isLoggedIn: state.cognitoIsLoggedIn.isLoggedIn,
  token: state.auth.token,
});

export default connect(mapStateToProps, {
  changeQty,
  removeFromCart,
  changeShipping,
  showModal,
  signOut,
})(Cart);
