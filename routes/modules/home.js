const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");

//home page
router.get("/", (req, res) => {
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
        totalAmount += e.amount;
      });

      res.render("index", { records, category, totalAmount });
    })
    .catch((err) => {
      console.log(err);
    });
});

//filter a category
router.get("/filter/:category", (req, res) => {
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
        totalAmount += e.amount;
      });

      res.render("index", { records, category, totalAmount });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
