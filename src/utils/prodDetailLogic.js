import priceCal from '../utils/priceCalculator';

const Logic = async (object) => {
  //START
  const api_data = object;
  const itemInfo = api_data['item'];

  //BIG IMAGES
  const bigImageUrl = itemInfo['pic_url'];

  //SMALL IMAGES
  const smallImages = itemInfo['item_imgs'].map(
    (img) => img.url + '_400x400.jpg'
  );

  //TITLE

  const title = api_data['item']['title'];

  //PRICE

  const price = await priceCal(api_data['item']['price']);

  //Categories Logic ***************************

  async function taobao_price(price, id, cid) {
    const pr = await priceCal(price);

    return pr;
  }

  const skus = object.item.skus;
  let skus_arr = [];

  if (skus['sku']) {
    let qs = 0;
    for (let sku of skus['sku']) {
      qs += sku['quantity'];
    }

    for (let sku of skus['sku']) {
      if (sku['quantity'] && !qs) sku['quantity'] = 999;
      sku['price'] = await taobao_price(
        sku['price'],
        itemInfo['num_iid'],
        itemInfo['cid']
      );

      sku['orginal_price'] = await taobao_price(
        sku['orginal_price'],
        itemInfo['num_iid'],
        itemInfo['cid']
      );
      skus_arr.push([
        sku['sku_id'],
        sku['properties'],
        //$sku['properties_name'],
        sku['price'],
        parseInt(sku['quantity']),
        sku['orginal_price'],
      ]);
    }
  }

  const skus_json = JSON.stringify(skus_arr);

  let prop_imgs_obj = {};

  if (itemInfo['prop_imgs']) {
    const prop_imgs = itemInfo['prop_imgs'];
    if (prop_imgs['prop_img']) {
      for (let prop_img of prop_imgs['prop_img']) {
        prop_imgs_obj[prop_img['properties']] = prop_img['url'];
      }
    }
  }

  let prop_obj = {};
  for (let obj in itemInfo['props_list']) {
    const dks = obj.split(':');
    const vals = itemInfo['props_list'][obj].split(':');

    let prop_img;
    if (prop_imgs_obj) {
      prop_img = prop_imgs_obj[dks[0] + ':' + dks[1]]
        ? prop_imgs_obj[dks[0] + ':' + dks[1]]
        : '';
    }

    if (!prop_obj.hasOwnProperty(dks[0])) {
      prop_obj = Object.assign(
        {
          [dks[0]]: {
            [dks[1]]: {
              prop_key: dks[0],
              prop_val: dks[1],
              name: vals[0],
              value: vals[1],
              pic_url: prop_img,
            },
          },
        },
        prop_obj
      );
    } else {
      prop_obj[dks[0]] = Object.assign(
        {
          [dks[1]]: {
            prop_key: dks[0],
            prop_val: dks[1],
            name: vals[0],
            value: vals[1],
            pic_url: prop_img,
          },
        },
        prop_obj[dks[0]]
      );
    }
  }

  let mypropids = Object.keys(prop_obj);
  mypropids = mypropids.join('|');

  //Category Logic *********************

  //STOCK
  const stock = api_data['item']['num'];

  //TOTAL PRICE
  const tp =
    parseInt(api_data['item']['price']) +
    parseInt(api_data['item']['express_fee'] || 0);

  const totalPrice = await priceCal(tp);

  //description
  const description = api_data['item']['desc'];

  return {
    api_data,
    itemInfo,
    bigImageUrl,
    smallImages,
    title,
    price,
    prop_obj,
    stock,
    totalPrice,
    description,
    skus_json,
  };
};

export default Logic;
