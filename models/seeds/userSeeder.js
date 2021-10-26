const db = require("../../config/mongoose");
const User = require("../user");
const mockData = require("../../mock_data/user.json");

db.once("open", () => {
  User.create(mockData.userSeeds)
    .then(() => {
      console.log("user seeder done!");
      db.close();
    })
    .catch((error) => {
      console.log(error);
    });
});
