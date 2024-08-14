import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import LoginPage from "./LoginPage/loginpage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
