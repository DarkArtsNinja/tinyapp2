const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));


app.set("view engine", "ejs")

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

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
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

//URLS NEW
app.get("/urls/new", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_new", templateVars);
});
//ADDING NEW URLS
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
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] }; 
  res.render("urls_show", templateVars);
});
//WHEN SOMEONE IS GIVEN A TINY URL
app.get("/u/:shortURL", (req, res) => {
  // console.log(req.params);

  //how come nothing gets passed into here? but in function above ^^
  //the req.params actually passes the data to the consolelog???!!
  const inputTinyURL = req.params.shortURL;
  console.log("app.get(/u/:shortURL, (req, res)");
  console.log("this is the req.params:", req.params);
  console.log("this is the req.params.shortURL:", req.params.shortURL);
  console.log("this is the stored inputTinyURL:", inputTinyURL);
  console.log("this is the urlDatabase:", urlDatabase);

  // for (const i in urlDatabase) {
  //   if (inputTinyURL !== urlDatabase[i]) {
  //     return res.send("shortURL not registered!")
  //   }
  // }


  res.redirect(urlDatabase[inputTinyURL]);
})


app.get("/hello", (req, res) => {
  const templateVars = { greeting : "Hello World" };
  res.render("hello_world", templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
