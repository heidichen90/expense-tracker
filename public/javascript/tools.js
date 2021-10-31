const category = require("../../models/category");

function getTotalAmount(records) {
  let totalAmount = 0;
  records.forEach((e) => {
    totalAmount += e.amount;
  });
  return totalAmount;
}

function capitalizeFirstLetter(categories) {
  categories.forEach(
    (category) =>
      (category.name = category.name[0].toUpperCase() + category.name.slice(1))
  );
  return categories;
}

module.exports = { getTotalAmount, capitalizeFirstLetter };
