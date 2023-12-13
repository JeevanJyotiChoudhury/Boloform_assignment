const mongoose = require("mongoose");

const clozeSchema = mongoose.Schema(
  {
    question: String,
    blanks: [String],
  },
  {
    versionKey: false,
  }
);

const ClozeModel = mongoose.model("Cloze", clozeSchema);

module.exports = {
  ClozeModel,
};
