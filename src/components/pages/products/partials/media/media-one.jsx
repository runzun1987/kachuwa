import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Magnifier, SideBySideMagnifier } from 'react-image-magnifiers';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
// import { productGallery } from '../../../utils';
import imagesLoaded from 'imagesloaded';

import { quantityInputs, productGallery } from '../../../../../utils';

function MediaOne(props) {
  const { productDetail, adClass = 'product-gallery-vertical' } = props;
  const product = productDetail;

  useEffect(() => {
    productGallery();

    document.querySelector('.skel-pro-single').classList.remove('loaded');

    let imgLoad = imagesLoaded('.product-main-image', { background: true });

    imgLoad.on('done', function(instance, image) {
      document.querySelector('.skel-pro-single').classList.add('loaded');
    });
  }, [product]);

  //  const [product,setProduct] = useState(prod)

  //  useEffect(()=>{
  //    setProduct(prodDetail)
  //  },[prodDetail])

  // if ( !product) {
  //     window.location = process.env.PUBLIC_URL + "pages/404";
  // }

  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setStatus] = useState(false);

  let bigImages;
  let smallImages;
  if (product) {
    bigImages = product.bigImageUrl ? product.bigImageUrl : product.bigImageUrl;
    smallImages = product.smallImages
      ? product.smallImages
      : product.smallImages;
  }

  useEffect(() => {
    quantityInputs();
  }, []);

  function openLightBox() {
    let index = parseInt(
      document.querySelector('.product-main-image').getAttribute('index')
    );

    if (!index) {
      index = 0;
    }
    setStatus(true);
    setPhotoIndex(index);
  }

  function closeLightBox() {
    setStatus(false);
  }

  const setNextHandler = () => {
    setPhotoIndex((photoIndex) => (photoIndex + 1) % smallImages.length);
  };

  const setPrevHandler = () => {
    setPhotoIndex(
      (photoIndex) => (photoIndex + smallImages.length - 1) % smallImages.length
    );
  };

  return (
    <>
      {product && (
        <div className={`product-gallery ${adClass}`}>
          <div className="row m-0">
            <figure className="product-main-image" index="0">
              {product.new ? (
                <span className="product-label label-new">New</span>
              ) : (
                ''
              )}
              {product.top ? (
                <span className="product-label label-top">Top</span>
              ) : (
                ''
              )}
              {product.discount ? (
                <span className="product-label label-sale">
                  {product.discount}% off
                </span>
              ) : (
                ''
              )}
              {0 === product.stock ? (
                <span className="product-label label-out">Out of Stock</span>
              ) : (
                ''
              )}

              <SideBySideMagnifier
                imageSrc={smallImages[0]}
                imageAlt="Example"
                largeImageSrc={bigImages} // Optional
                dragToMove={false}
                alwaysInPlace={true}
                mouseActivation="hover"
                cursorStyleActive="crosshair"
                id="product-zoom"
              />

              {/* <Magnifier
                imageSrc={smallImages[0].url}
                imageAlt="Example"
                // largeImageSrc={smallImages[0].url} // Optional
                dragToMove={false}
                mouseActivation="hover"
                cursorStyleActive="crosshair"
                id="product-zoom"
              /> */}
              <button
                id="btn-product-gallery"
                className="btn-product-gallery"
                onClick={openLightBox}
              >
                <i className="icon-arrows"></i>
              </button>
            </figure>

            <div id="product-zoom-gallery" className="product-image-gallery">
              {smallImages.map((item, index) => {
                return (
                  <button
                    className={`product-gallery-item ${
                      0 === index ? 'active' : ''
                    }`}
                    to="#"
                    data-image={item}
                    data-zoom-image={item.replace('_400x400.jpg', '')}
                    key={product.id + '-' + index}
                  >
                    <img src={smallImages[index]} alt="product back" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {isOpen ? (
        <Lightbox
          mainSrc={smallImages[photoIndex]}
          nextSrc={smallImages[(photoIndex + 1) % smallImages.length]}
          prevSrc={
            bigImages[
              (photoIndex + smallImages.length - 1) % smallImages.length
            ]
          }
          onCloseRequest={closeLightBox}
          onMovePrevRequest={setNextHandler}
          onMoveNextRequest={setPrevHandler}
        />
      ) : (
        ''
      )}
    </>
  );
}

function mapStateToProps(state, props) {
  return {
    // product: state.data.products.filter( product => product.id === 8 )[ 0 ],
    productDetail: state.productDetail.prodDetail.specialObj,
    prodDetailLoadingState: state.productDetail.isLoading,
  };
}

export default connect(mapStateToProps)(MediaOne);
