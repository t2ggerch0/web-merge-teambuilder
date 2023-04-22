const axios = require('axios');

const login = async (email, password) => {
  try {
    const response = await axios.post('localhost:3000/auth/login', {
      email: email,
      password: password
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// email과 password를 입력받아 로그인을 시도합니다.
login('chojbsoft@gmail.com', '123qwe!@#')
  .then(data => console.log(data))
  .catch(error => console.error(error));