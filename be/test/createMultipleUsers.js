const createUserWithoutVerify = require("./createUserWithoutVerify");

const createMultipleUsers = (number) => {
  for (let i = 0; i < number; i++) {
    createUserWithoutVerify();
  }
};

createMultipleUsers(30);
