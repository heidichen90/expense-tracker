const db = require("../../config/mongoose");
const Category = require("../category");
const mockData = require("../../mock_data/category.json");

db.once("open", () => {
  mockData.categorySeeds.forEach((data) => {
    Category.create({ ...data });
  });
  console.log("category seeder done!");
});
