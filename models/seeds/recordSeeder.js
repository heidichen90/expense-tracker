const db = require("../../config/mongoose");
const Record = require("../record");
const mockData = require("../../mock_data/expense.json");

db.once("open", () => {
  Record.create(mockData.expenseSeeds)
    .then(() => {
      console.log("record seeder done!");
      db.close();
    })
    .catch((error) => {
      console.log(error);
    });
});
