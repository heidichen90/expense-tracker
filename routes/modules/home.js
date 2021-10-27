const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");
const {
  getCategoryClass,
  getTotalAmount,
} = require("../../public/javascript/tools");
const record = require("../../models/record");

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
router.get("/filter/:category", async (req, res) => {
  try {
    const categoryParam = req.params.category;
    let records = await Record.find({ category: categoryParam })
      .populate("categoryId")
      .lean();
    const categoryList = await Category.find().lean().sort({ _id: "asc" });

    records.forEach((e) => {
      e.iconClass = e.categoryId.icon_class;
    });

    const totalAmount = getTotalAmount(records);

    res.render("index", {
      records,
      category: categoryList,
      totalAmount,
      selectedCategory: categoryParam,
    });
  } catch {
    console.log(error);
    res.render("error", { error });
  }
});

module.exports = router;
