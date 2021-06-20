const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");
const {
  getCategoryClass,
  getTotalAmount,
} = require("../../public/javascript/tools");

//home page
router.get("/", (req, res) => {
  const recordPromise = Record.find().lean().sort({ _id: "asc" });
  const categoryPromise = Category.find().lean().sort({ _id: "asc" });
  return Promise.all([recordPromise, categoryPromise])
    .then((value) => {
      const records = value[0];
      const category = value[1];

      // format categories object for easy lookup
      const categoryToClass = getCategoryClass(category);

      // format record object
      records.forEach((e) => {
        e.iconClass = categoryToClass[e.category];
      });

      //get totalAmount
      const totalAmount = getTotalAmount(records);

      res.render("index", { records, category, totalAmount });
    })
    .catch((error) => {
      console.log(error);
      res.render("error", { error });
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

      // format categories object for easy lookup
      const categoryToClass = getCategoryClass(category);

      // format record object
      records.forEach((e) => {
        e.iconClass = categoryToClass[e.category];
      });

      //get totalAmount
      const totalAmount = getTotalAmount(records);

      res.render("index", { records, category, totalAmount });
    })
    .catch((error) => {
      console.log(error);
      res.render("error", { error });
    });
});

module.exports = router;
