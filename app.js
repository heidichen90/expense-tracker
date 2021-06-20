const express = require("express");
const app = express();
const exhbs = require("express-handlebars");
const methodOverride = require("method-override");
const Record = require("./models/record");
const Category = require("./models/category");
const categoryData = require("./mock_data/category.json");
require("./config/mongoose");

const PORT = 3000;

//set handlebars as a view engine
app.engine("hbs", exhbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

//set bodyparser
app.use(express.urlencoded({ extended: true }));

//set method-override
app.use(methodOverride("_method"));

//home page
app.get("/", (req, res) => {
  const recordPromise = Record.find().lean().sort({ _id: "asc" });
  const categoryPromise = Category.find().lean().sort({ _id: "asc" });
  return Promise.all([recordPromise, categoryPromise])
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

//filter a category
app.get("/filter/:category", (req, res) => {
  const categoryParam = req.params.category;
  const recordPromise = Record.find().lean().find({ category: categoryParam });
  const categoryPromise = Category.find().lean().sort({ _id: "asc" });
  return Promise.all([recordPromise, categoryPromise])
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

//delete a record
app.delete("/records/:id", (req, res) => {
  const id = req.params.id;
  return Record.findById(id)
    .then((record) => {
      return record.remove();
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

//edit a record
app.get("/records/:id/edit", (req, res) => {
  const id = req.params.id;
  return Record.findById(id)
    .lean()
    .then((record) => {
      record.date = record.date.toDateString();
      res.render("edit", { record, category: categoryData });
    })
    .catch((err) => {
      console.log(err);
    });
});
// activate and set port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
