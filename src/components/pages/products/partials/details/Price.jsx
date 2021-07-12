import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateProductPrice } from '../../../../../actions';

const Price = (props) => {
  return <div className="product-price"> Rs :{props.price}</div>;
};

export default connect(null, { updateProductPrice })(Price);
