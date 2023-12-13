// src/App.js
import React from "react";
import {Route, Routes } from "react-router-dom";
import FormBuilder from "./Components/FormBuilder";
import DisplayQuestions from "./Components/DisplayQuestions";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FormBuilder/>} />
        <Route path="/form-preview/:formId" element={<DisplayQuestions/>} />
      </Routes>
    </div>
  );
}

export default App;
