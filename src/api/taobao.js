var axios = require('axios').default;

axios.defaults.withCredentials = true;
// API to get products from mock server
const searchProducts = function(keyword, page, choice, userId) {
  console.log(process.env.REACT_APP_BACKEND_URL);
  var options = {
    method: 'POST',
    url: process.env.REACT_APP_BACKEND_URL + '/search',
    data: {
      search: keyword,
      page: page,
      choice: choice,
      userId: userId,
      // withCredentials : true,
      crossorigin: true,
      // "userId":"603749e570cb92624ccdfb25"
    },
  };

  // return axios
  //   .request(options)
  //   .then(function(response) {
  //     return response.data;
  //   })
  //   .catch(function(error) {
  //     console.log(error);
  //     console.error(error.message);
  //     return { error: '500', message: error.message };
  //   });
};

export default searchProducts;
