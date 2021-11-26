
const getUserByEmail = function(email, users){

  for (const user in users) {
    if (users[user.email] === submittedEmail) {
      return user.id;
    } 
  }
  return false;

};

function emailAlreadyExists(submittedEmail, users){
  for (const user in users) {
    if (users[user.email] === submittedEmail) {
      return true;
    } 
  }
  return false;
}

module.exports = getUserByEmail;
module.exports = emailAlreadyExists;