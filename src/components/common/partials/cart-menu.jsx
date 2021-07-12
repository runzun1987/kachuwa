import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import { getCartCount, getCartTotal } from '../../../services';
import { removeFromCart, showModal } from '../../../actions';

import { safeContent } from '../../../utils';

function CartMenu(props) {
  const history = useHistory();
  const { cartlist, removeFromCart } = props;

  let total = getCartTotal(cartlist);

  function goToCheckout() {
    // props.changeShipping(shipping);
    if (!props.isLoggedIn) {
      props.showModal('login');
      return;
    }

    jwt.verify(props.token, process.env.REACT_APP_JWT_KEY, (err, decode) => {
      if (err) {
        console.log(err);
        props.showModal('login');
        props.signOut();
      } else {
        history.push('/shop/checkout');
      }
    });
    // props.changeShipping( shipping );
    // if(!props.isLoggedIn){
    //     console.log("please login")
    //     props.showModal('login')
    //     return
    // }
    // console.log(props.isLoggedIn)
    // history.push('/shop/checkout')
  }

  return (
    <div className="dropdown cart-dropdown">
      <Link
        to={`${process.env.PUBLIC_URL}/shop/cart`}
        className="dropdown-toggle"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        data-display="static"
      >
        <i className="icon-shopping-cart"></i>
        <span className="cart-count">{getCartCount(cartlist)}</span>
        <span className="cart-txt">Cart</span>
      </Link>

      <div
        className={`dropdown-menu dropdown-menu-right ${
          cartlist.length === 0 ? 'text-center' : ''
        }`}
      >
        {0 === cartlist.length ? (
          <p>No products in the cart.</p>
        ) : (
          <>
            <div className="dropdown-cart-products">
              {cartlist.map((item, index) => (
                <div className="product" key={index}>
                  {console.log(item)}
                  <div className="product-cart-details">
                    <h4 className="product-title">
                      <Link
                        to={`${process.env.PUBLIC_URL}/product/extended/${item.itemInfo.num_iid}`}
                        dangerouslySetInnerHTML={safeContent(item.title)}
                      ></Link>
                    </h4>

                    <span className="cart-product-info">
                      <span className="cart-product-qty">{item.qty}</span>x $
                      {item.discount
                        ? item.salePrice.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : item.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                    </span>
                  </div>

                  <figure className="product-image-container">
                    <Link
                      to={`${process.env.PUBLIC_URL}/product/extended/${item.itemInfo.num_iid}`}
                      className="product-image"
                    >
                      <img
                        src={item.bigImageUrl}
                        data-oi={
                          process.env.PUBLIC_URL + '/' + item.bigImageUrl
                        }
                        alt="product"
                      />
                    </Link>
                  </figure>
                  <button
                    className="btn-remove"
                    title="Remove Product"
                    onClick={() => removeFromCart(item.skuId)}
                  >
                    <i className="icon-close"></i>
                  </button>
                </div>
              ))}
            </div>
            <div className="dropdown-cart-total">
              <span>Total</span>

              <span className="cart-total-price">
                $
                {total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="dropdown-cart-action">
              <Link
                to={`${process.env.PUBLIC_URL}/shop/cart`}
                className="btn btn-primary"
              >
                View Cart
              </Link>
              {/* <Link to={ `${process.env.PUBLIC_URL}/shop/checkout` } className="btn btn-outline-primary-2"><span>Checkout</span><i className="icon-long-arrow-right"></i></Link> */}
              <span
                className="btn btn-outline-primary-2"
                onClick={goToCheckout}
              >
                Checkout
              </span>
              {/* <i className="icon-long-arrow-right"></i> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cartlist: state.cartlist.cart ? state.cartlist.cart : [],
    isLoggedIn: state.auth.token !== null,
    token: state.auth.token,
  };
}

export default connect(mapStateToProps, { removeFromCart, showModal })(
  CartMenu
);
