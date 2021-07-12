import {useState} from 'react'

var axios = require('axios').default;



const imageUpload = (data) => {

  return axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/image-upload/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: data=>{
       
      
      Math.round((100 * data.loaded/data.total))
      }
    })
    .then((res) => {
      return res.data;
    })
    .catch(function(error) {
       
          return({error:'500',message:error.message})
    });
};

export default imageUpload;
