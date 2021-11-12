const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
const cookieParser = require('cookie-parser');

//middleware
app.use(cookieParser());


app.set("view engine", "ejs")

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = { 
  "dan": {
    id: "danID", 
    email: "dan@e.com", 
    password: "123"
  },
 "bob": {
    id: "bobID", 
    email: "bob@e.com", 
    password: "123"
  }
}


function generateRandomString() {
  //generate a 6 alpha numeric character
let newShortURL = Math.random().toString(36).substr(2, 6)
return newShortURL;
}


app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase)
});

//URLS INDEX
app.get("/urls", (req, res) => {

  const templateVars = { username: req.cookies['username'], urls: urlDatabase };
  console.log(templateVars);
  res.render("urls_index", templateVars);
});
//CREATE NEW URLS
app.get("/urls/new", (req, res) => {

  const templateVars = { username: req.cookies['username'], urls: urlDatabase };
  res.render("urls_new", templateVars);
});
//CREATING ID OF TINYURL
app.post("/urls", (req, res) => {
  // console.log("this is what's submitted:", req.body);  // Log the POST request body to the console
  const newShortURL = generateRandomString();
  urlDatabase[newShortURL] = req.body.longURL;
  // console.log(urlDatabase);
  res.redirect(`/urls/${newShortURL}`);         // Respond with 'Ok' (we will replace this)
});
//SHOW THE TINY URLS PAGE
app.get("/urls/:shortURL", (req, res) => {

  console.log(req.params);
  const templateVars = { username: req.cookies['username'], shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] }; 
  res.render("urls_show", templateVars);
});
//DELETE THE TINYURL AND LONG_URL
app.post("/urls/:shortURL/delete", (req, res) => {
  //why is req.params not pritting, even though in urls_index the action pathlink is there
  console.log(req.params)
  delete urlDatabase[req.params.shortURL];
  res.redirect("/urls");
})
//WHEN SOMEONE IS GIVEN A TINY URL
app.get("/u/:shortURL", (req, res) => {

  const inputTinyURL = req.params.shortURL;
  res.redirect(urlDatabase[inputTinyURL]);
})

//LOGIN PAGE
app.post("/login", (req, res) => {
  res.cookie("username", req.body.username)
  console.log(req.cookies.cookie)
  res.redirect("/urls")
})
//LOGOUT PAGE
app.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/urls");
})
//GOING REGISTRATION PAGE
app.get("/register", (req, res) => {
  const templateVars = { username: req.cookies['username'], urls: urlDatabase };
  res.render("register", templateVars)
})
//REGISTRATION PAGE ADD USERNMAE & PASSWORD
app.post("/register", (req, res) => {
  //adding and saving a new username

  //search if it's already there
    if (users[i][email]) {
      //the email already exists
      res.send56
    }
  res.redirect("/urls")
})





app.get("/hello", (req, res) => {
  const templateVars = { greeting : "Hello World" };
  res.render("hello_world", templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});



//*************this stores functions with commented out code that is helpful to debug errors but would clutter the readability of the file*****************************************

// app.get("/u/:shortURL", (req, res) => {

    // console.log(req.params);
  //how come nothing gets passed into here? but in function above ^^
  //the req.params actually passes the data to the consolelog???!!
  // console.log("app.get(/u/:shortURL, (req, res)");
  // console.log("this is the req.params:", req.params);
  // console.log("this is the req.params.shortURL:", req.params.shortURL);
  // console.log("this is the stored inputTinyURL:", inputTinyURL);
  // console.log("this is the urlDatabase:", urlDatabase);

  // for (const i in urlDatabase) {
  //   if (inputTinyURL !== urlDatabase[i]) {
    //     return res.send("shortURL not registered!")
    //   }
    // }

  // const inputTinyURL = req.params.shortURL;

// res.redirect(urlDatabase[inputTinyURL]);

// })
