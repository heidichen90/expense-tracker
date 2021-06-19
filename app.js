const express = require("express");
const app = express();
const exhbs = require("express-handlebars");
const Record = require("./models/record");
const Category = require("./models/category");
require("./config/mongoose");

const PORT = 3000;

//set handlebars as a view engine
app.engine("hbs", exhbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  const recordPromise = Record.find().lean().sort({ _id: "asc" });
  const categoryPromise = Category.find().lean().sort({ _id: "asc" });
  Promise.all([recordPromise, categoryPromise])
    .then((value) => {
      const records = value[0];
      const category = value[1];
      let totalAmount = 0;

      // format categories object for easy lookup
      const categoryToClass = new Object();
      category.forEach((e) => (categoryToClass[e.name] = e.icon_class));

      // format record object
      records.forEach((e) => {
        e.iconClass = categoryToClass[e.category];
        e.date = e.date.toDateString();
        totalAmount += e.amount;
      });

      res.render("index", { records, category, totalAmount });
    })
    .catch((err) => {
      console.log(err);
    });
});

// activate and set port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
