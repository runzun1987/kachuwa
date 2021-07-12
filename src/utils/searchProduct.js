searchKeywordApi(keyword, page, choice, userId).then((result) => {
    const totalProducts = result.responseData.total_record_count;
    const page = result.responseData.page;
    const searchedKeyword = keyword;
    const products = result.responseData.docs.map((p, index) => ({
      id: p.product_id,
      // name:convertedToEnglish[index].status === 'fulfilled' ? convertedToEnglish[index].value : p.title,
      name: p.product_title,
      price: p.app_sale_price,
      pictures: [p.product_main_image_url],
      smPictures: [],
      shortDesc: p.product_title,
      detail_url: p.product_detail_url,
      category: '',
      brands: [],
      top: '',
      rating: 0,
      reviews: 0,
      stock: 100,
      totalProducts,
      page,
      // pageSize,
      // pageCount,
      searchedKeyword,
    }));
    const finalProduct = {
      products,
      // error: false,
      totalProducts,
      page,
      // pageSize: pageSize,
      // pageCount: pageCount,
      // searchedKeyword,
    };
