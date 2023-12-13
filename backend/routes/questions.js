const express = require("express");
const { CategorizeModel } = require("../models/CategorizeModel");
const { ClozeModel } = require("../models/ClozeModel");
const { ComprehensionModel } = require("../models/ComprehensionModel");

const questionrouter = express.Router();

// Add questions
questionrouter.post("/add", async (req, res) => {
  try {
    const { type, data } = req.body;

    switch (type) {
      case "categorize":
        const categorizeQuestion = await CategorizeModel.create(data);
        res.json(categorizeQuestion);
        break;

      case "cloze":
        const clozeQuestion = await ClozeModel.create(data);
        res.json(clozeQuestion);
        break;

      case "comprehension":
        const comprehensionQuestion = await ComprehensionModel.create(data);
        res.json(comprehensionQuestion);
        break;

      default:
        res.status(400).json({ error: "Invalid question type" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get questions
questionrouter.get("/getAll", async (req, res) => {
  try {
    const categorizeQuestions = await CategorizeModel.find();
    const clozeQuestions = await ClozeModel.find();
    const comprehensionQuestions = await ComprehensionModel.find();

    const allQuestions = {
      categorize: categorizeQuestions,
      cloze: clozeQuestions,
      comprehension: comprehensionQuestions,
    };

    res.json(allQuestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = {
  questionrouter,
};
