
var axios = require("axios").default;


// API to get products from mock server
const searchProducts = function (productId) {
   
    var options = {
        method: 'POST',
        url: process.env.REACT_APP_BACKEND_URL+'/product-detail/',
        data:{
            "productId":productId
        }
    
      };
      
      return axios.request(options).then(function (response) {
        
          return(response.data);
      }).catch(function (error) {
      console.log(error)
          console.error(error);
        
              return({error:'500',message:error.message})
      });
}

export default searchProducts;

