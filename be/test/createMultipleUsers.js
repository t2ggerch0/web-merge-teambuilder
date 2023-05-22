const createUserWithoutVerify = require("./createUserWithoutVerify");

let users = [];
const createMultipleUsers = async (number) => {
  for (let i = 0; i < number; i++) {
    const user = await createUserWithoutVerify();
    users.push(user);
  }
  return users;
};

// createMultipleUsers(30);

module.exports = createMultipleUsers;
