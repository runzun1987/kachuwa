import React, { useEffect, useState } from 'react';
import imagesLoaded from 'imagesloaded';
import { Helmet } from 'react-helmet';
import { Link, useHistory, Redirect } from 'react-router-dom';

// import Custom Components
import Breadcrumb from '../../common/breadcrumb';
import QuickView from '../../features/product/common/quickview';
import MediaOne from './partials/media/media-one';
import DetailOne from './partials/details/detail-one';
import Decription from './partials/details/description';
import DetailTwo from './partials/details/detail-two';
import DescTwo from './partials/description/desc-two';
import RelatedProducts from './partials/related-products';
import { getProductDetails, resetProductDetails } from '../../../actions';
import { connect } from 'react-redux';

import { productGallery } from '../../../utils';
import './extended-info.scss';
import './styles.scss';
import Description from './partials/details/description';

function ExtendedInfo(props) {
  let history = useHistory();

  const [reload, setReload] = useState(false);
  const errorMessage = props.prodDetailErrorMsg;
  const error = props.prodDetailError;
  const errorCode = props.prodDetailErrorCode;
  const productId = props.match.params.id;
  const product = props.productDetail;
  const prodIdInSideStore = props.prodIdInSideStore;
  const isLoading = props.prodDetailLoadingState;
  // props.resetProductDetails()

  useEffect(() => {
    if (props.productDetail) {
      if (productId !== prodIdInSideStore) {
        props.getProductDetails(productId);
      }
    } else {
      props.getProductDetails(productId);
    }
  }, [productId]);

  useEffect(() => {
    productGallery();

    document.querySelector('.skel-pro-single')
      ? document.querySelector('.skel-pro-single').classList.remove('loaded')
      : document.querySelector('.skel-pro-single');
    let imgLoad = imagesLoaded('.product-main-image', { background: true });
    imgLoad.on('done', function(instance, image) {
      document.querySelector('.skel-pro-single').classList.add('loaded');
    });
  }, [productId]);

  if (errorCode === 'kachuwa69') {
    setTimeout(() => {
      window.location.href = `${process.env.PUBLIC_URL}/product/extended/${productId}`;
    }, 1000);
  }

  return (
    <>
      {error ? (
        <h1>{errorMessage}</h1>
      ) : (
        <div>
          <Helmet>
            <title>Kachuwa Nepal's No 1 Shopping Site</title>
          </Helmet>

          <h1 className="d-none">Kachuwa Nepal's No 1 Shopping Site</h1>

          <div className="main">
            <Breadcrumb
              title="Description"
              slug="extended"
              parent={['product']}
              type="product"
              // adclassName="breadcrumb-nav border-0 mb-0"
              productId={productId}
            />
            {isLoading ? (
              <div className="products mb-3">
                <div className="main-loading">
                  <div className="content">
                    <div className="planet">
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
                    <p className="kachuwa-loading">loading</p>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
            <div className="page-content">
              <div className="container">
                <div className="product-details-top mb-2 skeleton-body horizontal">
                  <div className="row skel-pro-single">
                    <div className="col-md-6">
                      <div className="skel-product-gallery"></div>

                      {product && <MediaOne id={productId} adclass="" />}
                    </div>

                    <div className="col-md-6">
                      <div className="entry-summary row">
                        <div className="col-md-12">
                          <div className="entry-summary1"></div>
                        </div>

                        <div className="col-md-12">
                          <div className="entry-summary2"></div>
                        </div>
                      </div>

                      {product && <DetailOne id={productId} />}
                    </div>
                  </div>
                </div>
              </div>
              {/* {product && <Description des={product.description} />} */}
              {product && (
                <DescTwo
                  id={productId}
                  des={product.description}
                  image={product.bigImageUrl}
                />
              )}

              {/* <h2 className="title text-center mb-4">You May Also Like</h2>

              <div className="container">
                <RelatedProducts />
              </div> */}
            </div>
            )
            <QuickView />
          </div>
        </div>
      )}
    </>
  );
}

function mapStateToProps(state, props) {
  return {
    // product: state.data.products.filter( product => product.id === 8 )[ 0 ],
    prodDetailLoadingState: state.productDetail.isLoading,
    prodDetailError: state.productDetail.error,
    prodDetailErrorMsg: state.productDetail.errorMesage,
    prodDetailErrorCode: state.productDetail.errorCode,
    productDetail: state.productDetail.prodDetail
      ? state.productDetail.prodDetail.specialObj
      : null,
    prodIdInSideStore: state.productDetail.prodDetail
      ? state.productDetail.prodDetail.specialObj.itemInfo.num_iid
      : null,
  };
}

export default connect(mapStateToProps, {
  getProductDetails,
  resetProductDetails,
})(ExtendedInfo);
