import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './style.css';

const Order = ({ products }) => {
  return (
    <table className="kachuwa-table">
      <tbody>
        <tr className="kachuwa-tr">
          <th className="kachuwa-th">Image</th>
          <th className="kachuwa-th">Name</th>
          <th className="kachuwa-th">Price</th>
          <th className="kachuwa-th">Quantity</th>
          <th className="kachuwa-th">Link</th>
        </tr>

        {products.map((prod, index) => (
          <tr className="kachuwa-tr" key={index}>
            <td className="kachuwa-td">
              <img src={prod.pictures[0]} width="50px" height="50px" />
            </td>
            <td className="kachuwa-td">
              <p> {prod.name}</p>
            </td>

            <td className="kachuwa-td">
              <p>{prod.price}</p>
            </td>
            <td className="kachuwa-td">
              {' '}
              <p>{prod.qty}</p>
            </td>
            <td className="kachuwa-td">
              {' '}
              <a href={prod.detail_url}>Click Here</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Order;
