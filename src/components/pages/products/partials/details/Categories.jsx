import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { productGalleryTwo } from '../../../../../utils';

import './style.css';

const Categories = (props) => {
  const sku = props.sku;
  const [propObj, setPropObj] = useState();
  const [sk, setSk] = useState();
  const [ofs, setOFS] = useState();
  const [inStock, setInStock] = useState();
  const [wholePrice, setWholePrice] = useState();

  const empArr = props.empArr;

  useEffect(() => {
    productGalleryTwo();
  }, [props.propObj]);

  useEffect(() => {
    const priceArr = [];
    if (props.sku) {
      const sku = props.sku;
      const x = JSON.parse(sku);
      setOFS(props.ofs);
      setInStock(props.inStock);
      setSk(x);

      for (let i = 0; i < x.length; i++) {
        if (!priceArr.length || !priceArr.includes(x[i][2])) {
          priceArr.push(x[i][2]);
        }
      }

      if (priceArr.length > 1) {
        const max = Math.max(...priceArr);
        const min = Math.min(...priceArr);
        const price = min + ' - ' + max;

        setWholePrice(price);
        props.setPrice(price);
      } else {
        setWholePrice(priceArr[0]);
        props.setPrice(props.price);
      }
    }
  }, [props.sku]);

  useEffect(() => {
    if (props.propObj) {
      //create object key to array
      const compName = Object.keys(props.propObj);
      //create empty Arrary with fix length
      props.setEmpArr(new Array(compName.length));

      //set obj
      setPropObj(props.propObj);
    }
  }, [props.propObj]);

  const valueHandler = (e) => {
    // const id = e.target.parentElement.parentElement.getAttribute('data-value');
    const y = document.querySelectorAll(`[data-value] button`);
    y.forEach((f) => {
      f.classList.remove('on');
      // f.classList.remove('no_stock');
    });

    //getting second top element from click element
    const element = e.target.closest('li');

    // element.classList.toggle('active');
    //get data value from element
    const id = element.getAttribute('data-value');

    //checking if id data exitsts
    if (id) {
      //getting first value from the data
      const firstId = id.split(':')[0];
      //full value of the data
      const fullId = id;
      // get index of the click componenet and adding it to the empty Array
      const objKeyArr = Object.keys(propObj);
      const index = Object.keys(propObj).indexOf(firstId);

      //check fullId is in empty Array
      if (empArr.includes(fullId)) {
        delete empArr[index];
      } else {
        empArr[index] = fullId;
      }

      // for (let i = 0; i < index; i++) {
      //   if (empArr[i] == null) {
      //     const result = Object.entries(propObj[objKeyArr[i]]);
      //     const [dvv, dv] = result[0];
      //     alert('Please Select', dv.name, '----------');
      //     delete empArr[index];
      //     break;
      //   }
      // }

      //check empty array is full so that we can update price and stock
      let check = true;
      for (let i = 0; i < empArr.length; i++) {
        if (empArr[i] == null) {
          check = false;
        }
      }

      if (check) {
        for (let i = 0; i < sk.length; i++) {
          const indArr = sk[i][1].split(';');
          if (indArr.every((ai) => empArr.includes(ai))) {
            props.setPrice(sk[i][2]);
            props.setStock(sk[i][3]);
            break;
          }
        }
      } else {
        props.setStock(props.product.stock);
        props.setPrice(wholePrice);
      }

      //Stock Style

      for (let i = 0; i < empArr.length; i++) {
        if (props.empArr[i] != null) {
          const x = document.querySelector(
            `[data-value="${empArr[i]}"] button`
          );
          x.classList.toggle('on');
        }
      }

      //Stock style

      // for (let i = 0; i < ofs.length; i++) {
      //   const propId = ofs[i][1];
      //   const individualIdArray = propId.split(';');

      //   if (individualIdArray.some((ai, ind) => empArr.includes(ai))) {
      //     if (individualIdArray.length > 1) {
      //       for (let j = 0; j < individualIdArray.length; j++) {
      //         const y = document.querySelectorAll(
      //           `[data-value="${individualIdArray[j]}"] button`
      //         );
      //         for (let k = 0; k < y.length; k++) {
      //           if (y[k].className !== 'on') {
      //             for (let l = 0; l < inStock.length; l++) {
      //               const inStockPropId = inStock[l][1];
      //               const individualInStockIdArray = inStockPropId.split(';');
      //               if (
      //                 !individualInStockIdArray.some(
      //                   (ai) => individualIdArray[j] === ai
      //                 )
      //               ) {
      //                 y[k].classList.add('no_stock');
      //                 y[k].parentElement.classList.add('dis');
      //                 y[k].disable = true;
      //               }
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
    }
  };
  console.log(props.propObj, '00000000000');

  return (
    <div>
      {props.propObj &&
        // Category Section

        Object.entries(props.propObj).map(([dk, dv]) => {
          let dvv = Object.values(dv);

          // Catergory Name
          return (
            <dl className="clear" key={dk}>
              <dt>{`${dvv[0]['name']} :`}</dt>
              <div className="mustSelectArea" id="sku_box">
                <dl className="clear">
                  <dd id="skubox_1627207">
                    {Object.entries(dv).map(([dkk, v]) => {
                      //Check if there is image

                      return (
                        <li data-value={`${dk}:${dkk}`} key={`${dk}:${dkk}`}>
                          <div>
                            <button title={`${v['value']}`}>
                              {v['pic_url'] ? (
                                <img
                                  src={`${v['pic_url']}_30x30.jpg`}
                                  onClick={valueHandler}
                                  alt={v['value']}
                                  className={'kachuwa-small-images'}
                                  data-image={v['pic_url']}
                                  data-zoom-image={v['pic_url']}
                                />
                              ) : (
                                <div className="value" onClick={valueHandler}>
                                  {v['value']}
                                </div>
                              )}
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </dd>
                </dl>

                <div style={{ clear: 'both' }}></div>
              </div>
            </dl>
          );
        })}
    </div>
  );
};

function mapStateToProps(state, props) {
  return {
    // product: state.data.products.filter( product => product.id === parseInt( props.id ) )[ 0 ],
    product: state.productDetail.prodDetail.specialObj,
  };
}

export default connect(mapStateToProps)(Categories);
