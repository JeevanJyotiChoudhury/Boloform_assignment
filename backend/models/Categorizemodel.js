const mongoose = require("mongoose");

const categorizeSchema = mongoose.Schema(
  {
    question: String,
    options: [String],
  },
  {
    versionKey: false,
  }
);

const CategorizeModel = mongoose.model("Categorize", categorizeSchema);

module.exports = {
  CategorizeModel,
};
