const users = require("./express_server");

const getUserByEmail = function(email, database){

  for (const user in users) {
    if (users[user.email] === submittedEmail) {
      return user.id;
    } 
  }
  return false;

};

const emailAlreadyExists = function(submittedEmail){
  for (const user in users) {
    if (users[user.email] === submittedEmail) {
      return true;
    } 
  }
  return false;
}

module.exports = {getUserByEmail, emailAlreadyExists};




