const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  name_cn: {
    type: String,
    required: true,
  },
  icon_class: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
