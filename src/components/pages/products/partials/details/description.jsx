import React from 'react';

const Description = (props) => {
  return (
    <div
      className="product-details sticky-content"
      offsetTop={80}
      dangerouslySetInnerHTML={{ __html: props.des }}
    />
  );
};

export default Description;
