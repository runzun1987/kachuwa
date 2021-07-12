import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import Compressing from 'react-image-file-resizer';
import { connect } from 'react-redux';

import MobileMainNav from './partials/mobile-nav';
import {
  showModal,
  whichList,
  signIn,
  signOut,
  searchImageProducts,
  storeImage,
} from '../../actions';

function MobileMenu(props) {
  let history = useHistory();
  const imageInput = useRef();
  const [search, setSearch] = useState('');
  const formSubmitHandler = (e) => {
    e.preventDefault();

    // props.searchProducts(search);
    // props.whichList('search')
    history.push(`/shop/boxed/keyword/${search}/default/`);
  };

  const inputChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const onChangeHandler = async (event) => {
    history.push('/shop/boxed/kachuwa-image');
    const imageFile = event.target.files[0];
    Compressing.imageFileResizer(
      imageFile, // the file from input
      480, // width
      480, // height
      'JPG', // compress format WEBP, JPEG, PNG
      70, // quality
      0, // rotation
      (uri) => {
        // You upload logic goes here
        props.storeImage(uri);
      },
      'base64' // blob or base64 default base64
    );

    //    const data = new FormData()
    //   data.append('file', event.target.files[0])

    //   props.storeImage(data)
    // history.push('/shop/nosidebar/boxed/kachuwa-image');

    //    props.storeImage(event.target.files[0])

    //    const data = new FormData()
    //   data.append('file', event.target.files[0])
    //   props.storeImage(data)
    //    history.push("/shop/nosidebar/boxed/kachuwa-image");

    //        const totalFileSize = event.target.files[0]
    //         const data = new FormData()
    //         data.append('file', event.target.files[0])
    //   props.searchImageProducts(data)

    //         props.whichList('search')
    // history.push("/shop/nosidebar/boxed");

    //         const data = new FormData()
    //         data.append('file', event.target.files[0])
    //   props.searchImageProducts(data)

    //         props.whichList('search')
    //         history.push("/shop/nosidebar/boxed");
  };

  const somethingtohappen = () => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  };

  const mobileMenuHandler = (e) => {
    const keyword = e.target.innerText;
    history.push(`/shop/boxed/${keyword}/` + Math.random());
  };

  return (
    <div className="mobile-menu-container">
      <div className="mobile-menu-wrapper">
        <span className="mobile-menu-close">
          <i className="icon-close"></i>
        </span>

        <form
          action="#"
          method="get"
          className="mobile-search"
          onSubmit={formSubmitHandler}
        >
          <label htmlFor="mobile-search" className="sr-only">
            Search
          </label>
          <input
            type="search"
            className="form-control"
            name="mobile-search"
            id="mobile-search"
            placeholder="Search product ..."
            onChange={inputChangeHandler}
            required
          />
          <button className="btn btn-primary" type="submit">
            <i className="icon-search"></i>
          </button>
          <input
            style={{ display: 'none' }}
            type="file"
            name="file"
            onChange={onChangeHandler}
            ref={imageInput}
          />
          <div className="btn btn-outline-primary" onClick={somethingtohappen}>
            <i className="fa fa-camera"></i>
          </div>
        </form>

        <Tabs defaultIndex={0} selectedTabClassName="show">
          <TabList
            className="nav nav-pills-mobile nav-border-anim"
            role="tablist"
          >
            {/* <Tab className="nav-item">
              <span className="nav-link">Menu</span>
            </Tab> */}

            <Tab className="nav-item">
              <span className="nav-link">Categories</span>
            </Tab>
          </TabList>

          <div className="tab-content">
            {/* <TabPanel>
              <MobileMainNav />
            </TabPanel> */}

            <TabPanel>
              <nav className="mobile-cats-nav" onClick={mobileMenuHandler}>
                <ul className="mobile-cats-menu">
                  {/* <li>
                    <Link className="mobile-cats-lead" to="#">
                      Daily offers
                    </Link>
                  </li> */}
                  <li>
                    <Link className="mobile-cats-lead" to="#">
                      Gift Ideas
                    </Link>
                  </li>
                  <li>
                    <Link to="#">Beds</Link>
                  </li>
                  <li>
                    <Link to="#">Lighting</Link>
                  </li>
                  <li>
                    <Link to="#">Sofas & Sleeper sofas</Link>
                  </li>
                  <li>
                    <Link to="#">Storage</Link>
                  </li>
                  <li>
                    <Link to="#">Armchairs & Chaises</Link>
                  </li>
                  <li>
                    <Link to="#">Decoration </Link>
                  </li>
                  <li>
                    <Link to="#">Kitchen Cabinets</Link>
                  </li>
                  <li>
                    <Link to="#">Coffee & Tables</Link>
                  </li>
                  <li>
                    <Link to="#">Outdoor Furniture </Link>
                  </li>
                </ul>
              </nav>
            </TabPanel>
          </div>
        </Tabs>

        {/* <div className="social-icons">
          <Link to="#" className="social-icon" target="_blank" title="Facebook">
            <i className="icon-facebook-f"></i>
          </Link>
          <Link to="#" className="social-icon" target="_blank" title="Twitter">
            <i className="icon-twitter"></i>
          </Link>
          <Link
            to="#"
            className="social-icon"
            target="_blank"
            title="Instagram"
          >
            <i className="icon-instagram"></i>
          </Link>
          <Link to="#" className="social-icon" target="_blank" title="Youtube">
            <i className="icon-youtube"></i>
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default connect(null, {
  showModal,
  whichList,
  signIn,
  signOut,
  searchImageProducts,
  storeImage,
})(MobileMenu);
