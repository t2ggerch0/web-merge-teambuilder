const axios = require('axios');

const apiUrl = 'http://example.com/api/email'; // API의 주소

// 요청 데이터
const data = {
  email: 'example@example.com',
};

axios.post(apiUrl, data)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });