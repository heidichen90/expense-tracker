const express = require("express");
const app = express();
const exhbs = require("express-handlebars");
require("./config/mongoose");

const PORT = 3000;

//set handlebars as a view engine
app.engine("hbs", exhbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});

// activate and set port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
