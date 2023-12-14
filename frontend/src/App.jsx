// src/App.js
import React from "react";
import {Route, Routes } from "react-router-dom";
import FormBuilder from "./Components/FormBuilder";
import DisplayQuestions from "./Components/DisplayQuestions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"; 

function App() {
  return (
    
    <DndProvider backend={HTML5Backend}>
      <Routes>
        <Route path="/" element={<FormBuilder/>} />
        <Route path="/display" element={<DisplayQuestions/>} />
      </Routes>
    </DndProvider>
  );
}

export default App;
