// src/App.js
import React from "react";
import {Route, Routes } from "react-router-dom";
import FormBuilder from "./Components/FormBuilder";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FormBuilder/>} />
      </Routes>
    </div>
  );
}

export default App;
