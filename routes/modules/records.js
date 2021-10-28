const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");
const categoryData = require("../../mock_data/category.json");

// delete a record
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  return Record.findById(id)
    .then((record) => {
      return record.remove();
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
      res.render("error", { error });
    });
});

// edit a record
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  return Record.findById(id)
    .lean()
    .then((record) => {
      // convert it to unit timestamp
      res.render("edit", { record, category: categoryData.categorySeeds });
    })
    .catch((error) => {
      console.log(error);
      res.render("error", { error });
    });
});

// put to update record
router.put("/:id", (req, res) => {
  const id = req.params.id;
  return Record.findById(id)
    .then((record) => {
      Object.assign(record, { ...req.body });
      return record.save();
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
      res.render("error", { error });
    });
});

// add new record
router.get("/new", (req, res) => {
  const today = new Date();
  res.render("new", { today, category: categoryData.categorySeeds });
});

router.post("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const categoryId = await Category.findOne({ name: req.body.category });
    const expense = new Record({ ...req.body, userId, categoryId });

    const saveNewRecord = await expense.save();

    if (saveNewRecord) {
      res.redirect("/");
    }
  } catch (err) {
    console.log(error);
    res.render("error", { error });
  }
});

module.exports = router;
