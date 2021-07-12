import React, { useState, useEffect } from 'react';
import Order from './order';
import Products from './products';
import NewProducts from './newProducts';
import { useHttpClient } from '../../../api/hooks/http-hook';

const Orders = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [innerError, setInnerError] = useState(error);
  const [orders, setOrders] = useState();
  const token = props.token;
  const checkDate = new Date('4/25/2021, 7:45:27 AM');

  const listOfRestrictedProduct = async () => {
    try {
      const result = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/admin/orders',
        'GET',
        {},
        { Authorization: `Bearer ${token}` }
      );
      if (result.data) {
        setOrders(result.data.orders);
      }
    } catch (err) {
      console.log(err, '--------------');
      setInnerError(err);
    }
  };
  useEffect(() => {
    listOfRestrictedProduct();
  }, []);


  const myFunction = async (id) => {
    var x = document.querySelector('.cars').value;

    let status;
    if (x === 'pending') {
      status = 'Pending';
    } else {
      status = 'Completed';
    }

    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/orders/update-order',
        'PATCH',
        {
          orderId: id,
          status,
        },
        { Authorization: 'Bearer ' + props.token }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {innerError ? (
        <h1>{innerError}</h1>
      ) : (
        <div>
          {orders && orders.length ? (
            orders.map((order, index) => (
              <div className="kachuwa-products" key={index}>
                <div className="date-status">
                  <p className="date">{order.date}</p>
                  <p className="status">
                    <label htmlFor="cars">Status:</label>
                    <select
                      name="cars"
                      id="cars"
                      className="cars"
                      onChange={() => myFunction(order._id)}
                    >
                      {order.status === 'Pending' ? (
                        <option value="pending" selected>
                          Pending
                        </option>
                      ) : (
                        <option value="pending">Pending</option>
                      )}
                      {order.status === 'Completed' ? (
                        <option value="completed" selected>
                          Completed
                        </option>
                      ) : (
                        <option value="completed">Completed</option>
                      )}
                    </select>
                  </p>
                </div>
                <div className="kachuwa-info">
                  <div>
                    Name: {order.firstName} {order.lastName}
                  </div>
                  <div>Email: {order.email}</div>
                  <div>Phone: {order.phone}</div>
                  <div>Street: {order.street}</div>
                  <div>Town: {order.town}</div>
                  <div>Country: {order.country}</div>
                  <div>Note:{order.note}</div>
                </div>
                {new Date(order.date).getTime() >= checkDate.getTime() ? (
                  <NewProducts products={order.cartList} />
                ) : (
                  <Products products={order.cartList} />
                )}
                <p className="total">Total: {order.total}</p>
              </div>
            ))
          ) : (
            <p>No orders has been made looks like you are poor</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
