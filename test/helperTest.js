const {assert} = require("chai");
const {getUserByEmail} = require('../helper.js');
const users = require("../express_server");

const testUsers = {
  "userRandom" : {
    id: 123,
    email: "user@example.com",
    password : "123"
  },
  "userRandom2" : {
    id: 321,
    email: "321@321.com",
    password: "asdf"
  }
}
describe('getUserByEmail', function() {
  it('should return a user with valid email', function() {
    const user = getUserByEmail("user@example.com", testUsers)
    const expectedUserID = "userRandomID";
    assert(getUserByEmail("user@example.com", users) === expectedOutput, "return ID matches");    // Write your assert statement here
  });
});


