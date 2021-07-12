import axios from 'axios';
import logic from './../utils/prodDetailLogic';

const API_KEY = process.env.REACT_APP_TAOBAO_KEY;
const SECRET = process.env.REACT_APP_TAOBAO_SECRET_KEY;

const productDetailRequest = async ({ productId, promotion, lang }) => {
  console.log('receive detail for:', productId);
  const checkInput = (value) => {
    if (value) {
      return value;
    } else {
      return '';
    }
  };
  const productIdChecked = checkInput(productId);
  const promotionChecked = checkInput(promotion);
  const langChecked = checkInput(lang);

  const customUrl = `https://api-gw.onebound.cn/taobao/item_get/?key=${API_KEY}&&num_iid=${productIdChecked}&is_promotion=${promotionChecked}&&lang=en&secret=${SECRET}`;
  try {
    const result = await axios.get(customUrl);
    const object = result.data;
    const specialObject = await logic(object);

    const productsDetails = {
      specialObj: specialObject,
    };
    return { productsDetails, error: false };
  } catch (err) {
    console.log('error on receiving response of :', productId);
    throw err;
  }
};

export default productDetailRequest;
