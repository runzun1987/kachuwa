// const formula = require('../models/formula');

const formula = {
  operator:"*",
value:30
}

const x = [];
let y = false;
//default formula

//geting formula from the database
const formul = async () => {
  //checking there is already formula
  if (!y) {
  
    x.push(formula);
    y = true;
  }
};

//execute formula for database and store it to ✖
formul();
// formula when price is less then 100
const cal = (prc) => {
  return prc * 160 * (1 / Math.pow(prc, 1 / 2.4));
};

const priceCal = async (price) => {
  //converting price in float
  const value = parseFloat(price);

  //checking for the conditon if price is lower then 100 or not
  let finalResult;
  if (value <= 50) {
    finalResult = cal(value);
    const finalPrice = Math.round(finalResult);

    return finalPrice;
  } else {
    const form = x[0];
    //checking if formula exists in local store x
    if (form.length) {
      const opera = form[0].operator;
      const dymaticVal = parseFloat(form[0].value);

      if (opera === '+') {
        finalResult = value + dymaticVal;
      } else if (opera === '*') {
        finalResult = value * dymaticVal;
      } else {
        finalResult = value;
      }
    } else {
      finalResult = value;
    }
    const finalPrice = Math.round(finalResult);

    return finalPrice;
  }
};

export default priceCal;
