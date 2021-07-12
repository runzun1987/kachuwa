import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { toast } from 'react-toastify';
import { Alert1 } from 'reactstrap';

// import Comp from './Comp12';
import Stock from './Stock';
import Price from './Price';
import Alert from './alert';
import './style.css';
import Categories from './Categories';

import { addToCart, toggleWishlist, showModal } from '../../../../../actions';

import {
  quantityInputs,
  isIEBrowser,
  isEdgeBrowser,
  findIndex,
} from '../../../../../utils';
import './detail-one.scss';

function ProductDetailOne(props) {
  const [stock, setStock] = useState('');
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [propObj, setPropObj] = useState();
  const [emptyArray, setEmptyArray] = useState();
  const [skuJson, setSkuJson] = useState();
  const [sku, setSku] = useState();
  const [OFS, setOFS] = useState();
  const [inStock, setInStock] = useState();
  const [condition, setCondition] = useState(true);

  const { product, isWishlist, type, addToCart, toggleWishlist } = props;
  const alert = useAlert();

  useEffect(() => {
    const { title, price, prop_obj, stock, skus_json } = product;

    const allPrice = [];
    const outofStockArr = [];
    const inStockArr = [];
    const json = JSON.parse(skus_json);
    setSku(json);

    for (let i = 0; i < json.length; i++) {
      if (json[i][3] === 0) {
        outofStockArr.push(json[i]);
      } else {
        inStockArr.push(json[i]);
        allPrice.push(json[i][2]);
      }
    }
    setTitle(title);
    setPrice(price);
    setPropObj(prop_obj);
    setStock(stock);
    setSkuJson(skus_json);
    setOFS(outofStockArr);
    setInStock(inStockArr);

    quantityInputs();
  }, []);
  const detailsArr = [];

  const addToCartHandler = () => {
    const qty = document.querySelector('#qty').value;
    if (stock === 0) {
      toast.error('This product is out of stock !!!', {
        position: 'top-right',
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (qty > stock) {
      toast.error('You selected more quantity then our stock !!!', {
        position: 'top-right',
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // alert.show(
      //   'This Product is out of Stock or You selected more quantity then our stock'
      // );
    }

    if (0 !== stock && qty <= stock) {
      if (emptyArray.includes(undefined)) {
        toast.warn('Please select all category !!!', {
          position: 'top-right',
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // toast.error('Please Select All Category Please!');
        // alert.show('Please Select All Category Please!');
      } else {
        let index = 0;
        for (const property in propObj) {
          const selectedArr = emptyArray[index].split(':');
          const key = selectedArr[0];
          const value = selectedArr[1];
          detailsArr.push(propObj[property][value]);
          index++;
        }

        if (emptyArray.length) {
          const skuDetail = emptyArray.join(';');
          const result = sku.filter((r) => r[1] === skuDetail);
          const skuId = result[0][0];
          addToCart(product, qty, price, skuDetail, skuId, detailsArr);
        } else {
          const skuId = product.itemInfo.num_iid;
          addToCart(product, qty, price, null, skuId, detailsArr);
        }
      }
    }
  };
  //finding Id in search products

  const newProduct = props.searchProducts.products.filter(
    (p) => p.id === product.itemInfo.num_iid
  );

  const wishlistHandler = () => {
    if (isWishlist) {
      window.location = process.env.PUBLIC_URL + '/shop/wishlist';
    } else {
      toggleWishlist(newProduct[0], isWishlist);
    }
  };

  const qtyHandler = () => {};

  return (
    <>
      {!condition ? <Alert message="Select All" /> : ''}
      {product && (
        <div className={'product-details'}>
          <h1 className="product-title">{title}</h1>

          {/* <div className="ratings-container">
            <div className="ratings">
              <div
                className="ratings-val"
                style={{ width: product.ratings * 20 + '%' }}
              ></div>
            </div>
            <Link
              className="ratings-text"
              to="#product-review-link"
              id="review-link"
            >
              ( {product.reviews} Reviews )
            </Link>
          </div> */}

          {0 === stock ? (
            <div className="product-price">
              <span className="out-price">
                Rs :
                {product.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                <div style={{ color: 'red' }}>This product is out of Stock</div>
              </span>
            </div>
          ) : 0 < product.discount ? (
            <div className="product-price">
              <span className="new-price">
                Rs
                {product.salePrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className="old-price">
                Rs
                {product.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          ) : (
            <div className="product-price">
              {product && product.price ? (
                <Price price={price} />
              ) : (
                <div className="product-price"> Rs :{price}</div>
              )}
              {/* {product.price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} */}
            </div>
          )}

          <div className="product-content">
            <p>{product.shortDesc}</p>
          </div>

          {product.variants ? (
            <div className="details-filter-row details-row-size">
              <label>Color:</label>
              {product.variants[0].color ? (
                <div className="product-nav product-nav-dots">
                  {product.variants.map((vari, i) => (
                    <Link
                      to="#"
                      key={i}
                      className={0 === i ? 'active' : ''}
                      style={{ backgroundColor: vari.color }}
                    ></Link>
                  ))}
                </div>
              ) : (
                <div className="product-nav product-nav-thumbs">
                  {product.variants[0].model
                    ? product.variants.map((vari, i) => (
                        <Link
                          to="#"
                          key={i}
                          className={0 === i ? 'active' : ''}
                        >
                          <img
                            src={process.env.PUBLIC_URL + '/' + vari.model}
                            alt="product desc"
                          />
                        </Link>
                      ))
                    : product.variants[0].image
                    ? product.variants.map((vari, i) => (
                        <Link
                          to="#"
                          key={i}
                          className={0 === i ? 'active' : ''}
                        >
                          <img
                            src={process.env.PUBLIC_URL + '/' + vari.image}
                            alt="product desc"
                          />
                        </Link>
                      ))
                    : ''}
                </div>
              )}
            </div>
          ) : (
            ''
          )}
          {
            <div className="details-filter-row details-row-size">
              <Categories
                propObj={propObj}
                empArr={emptyArray}
                setEmpArr={setEmptyArray}
                sku={skuJson}
                setPrice={setPrice}
                setStock={setStock}
                price={price}
                ofs={OFS}
                inStock={inStock}
                stock={stock}
              />
            </div>
          }

          <div className="details-filter-row details-row-size">
            <label htmlFor="qty">Qty:</label>
            <div className="product-details-quantity">
              <input
                type="number"
                id="qty"
                className="form-control"
                defaultValue="1"
                min="1"
                max={product.stock}
                step="1"
                data-decimals="0"
                required
              />
              {<Stock stock={stock} />}
            </div>
          </div>

          <div className="product-details-action">
            {isIEBrowser() || isEdgeBrowser() ? (
              <button
                className="btn-product btn-cart"
                onClick={addToCartHandler}
                style={{ minHeight: '4rem' }}
              >
                <span>add to cart</span>
              </button>
            ) : (
              <button
                className="btn-product btn-cart"
                onClick={addToCartHandler}
              >
                <span>add to cart</span>
              </button>
            )}

            {isIEBrowser() || isEdgeBrowser() ? (
              <div className="details-action-wrapper IE-detail-action-wrapper">
                <button
                  className={`btn-product btn-wishlist pl-0 pr-0 ${
                    isWishlist ? 'added-to-wishlist' : 'remove-from-wishlist'
                  }`}
                  onClick={wishlistHandler}
                  title={isWishlist ? 'Go to wishlist' : 'Add to wishlist'}
                >
                  <span>
                    {isWishlist ? 'go to wishlist' : 'add to wishlist'}
                  </span>
                </button>
              </div>
            ) : (
              <div className="details-action-wrapper">
                <button
                  className={`btn-product btn-wishlist pl-0 pr-0 ${
                    isWishlist ? 'added-to-wishlist' : 'remove-from-wishlist'
                  }`}
                  onClick={wishlistHandler}
                  title={isWishlist ? 'Go to wishlist' : 'Add to wishlist'}
                >
                  <span>
                    {isWishlist ? 'Go to Wishlist' : 'Add to Wishlist'}
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="product-details-footer">
            {/* <div className="product-cat">
              <span>Category: </span>
              {product.category.map((cat, index) => (
                <span key={index} className="mr-0">
                  <Link to="#">{cat}</Link>
                  {index < product.category.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div> */}

            {/* <div className="social-icons social-icons-sm">
              <span className="social-label">Share:</span>
              <Link
                to="#"
                className="social-icon"
                title="Facebook"
                target="_blank"
              >
                <i className="icon-facebook-f"></i>
              </Link>
              <Link
                to="#"
                className="social-icon"
                title="Twitter"
                target="_blank"
              >
                <i className="icon-twitter"></i>
              </Link>
              <Link
                to="#"
                className="social-icon"
                title="Instagram"
                target="_blank"
              >
                <i className="icon-instagram"></i>
              </Link>
              <Link
                to="#"
                className="social-icon"
                title="Pinterest"
                target="_blank"
              >
                <i className="icon-pinterest"></i>
              </Link>
            </div> */}
          </div>

          {props.children}
        </div>
      )}
    </>
  );
}

function mapStateToProps(state, props) {
  return {
    // product: state.data.products.filter( product => product.id === parseInt( props.id ) )[ 0 ],
    product: state.productDetail.prodDetail.specialObj,
    isWishlist:
      findIndex(state.wishlist.list, (item) => item.id === props.id) !== -1
        ? true
        : false,
    isLoggedIn: state.isLoggedIn.isLoggedIn,
    searchProducts: state.search ? state.search : [],
  };
}

export default connect(mapStateToProps, {
  addToCart,
  toggleWishlist,
  showModal,
})(ProductDetailOne);
