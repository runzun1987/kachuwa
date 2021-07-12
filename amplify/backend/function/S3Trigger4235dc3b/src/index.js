const axios = require('axios');

const API_KEY = process.env.REACT_APP_TAOBAO_KEY;
const SECRET = process.env.REACT_APP_TAOBAO_SECRET_KEY;

// eslint-disable-next-line
exports.handler = async function(event) {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  // Get the object from the event and show its content type
  const bucket = event.Records[0].s3.bucket.name; //eslint-disable-line
  const key = event.Records[0].s3.object.key; //eslint-disable-line
  const awsRegion = event.Records[0].awsRegion;
  const imgUrl = `https://${bucket}.s3.${awsRegion}.amazonaws.com/${key}`;
  const customUrl = `https://api-gw.onebound.cn/taobao/upload_img/?key=${API_KEY}&&imgcode=${imgUrl}&&lang=en&secret=${SECRET}`;
  const response = await axios.get(customUrl);
  /******** I want this response back to react**************/
};
