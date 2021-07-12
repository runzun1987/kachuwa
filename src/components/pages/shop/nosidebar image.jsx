import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import Custom Components
import SideBar from '../../features/sidebar/shop-filter';
import ProductListTwo from '../../features/product/list/product-list-two';
import PageHeader from '../../common/page-header';
import Breadcrumb from '../../common/breadcrumb';
import {

  searchImageProducts,
  receiveSearchProducts,
  resetSearchProducts,
} from '../../../actions';
import './style.css';
import { SET_IMAGE } from '../../../constants/action-types';

function NoSideBar(props) {
  const image = props.image;
  const [file, setFile] = useState();
  const [fileSize, setFileSize] = useState();
  const [progress, setProgress] = useState(0);
  // const type = props.match.params.grid;
  const type = 'boxed';
  const keyword = 'kachuwa-image';
  // const [screenShot, setScreenShot] = useState(image);
  const id = props.match.params.id;


  const title = {
    boxed: 'Product Page',
    fullwidth: 'Product Page',
  };

  useEffect(() => {
    if (image) {
      toast(
        <img
          src={image}
          className="kachuwa-screenshot-image"
          alt="screen-shot"
        />,
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      // document.querySelector('.modal').style.display = 'block';
      // const img = document.querySelector('.kachuwa-screenshot-image');
      // img.setAttribute('src', screenShot);
    }
  }, [id]);

  useEffect(() => {
    document.querySelector('body').classList.remove('mmenu-active');
  });

  useEffect(() => {
    if (type !== 'boxed' && type !== 'fullwidth') {
      window.location = process.env.PUBLIC_URL + '/pages/404';
    }
  }, [type]);

  useEffect(() => {
    // props.resetSearchProducts();
    const test = async () => {
      const data = {
        imgBase64: image,
      };

      try {
       
        props.searchImageProducts();
        const result = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/image-upload/`,
          data,
          {
            onUploadProgress: (data) => {
              setProgress(Math.round((100 * data.loaded) / data.total));
            },
          }
        );
      
        props.receiveSearchProducts(result.data);
        // if (!result.data.error) {
        //   props.receiveSearchProducts(result.data);

        //   // document.querySelector('.modal').style.display = 'none';
        // } else {
        //   console.log(result.data.error);
        // }
      } catch (err) {
        console.log(err.response.data);
        props.receiveSearchProducts({ error: '500', message: err.message });

        // props.receiveSearchProducts({ error: '500', message: err.message });
      }
    };

    test();
  }, [props.image]);

  function hideSideBar() {
    if (
      document.querySelector('body').classList.contains('sidebar-filter-active')
    )
      document.querySelector('body').classList.remove('sidebar-filter-active');
  }

  return (
    <>
      <Helmet>
        <title>Kachuwa Nepal's No 1 Shopping Site</title>
      </Helmet>

      <h1 className="d-none">Kachuwa Nepal's No 1 Shopping Site</h1>

      <div className="main">
        {/* <PageHeader title={title[type]} subTitle="Shop" /> */}
        <Breadcrumb
          title={title[type]}
          parent1={['Shop', 'shop/nosidebar']}
          adClass="mb-2"
          container={type === 'boxed' ? 'container' : 'container-fluid'}
        />

        <div className="page-content">
          <div className={type === 'boxed' ? 'container' : 'container-fluid'}>
            {props.image || props.search.length ? (
              <ProductListTwo
                type={type}
                keywordToSearch={keyword}
                progress={progress}
              />
            ) : (
              <h1>Please Upload Image </h1>
            )}

            <div className="sidebar-filter-overlay" onClick={hideSideBar}></div>

            <SideBar numbers={50} />
          </div>
        </div>
      </div>
    </>
  );
}

export const mapStateToProps = (state) => {
  return { image: state.imageSet.file, search: state.search.products };
};

export default connect(mapStateToProps, {

  searchImageProducts,
  receiveSearchProducts,
  resetSearchProducts,
})(React.memo(NoSideBar));
