const db = require("../../config/mongoose");
const Record = require("../record");
const mockData = require("../../mock_data/expense.json");

db.once("open", () => {
  mockData.expenseSeeds.forEach((data) => {
    Record.create({ ...data });
  });
  console.log("record seeder done!");
});
