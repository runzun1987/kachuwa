import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';

import ProductEight from '../product-two';
import QuickView from '../common/quickview';
// import InfiniteScroll from 'react-infinite-scroll-component';

import {
  addToCart,
  toggleWishlist,
  addToCompare,
  showQuickViewModal,
  filterSort,
  addProductTosearchProducts,
} from '../../../../actions';
// import { getVisibleProducts } from '../../../../services';
import './styles.scss';

function ProductListTwo(props) {
  let {
    type,
    filters,
    addToCart,
    toggleWishlist,
    addToCompare,
    showQuickViewModal,
    searchErrorMessage,
    searchErrorCode,
    isLoading,
    products,
    page,
    keyword,
    keywordToSearch,
    progress,
    choice,
  } = props;

  let message1 = `<span class="spinner-grow text-danger" role="status" aria-hidden="true"></span> Uploading Image <strong>${progress}</strong>% please wait`;
  let message2 = `<span class="spinner-grow text-success" role="status" aria-hidden="true"></span> Trying to find match with millions of products please wait`;

  const [searchErrorMsg, setSearchErrorMsg] = useState('');
  const [product, setProduct] = useState();

  const [innerProducts, setInnerProducts] = useState();
  const [innerItems, setInnerItem] = useState();

  const [originalProducts, setOriginalProducts] = useState();
  const [orginalItems, setOriginalItem] = useState();

  const [sort, setSort] = useState();

  useEffect(() => {
    setOriginalProducts(products);
    setOriginalItem(products.products);
    const innerProds = { ...products };
    setInnerProducts(innerProds);

    let innerItms = [...innerProds.products];

    setInnerItem(innerItms);
    // const y = [];
    // const odd = innerItms.filter((itm, index) => {
    //   if (index % 2 !== 0) {
    //     return itm;
    //   } else {
    //     y.push(itm);
    //   }
    // });

    // const even = [...y].sort((a, b) => a.price - b.price);

    // const join = [];
    // even.forEach((item, index) => {
    //   join.push(item, odd[index]);
    // });

    // setInnerItem(join);
  }, [products]);

  useEffect(() => {
    if (searchErrorCode) {
      setSearchErrorMsg(searchErrorMessage);
    }
  }, [searchErrorCode]);

  // const [loadedCount, setLoadedCount] = useState(44);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [buttomLoading, setButtomLoading] = useState(false);

  // const [intervalID, setIntervalID] = useState(useRef(null));

  useEffect(() => {
    if (isLoading) {
      if (keywordToSearch === 'kachuwa-image') {
        if (progress !== 100) {
          document.querySelector('.loading').innerHTML = message1;
        } else {
          document.querySelector('.loading').innerHTML = message2;
        }
      } else {
        console.log(document.querySelector('.loading').parentElement);
        document.querySelector(
          '.loading'
        ).innerHTML = `<span class="spinner-grow text-success" role="status" aria-hidden="true"></span>
          please wait searching <strong>${keywordToSearch}</strong>`;
      }
    }
  }, [progress, isLoading]);

  const observer = useRef();

  const lastElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (products.totalProducts > products.products.length) {
            loadMore(
              keyword,
              (parseInt(page) + 1).toString(),
              props.choice,
              props.userId
            );
          } else {
            setHasMore(false);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page, props.userId]
  );

  const classList = {
    boxed: 'col-6 col-md-4 col-lg-4 col-xl-3',
    fullwidth: 'col-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2',
  };
  // products = getVisibleProducts( products.slice( 20, 35 ), filters );

  function showSideBar() {
    document.querySelector('body').classList.add('sidebar-filter-active');
  }

  function changeFilter(e, f) {
    // props.filterSort(e.target.value);
    let option;
    if (e) {
      option = e.target.value;
      if (option === 'low-high') {
        setInnerItem([...innerItems].sort((a, b) => a.price - b.price));
      } else if (option === 'high-low') {
        setInnerItem([...innerItems].sort((a, b) => b.price - a.price));
      } else {
        setInnerItem(orginalItems);
      }
    }
  }

  function loadMore(keyword, page) {
    // fake async api. products should be fetched from backend

    props.addProductTosearchProducts(keyword, page, choice, props.userId);
    setButtomLoading(true);
    if (!hasMore) {
      setButtomLoading(false);
    }

    // if (loadedCount < products.length) {
    //   setLoading(true);

    //   timer = setTimeout(() => {
    //     setLoadedCount((prevCount) => prevCount + 4);
    //     setLoading(false);

    //     if (loadedCount >= products.length - 4) {
    //       setHasMore(false);
    //     }
    //   }, 2000);
    // } else {
    //   timer = setTimeout(() => {
    //     setHasMore(false);
    //   }, 500);
    // }
  }

  // useEffect(() => {
  //   products = getVisibleProducts( props.search.slice( 20, 35 ), filters );
  //    console.log(products,'----------------')
  //   if (products.length > 8) {

  //     setHasMore(true);
  //   } else {
  //     setHasMore(false);
  //   }
  // }, [filters]);

  useEffect(() => {
    //   products = getVisibleProducts( props.search.slice( 20, 35 ), filters );
    // console.log(products)

    if (products.totalProducts > products.products.length) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [filters, products]);

  return (
    <>
      <div className="toolbox">
        {/* <div className="toolbox-left">
          <button
            className="sidebar-toggler"
            onClick={showSideBar}
            style={{ padding: '0' }}
          >
            <i className="icon-bars"></i>Filters
          </button>
        </div> */}

        <div className="toolbox-center">
          {isLoading ? (
            <span className="loading"></span>
          ) : (
            <div className="toolbox-info">
              Showing{' '}
              <span>
                {Math.min(products.products.length)} of {products.totalProducts}
              </span>{' '}
              Products
            </div>
          )}
        </div>

        <div className="toolbox-right">
          <div className="toolbox-sort">
            <label htmlFor="sortby">Sort by:</label>
            <div className="select-custom">
              <select
                name="sortby"
                id="sortby"
                defaultValue={filters.sortBy}
                className="form-control"
                onChange={changeFilter}
              >
                <option value="default">Default</option>
                <option value="low-high">Low to High</option>
                <option value="high-low">High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="products mb-3">
        {isLoading ? (
          <div className="main-loading">
            <div className="image-content">
              {/* <div className="planet">
                  <div className="ring"></div>
                  <div className="cover-ring"></div>
                  <div className="spots">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <p className="kachuwa-loading">loading</p> */}

              <div className="body">
                <span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                <div className="base">
                  <span></span>
                  <div className="face"></div>
                </div>
              </div>
              <div className="longfazers">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <h1 className="kachuwa-please-wait">Please wait</h1>
            </div>
          </div>
        ) : searchErrorCode ? (
          <h1 style={{ color: 'red' }}>{searchErrorMessage}</h1>
        ) : (
          <div className="row">
            {innerItems &&
              innerItems.slice(0, innerItems.length).map((item, index) => {
                if (innerItems.length === index + 1) {
                  return (
                    <div
                      className={classList[type]}
                      ref={lastElement}
                      key={index}
                    >
                      <ProductEight
                        product={item}
                        items={props.products}
                        onAddToCart={addToCart}
                        onToggleWishlist={toggleWishlist}
                        onAddToCompare={addToCompare}
                        showQuickView={showQuickViewModal}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div className={classList[type]} key={index}>
                      <ProductEight
                        product={item}
                        items={props.products}
                        onAddToCart={addToCart}
                        onToggleWishlist={toggleWishlist}
                        onAddToCompare={addToCompare}
                        showQuickView={showQuickViewModal}
                      />
                    </div>
                  );
                }
              })}
          </div>
        )}

        <QuickView />
      </div>

      <div className="load-more-container text-center">
        {hasMore ? (
          // <button
          //   className="btn btn-outline-darker btn-load-more"
          //   onClick={loadMore}
          // >
          //   <span>More Products </span>
          //   {loading ? (
          //     <i className="icon-refresh load-more-rotating"></i>
          //   ) : (
          //     <i className="icon-refresh"></i>
          //   )}
          // </button>
          <>
            <div className="content-buttom-loading">
              <div className="loading">
                <p>loading</p>
                <span></span>
              </div>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export const mapStateToProps = (state) => {
  return {
    // allProducts: state.search ? state.search : [],
    // products: state.data.products ? state.data.products : [],
    filters: state.filters,
    products: state.search ? state.search : [],
    isLoading: state.search.isLoading,
    searchErrorMessage: state.search.error ? state.search.errorMesage : '',
    searchErrorCode: state.search.error,
    whichList: state.whichList,
    page: state.search.page,
    keyword: state.search.searchedKeyword,
    userId: state.auth.userId ? state.auth.userId : 'unknown',
  };
};

export default connect(mapStateToProps, {
  addToCart,
  toggleWishlist,
  addToCompare,
  showQuickViewModal,
  filterSort,
  addProductTosearchProducts,
})(ProductListTwo);
