const express = require("express");
const app = express();
const exhbs = require("express-handlebars");
const handlebarsHelpers = require("handlebars-helpers");
const helpers = handlebarsHelpers();
const methodOverride = require("method-override");
const routes = require("./routes");
require("./config/mongoose");

const PORT = 3000;

//set handlebars as a view engine
app.engine(
  "hbs",
  exhbs({ defaultLayout: "main", extname: ".hbs", helpers: helpers })
);
app.set("view engine", "hbs");

//set bodyparser
app.use(express.urlencoded({ extended: true }));

//set method-override
app.use(methodOverride("_method"));

// setting static files
app.use(express.static("public"));

//set router
app.use(routes);

// activate and set port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
