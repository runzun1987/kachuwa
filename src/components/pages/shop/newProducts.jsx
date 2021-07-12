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
          <th className="kachuea-th">Details</th>
          <th className="kachuwa-th">Price</th>
          <th className="kachuwa-th">Quantity</th>
        </tr>

        {products.map((item, index) => (
          <tr className="kachuwa-tr" key={index}>
            <td className="kachuwa-td">
              <Link
                to={`${process.env.PUBLIC_URL}/product/extended/${item.itemInfo.num_iid}`}
              >
                <img
                  src={item.bigImageUrl + '_200x200.jpg'}
                  width="50px"
                  height="50px"
                  alt={item.title}
                />
              </Link>
            </td>
            <td className="kachuwa-td">
              <Link
                to={`${process.env.PUBLIC_URL}/product/extended/${item.itemInfo.num_iid}`}
              >
                <p> {item.title}</p>
              </Link>
            </td>
            <td className="kachuwa-td">
              {item.detail.map((i) => (
                <div key={i.name}>
                  {<strong style={{ color: '#FCB953' }}>{i.name}</strong>}:
                  {i.pic_url ? (
                    <img
                      src={i.pic_url + '_100x100.jpg'}
                      alt={i.value}
                      style={{ width: '50px', height: '50px' }}
                      className="cart-product-quantity"
                    />
                  ) : (
                    i.value
                  )}{' '}
                </div>
              ))}
            </td>

            <td className="kachuwa-td">
              <p> Rs {item.price}</p>
            </td>
            <td className="kachuwa-td">
              {' '}
              <p>{item.qty}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Order;
