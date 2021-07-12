const axios = require('axios');

const API_KEY = process.env.REACT_APP_TAOBAO_KEY;
const SECRET = process.env.REACT_APP_TAOBAO_SECRET_KEY;

const searchRequest = async ({
  keyword,
  startPrice,
  endPrice,
  pageNum,
  cat,
  discount,
  sort,
  pageSize,
  sellerInfo,
  nick,
  ppath,
  imgId,
  filter,
  lang,
}) => {
  const checkInput = (value) => {
    if (value) {
      return value;
    } else {
      return '';
    }
  };

  const keywordChecked = checkInput(keyword);
  const startPriceChecked = checkInput(startPrice);
  const endPriceChecked = checkInput(endPrice);
  const pageChecked = checkInput(pageNum);
  const catChecked = checkInput(cat);
  const discountChecked = checkInput(discount);
  const sortChecked = checkInput(sort);
  const pageSizeChecked = checkInput(pageSize);
  const sellerInfoChecked = checkInput(sellerInfo);
  const nickChecked = checkInput(nick);
  const ppathChecked = checkInput(ppath);
  const imgIdChecked = checkInput(imgId);
  const filterChecked = checkInput(filter);
  const langChecked = checkInput(lang);

  const customUrl = `https://api-gw.onebound.cn/taobao/item_search/?key=${API_KEY}&&q=${keywordChecked}&start_price=${startPriceChecked}&end_price=${endPriceChecked}&page=${pageChecked}&cat=${catChecked}&discount_only=${discountChecked}&sort=${sortChecked}&page_size=${pageSizeChecked}&seller_info=${sellerInfoChecked}&nick=${nickChecked}&ppath=${ppathChecked}&imgid=${imgIdChecked}&filter=${filterChecked}&&lang=en&secret=${SECRET}`;
 
  try {
    const result = await axios.get(customUrl);
    console.log(result, '11111111133333331111111111');
    const totalProducts = result.data.items.total_results;
    console.log(totalProducts, '1111111111');
    const page = result.data.items.page;
    const searchedKeyword = keywordChecked;

    const products = result.data.items.item.map((p, index) => ({
      id: p.num_iid,
      name: p.title,
      price: p.promotion_price,
      pictures: [p.pic_url],
      smPictures: [],
      shortDesc: p.title,
      detail_url: p.detail_url,
      category: '',
      brands: [],
      top: '',
      rating: 0,
      reviews: 0,
      stock: 100,
      totalProducts,
      page,
      searchedKeyword,
    }));
    const finalProduct = {
      products,
      totalProducts,
      page,
    };

    return finalProduct;
  } catch (err) {
    console.log(err);
    // throw err;
  }
};

export default searchRequest;
