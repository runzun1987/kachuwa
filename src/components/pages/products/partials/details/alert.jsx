import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateProductPrice } from '../../../../../actions';

const Alert = (props) => {

  return (
    <div class="container">
      <div class="alert alert-primary fade show alert-dismissible" role="alert">
        <strong>
          <i class="fa fa-info-circle" aria-hidden="true"></i>
        </strong>{' '}
        {props.message}
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default Alert;
