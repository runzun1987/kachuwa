import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Link, useHistory } from 'react-router-dom';

import { safeContent } from '../../utils';

export default function Banner(props) {
  const history = useHistory();
  const {
    adClass = '',
    contentAdClass = '',
    image,
    title,
    subtitle,
    price,
    btnText = 'Shop Now',
    height,
  } = props.data;

  const letsShop = (e) => {
    console.log(title);
    const a = 'Shein Fashion <br/>For Summer <br/><span>Starting Rs.500</span>';
    const b = 'Forever 21 <br/><span>Up To 30% Off</span>';
    const c = 'Are you ready for  <br/><span>Swimming pool Floaters?</span>';
    const d = 'Minimalist<br/><span>Home Decor for you home!</span>';
    const f = 'Cute Plush <span>Toys</span>';
    const g = 'Trendy Cool Cases';
    if (title === a) {
      history.push(
        `/shop/boxed/keyword/${'Shein Fashion For Summer'}/default/` + Math.random()
      );
    } else if (title === b) {
      history.push(`/shop/boxed/keyword/${'Forever 21'}/default/` + Math.random());
    } else if (title === c) {
      history.push(`/shop/boxed/keyword/${'Swimming pool Floaters'}/default/` + Math.random());
    } else if (title === d) {
      history.push(`/shop/boxed/keyword/${'Home Decor'}/default/` + Math.random());
    } else if (title === f) {
      history.push(`/shop/boxed/keyword/${'Cute Plush Toys'}/default/` + Math.random());
    } else if (title === g) {
      history.push(`/shop/boxed/keyword/${'Cool mobile Cases'}/default/` + Math.random());
    } else {
      history.push(`/shop/boxed/keyword/${'Ukulele'}/default/` + Math.random());
    }
  };
  return (
    <div className={`banner banner-overlay ${adClass}`}>
      <Link to="#">
        <div className="lazy-overlay bg-3"></div>
        <LazyLoadImage
          src={process.env.PUBLIC_URL + '/' + image}
          width={100}
          height={height}
          effect="blur"
        />
      </Link>

      <div className={`banner-content ${contentAdClass}`}>
        {subtitle ? (
          <h4 className="banner-subtitle text-white d-none d-sm-block">
            <Link to="#">{subtitle}</Link>
          </h4>
        ) : (
          ''
        )}

        {title ? (
          <h3 className="banner-title text-white">
            <Link to="#" dangerouslySetInnerHTML={safeContent(title)}></Link>
          </h3>
        ) : (
          ''
        )}

        {price ? (
          <div
            className="price text-center"
            dangerouslySetInnerHTML={safeContent(price)}
          ></div>
        ) : (
          ''
        )}

        <Link to="#" onClick={letsShop} className="banner-link">
          {btnText}
          <i className="icon-long-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
}
